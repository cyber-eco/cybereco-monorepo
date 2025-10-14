#!/usr/bin/env node

/**
 * Test script for SSO flow between Hub and JustSplit
 * Run this to verify the auth bridge is working correctly
 */

const { execSync } = require('child_process');
const http = require('http');

console.log('🧪 Testing SSO Flow with Auth Bridge\n');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkServer(port, name) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      resolve(true);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.setTimeout(1000);
  });
}

async function waitForServers() {
  log('⏳ Waiting for servers to start...', 'yellow');
  
  const maxAttempts = 30;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const hubReady = await checkServer(40000, 'Hub');
    const justSplitReady = await checkServer(40002, 'JustSplit');
    const firebaseReady = await checkServer(9099, 'Firebase Auth');
    
    if (hubReady && justSplitReady && firebaseReady) {
      log('✅ All servers are ready!', 'green');
      return true;
    }
    
    process.stdout.write('.');
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }
  
  log('\n❌ Servers failed to start in time', 'red');
  return false;
}

async function runTests() {
  log('📋 SSO Flow Test Steps:', 'cyan');
  log('1. Start development environment');
  log('2. Check server availability');
  log('3. Open Hub test page');
  log('4. Test auth bridge functionality');
  log('5. Verify JustSplit receives auth\n');

  log('Step 1: Starting development environment...', 'blue');
  log('Run: npm run dev', 'yellow');
  log('(Please start the dev environment in another terminal)\n');

  log('Step 2: Checking servers...', 'blue');
  const serversReady = await waitForServers();
  
  if (!serversReady) {
    log('Please ensure the development environment is running', 'red');
    process.exit(1);
  }

  log('\nStep 3: Test URLs:', 'blue');
  log('Hub Test Page: http://localhost:40000/test-auth', 'cyan');
  log('JustSplit with Auth Debug: http://localhost:40002?DEBUG_AUTH=true', 'cyan');
  
  log('\nStep 4: Manual Test Instructions:', 'blue');
  log('1. Open Hub test page in your browser');
  log('2. Sign in if needed');
  log('3. Click "🌉 Test Auth Bridge" button');
  log('4. Check browser console for auth bridge logs');
  log('5. Click "🚀 Launch JustSplit with fromHub=true"');
  log('6. Verify JustSplit loads without redirect loop');
  
  log('\nStep 5: Expected Results:', 'green');
  log('✓ Hub saves auth to both shared state and bridge');
  log('✓ JustSplit finds auth from bridge fallback');
  log('✓ No redirect loop occurs');
  log('✓ User is authenticated in JustSplit');
  
  log('\n📊 Debug Commands:', 'yellow');
  log('In Hub console:');
  log('  localStorage.getItem("cybereco-shared-auth")');
  log('  localStorage.getItem("cybereco-auth-bridge")');
  log('\nIn JustSplit console:');
  log('  localStorage.getItem("cybereco-shared-auth")');
  log('  localStorage.getItem("cybereco-auth-bridge")');
  
  log('\n🧹 Cleanup Commands:', 'yellow');
  log('localStorage.clear() // Clear all auth data');
  log('pkill -f "node.*40000|node.*40001|node.*40002" // Kill servers');
}

// Run the tests
runTests().catch(console.error);