import { test, expect, Page } from '@playwright/test';

// Test configuration
const HUB_URL = process.env.HUB_URL || 'http://localhost:40000';
const JUSTSPLIT_URL = process.env.JUSTSPLIT_URL || 'http://localhost:40002';

// Test user credentials
const TEST_USER = {
  email: 'demo@cybere.co',
  password: 'demo123456',
  name: 'Demo User'
};

test.describe('SSO Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state
    await page.goto(HUB_URL);
    await page.evaluate(() => {
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    });
  });

  test('should complete full SSO login flow', async ({ page, context }) => {
    // Step 1: Navigate to Hub
    await page.goto(HUB_URL);
    await expect(page).toHaveTitle(/CyberEco Hub/);
    
    // Step 2: Click Sign In
    await page.click('text=Sign In');
    await expect(page).toHaveURL(`${HUB_URL}/auth/signin`);
    
    // Step 3: Fill in login form
    await page.fill('input[type="email"]', TEST_USER.email);
    await page.fill('input[type="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    
    // Step 4: Verify redirect to dashboard
    await expect(page).toHaveURL(`${HUB_URL}/dashboard`);
    await expect(page.locator('text=Welcome back')).toBeVisible();
    
    // Step 5: Verify auth state is saved
    const authState = await page.evaluate(() => {
      return localStorage.getItem('cybereco-hub-auth');
    });
    expect(authState).toBeTruthy();
    
    // Step 6: Navigate to JustSplit from Hub
    const newPagePromise = context.waitForEvent('page');
    await page.click('text=JustSplit');
    const justSplitPage = await newPagePromise;
    
    // Step 7: Verify SSO worked - user is logged in to JustSplit
    await justSplitPage.waitForLoadState('networkidle');
    await expect(justSplitPage).toHaveURL(/justsplit/);
    await expect(justSplitPage.locator('text=' + TEST_USER.name)).toBeVisible();
    
    // Step 8: Verify JustSplit has auth state
    const justSplitAuth = await justSplitPage.evaluate(() => {
      return localStorage.getItem('cybereco-hub-auth');
    });
    expect(justSplitAuth).toBeTruthy();
  });

  test('should sync logout across apps', async ({ page, context }) => {
    // First, log in to Hub
    await loginToHub(page);
    
    // Open JustSplit in new tab
    const justSplitPage = await context.newPage();
    await justSplitPage.goto(JUSTSPLIT_URL);
    await justSplitPage.waitForLoadState('networkidle');
    
    // Verify logged in on JustSplit
    await expect(justSplitPage.locator('text=' + TEST_USER.name)).toBeVisible();
    
    // Log out from Hub
    await page.click('button[aria-label="User menu"]');
    await page.click('text=Sign Out');
    
    // Verify logged out on Hub
    await expect(page).toHaveURL(`${HUB_URL}/`);
    await expect(page.locator('text=Sign In')).toBeVisible();
    
    // Refresh JustSplit and verify logged out there too
    await justSplitPage.reload();
    await expect(justSplitPage.locator('text=Sign In')).toBeVisible();
  });

  test('should redirect to sign in for protected routes', async ({ page }) => {
    // Try to access protected route without auth
    await page.goto(`${HUB_URL}/dashboard`);
    
    // Should redirect to landing with return URL
    await expect(page).toHaveURL(`${HUB_URL}/?returnUrl=%2Fdashboard`);
    await expect(page.locator('text=Sign In')).toBeVisible();
    
    // Sign in
    await page.click('text=Sign In');
    await page.fill('input[type="email"]', TEST_USER.email);
    await page.fill('input[type="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    
    // Should redirect back to dashboard
    await expect(page).toHaveURL(`${HUB_URL}/dashboard`);
  });

  test('should handle token expiry gracefully', async ({ page }) => {
    // Log in to Hub
    await loginToHub(page);
    
    // Simulate token expiry by modifying auth state
    await page.evaluate(() => {
      const authState = JSON.parse(localStorage.getItem('cybereco-hub-auth') || '{}');
      authState.expiresAt = new Date(Date.now() - 1000).toISOString();
      localStorage.setItem('cybereco-hub-auth', JSON.stringify(authState));
    });
    
    // Refresh page
    await page.reload();
    
    // Should show as logged out
    await expect(page.locator('text=Sign In')).toBeVisible();
  });

  test('should handle cross-origin auth token', async ({ page, context }) => {
    // Log in to Hub
    await loginToHub(page);
    
    // Extract auth token from URL when launching JustSplit
    let capturedToken = '';
    page.on('request', request => {
      const url = request.url();
      if (url.includes('authToken=')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        capturedToken = urlParams.get('authToken') || '';
      }
    });
    
    // Click JustSplit link
    await page.click('text=JustSplit');
    
    // Verify token was included
    expect(capturedToken).toBeTruthy();
    expect(capturedToken).toMatch(/^[a-f0-9]{64}$/); // SHA-256 hash
  });

  test('should persist auth state across page refreshes', async ({ page }) => {
    // Log in to Hub
    await loginToHub(page);
    await expect(page.locator('text=Welcome back')).toBeVisible();
    
    // Refresh page
    await page.reload();
    
    // Should still be logged in
    await expect(page.locator('text=Welcome back')).toBeVisible();
    await expect(page).toHaveURL(`${HUB_URL}/dashboard`);
  });

  test('should show appropriate UI for authenticated vs unauthenticated users', async ({ page }) => {
    // Visit Hub as unauthenticated user
    await page.goto(HUB_URL);
    
    // Should not see navigation tabs
    await expect(page.locator('nav a[href="/dashboard"]')).not.toBeVisible();
    await expect(page.locator('nav a[href="/apps"]')).not.toBeVisible();
    await expect(page.locator('nav a[href="/my-data"]')).not.toBeVisible();
    
    // Should see Sign In button
    await expect(page.locator('text=Sign In')).toBeVisible();
    
    // Log in
    await loginToHub(page);
    
    // Should now see navigation tabs
    await expect(page.locator('nav a[href="/dashboard"]')).toBeVisible();
    await expect(page.locator('nav a[href="/apps"]')).toBeVisible();
    await expect(page.locator('nav a[href="/my-data"]')).toBeVisible();
    
    // Should see user menu instead of Sign In
    await expect(page.locator('button[aria-label="User menu"]')).toBeVisible();
    await expect(page.locator('text=Sign In')).not.toBeVisible();
  });
});

// Helper function to log in to Hub
async function loginToHub(page: Page) {
  await page.goto(HUB_URL);
  await page.click('text=Sign In');
  await page.fill('input[type="email"]', TEST_USER.email);
  await page.fill('input[type="password"]', TEST_USER.password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(`${HUB_URL}/dashboard`);
}