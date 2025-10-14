import {
  websiteNavLinks,
  websiteNavConfig,
  hubNavLinks,
  hubNavConfig,
  justSplitNavLinks,
  justSplitNavConfig,
} from '../navigation';

describe('Navigation Configurations', () => {
  describe('Website Navigation', () => {
    test('websiteNavConfig has valid structure', () => {
      expect(websiteNavConfig).toHaveProperty('links');
      expect(websiteNavConfig).toHaveProperty('showConfig', true);
      expect(websiteNavConfig).toHaveProperty('mobileMenuStorageKey', 'cybereco-website-menu-state');
    });

    test('website navigation links have required properties', () => {
      expect(websiteNavLinks).toBeInstanceOf(Array);
      expect(websiteNavLinks.length).toBeGreaterThan(0);
      
      websiteNavLinks.forEach(link => {
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('label');
        expect(typeof link.href).toBe('string');
        expect(typeof link.label).toBe('string');
      });
    });

    test('website links include essential pages', () => {
      const hrefs = websiteNavLinks.map(link => link.href);
      expect(hrefs).toContain('/');
      expect(hrefs).toContain('/portfolio');
      expect(hrefs).toContain('/documentation');
      expect(hrefs).toContain('/about');
      expect(hrefs).toContain('/help');
    });
  });

  describe('Hub Navigation', () => {
    test('hubNavConfig has valid structure', () => {
      expect(hubNavConfig).toHaveProperty('links');
      expect(hubNavConfig).toHaveProperty('showConfig', true);
      expect(hubNavConfig).toHaveProperty('mobileMenuStorageKey', 'cybereco-hub-menu-state');
    });

    test('hub navigation links have required properties', () => {
      expect(hubNavLinks).toBeInstanceOf(Array);
      expect(hubNavLinks.length).toBeGreaterThan(0);
      
      hubNavLinks.forEach(link => {
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('label');
        expect(typeof link.href).toBe('string');
        expect(typeof link.label).toBe('string');
      });
    });

    test('hub links include essential pages', () => {
      const hrefs = hubNavLinks.map(link => link.href);
      expect(hrefs).toContain('/');
      expect(hrefs).toContain('/apps');
      expect(hrefs).toContain('/profile');
      expect(hrefs).toContain('/settings');
    });
  });

  describe('JustSplit Navigation', () => {
    test('justSplitNavConfig has valid structure', () => {
      expect(justSplitNavConfig).toHaveProperty('links');
      expect(justSplitNavConfig).toHaveProperty('showConfig', true);
      expect(justSplitNavConfig).toHaveProperty('mobileMenuStorageKey', 'cybereco-justsplit-menu-state');
    });

    test('justSplit navigation links have required properties', () => {
      expect(justSplitNavLinks).toBeInstanceOf(Array);
      expect(justSplitNavLinks.length).toBeGreaterThan(0);
      
      justSplitNavLinks.forEach(link => {
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('label');
        expect(typeof link.href).toBe('string');
        expect(typeof link.label).toBe('string');
      });
    });

    test('justSplit links include essential pages', () => {
      const hrefs = justSplitNavLinks.map(link => link.href);
      expect(hrefs).toContain('/');
      expect(hrefs).toContain('/groups');
      expect(hrefs).toContain('/events');
      expect(hrefs).toContain('/expenses');
      expect(hrefs).toContain('/settlements');
      expect(hrefs).toContain('/friends');
    });
  });

  describe('Cross-App Consistency', () => {
    test('all navigation configs use unique storage keys', () => {
      const storageKeys = [
        websiteNavConfig.mobileMenuStorageKey,
        hubNavConfig.mobileMenuStorageKey,
        justSplitNavConfig.mobileMenuStorageKey,
      ];
      
      const uniqueKeys = new Set(storageKeys);
      expect(uniqueKeys.size).toBe(storageKeys.length);
    });

    test('no duplicate paths within each navigation', () => {
      const checkDuplicatePaths = (links: typeof websiteNavLinks) => {
        const paths = links.map(link => link.href);
        const uniquePaths = new Set(paths);
        return paths.length === uniquePaths.size;
      };

      expect(checkDuplicatePaths(websiteNavLinks)).toBe(true);
      expect(checkDuplicatePaths(hubNavLinks)).toBe(true);
      expect(checkDuplicatePaths(justSplitNavLinks)).toBe(true);
    });

    test('all configs have showConfig enabled', () => {
      expect(websiteNavConfig.showConfig).toBe(true);
      expect(hubNavConfig.showConfig).toBe(true);
      expect(justSplitNavConfig.showConfig).toBe(true);
    });
  });
});