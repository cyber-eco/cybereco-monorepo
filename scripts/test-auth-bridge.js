#!/usr/bin/env node

/**
 * Test script to verify auth-bridge functionality
 * Run this in the browser console to test the auth bridge
 */

console.log('🌉 Testing Auth Bridge...\n');

// Test saving auth to bridge
function testSaveAuth() {
  const testUser = {
    uid: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: null,
    emailVerified: true
  };

  // Save to shared auth
  localStorage.setItem('cybereco-shared-auth', JSON.stringify({
    user: testUser,
    timestamp: Date.now()
  }));

  // Save to auth bridge
  const bridgeData = {
    user: testUser,
    timestamp: Date.now(),
    targetApp: 'justsplit'
  };
  
  localStorage.setItem('cybereco-auth-bridge', JSON.stringify(bridgeData));
  
  console.log('✅ Auth saved to both shared auth and bridge');
  console.log('Shared Auth:', localStorage.getItem('cybereco-shared-auth'));
  console.log('Auth Bridge:', localStorage.getItem('cybereco-auth-bridge'));
}

// Test retrieving auth
function testGetAuth() {
  console.log('\n🔍 Checking auth sources...');
  
  // Check shared auth
  const sharedAuth = localStorage.getItem('cybereco-shared-auth');
  console.log('Shared Auth:', sharedAuth ? JSON.parse(sharedAuth) : 'Not found');
  
  // Check auth bridge
  const bridgeAuth = localStorage.getItem('cybereco-auth-bridge');
  console.log('Auth Bridge:', bridgeAuth ? JSON.parse(bridgeAuth) : 'Not found');
}

// Test auth expiry
function testExpiry() {
  console.log('\n⏰ Testing auth expiry...');
  
  // Set expired auth
  const expiredBridge = {
    user: { uid: 'expired-user' },
    timestamp: Date.now() - 31000, // 31 seconds ago
    targetApp: 'justsplit'
  };
  
  localStorage.setItem('cybereco-auth-bridge', JSON.stringify(expiredBridge));
  console.log('Set expired bridge data (31 seconds old)');
  
  // In real code, this would be handled by getBridgedAuth()
  const data = JSON.parse(localStorage.getItem('cybereco-auth-bridge'));
  const age = Date.now() - data.timestamp;
  const isExpired = age > 30000;
  
  console.log(`Bridge age: ${age}ms, Expired: ${isExpired}`);
}

// Run tests
console.log('1️⃣ Test Save Auth:');
testSaveAuth();

console.log('\n2️⃣ Test Get Auth:');
testGetAuth();

console.log('\n3️⃣ Test Expiry:');
testExpiry();

console.log('\n✅ Tests complete!');
console.log('\nTo clear all auth data, run:');
console.log('localStorage.removeItem("cybereco-shared-auth");');
console.log('localStorage.removeItem("cybereco-auth-bridge");');