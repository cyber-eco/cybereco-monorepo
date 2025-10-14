#!/usr/bin/env node

/**
 * Script to check auth state in localStorage
 * Run this in the browser console to debug auth issues
 */

console.log('🔍 Checking CyberEco Auth State...\n');

// Check all cybereco keys in localStorage
console.log('📦 LocalStorage:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key && key.includes('cybereco')) {
    const value = localStorage.getItem(key);
    console.log(`  ${key}:`, value);
    try {
      const parsed = JSON.parse(value);
      console.log('    Parsed:', parsed);
    } catch (e) {
      // Not JSON
    }
  }
}

// Check sessionStorage
console.log('\n📦 SessionStorage:');
for (let i = 0; i < sessionStorage.length; i++) {
  const key = sessionStorage.key(i);
  if (key && key.includes('cybereco')) {
    const value = sessionStorage.getItem(key);
    console.log(`  ${key}:`, value);
  }
}

// Check Firebase auth
console.log('\n🔥 Firebase Auth:');
if (typeof window !== 'undefined' && window.firebase?.auth) {
  const user = window.firebase.auth().currentUser;
  if (user) {
    console.log('  Current User:', {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    });
  } else {
    console.log('  No current user');
  }
}

// Check cookies
console.log('\n🍪 Cookies:');
console.log('  ', document.cookie || 'No cookies');

console.log('\n✅ Check complete!');