#!/usr/bin/env node
/**
 * Script to seed Hub dashboard with test data
 * Run with: node scripts/seed-hub-dashboard.js
 */

const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  setDoc,
  serverTimestamp,
  Timestamp,
  connectFirestoreEmulator
} = require('firebase/firestore');
const { 
  getAuth, 
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} = require('firebase/auth');

// Hub Firebase configuration (using main project for now)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBgDLy0JvPnqlRINKO34mhzVKH_SuZFjbI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "cybereco-1.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "cybereco-1",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "cybereco-1.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "117723516865",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:117723516865:web:b65b1cbc0a09c646ba0b8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Connect to emulators
try {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  console.log('Connected to Auth emulator');
} catch (error) {
  console.log('Auth emulator already connected');
}

try {
  connectFirestoreEmulator(db, 'localhost', 8080);
  console.log('Connected to Firestore emulator');
} catch (error) {
  console.log('Firestore emulator already connected');
}

async function seedData() {
  try {
    console.log('Starting Hub dashboard data seeding...');
    
    // Create or sign in demo user
    let demoUser;
    const demoEmail = 'demo@cybere.co';
    const demoPassword = 'demo123456';
    
    try {
      // Try to sign in first
      const userCredential = await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
      demoUser = userCredential.user;
      console.log('Signed in as demo user:', demoUser.uid);
    } catch (signInError) {
      // If sign in fails, create the user
      console.log('Creating demo user...');
      const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
      demoUser = userCredential.user;
      console.log('Created demo user:', demoUser.uid);
    }
    
    const userId = demoUser.uid;
    const now = new Date();
    
    // 1. Create user profile
    console.log('Creating user profile...');
    await setDoc(doc(db, 'users', userId), {
      id: userId,
      name: 'Demo User',
      email: demoEmail,
      displayName: 'Demo User',
      avatarUrl: `https://ui-avatars.com/api/?name=Demo+User&background=006241&color=fff`,
      balance: 0,
      friends: [],
      currency: 'USD',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    // 2. Create demo groups
    console.log('Creating demo groups...');
    const groups = [];
    
    // Weekend Trip Group
    const group1 = await addDoc(collection(db, 'groups'), {
      name: 'Weekend Trip to Lake Tahoe',
      description: 'Friends trip to the mountains',
      members: [userId, 'user-2', 'user-3', 'user-4'],
      eventIds: [],
      expenseIds: [],
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)), // 5 days ago
      updatedAt: serverTimestamp()
    });
    groups.push(group1.id);
    
    // Roommates Group
    const group2 = await addDoc(collection(db, 'groups'), {
      name: 'Apartment Roommates',
      description: 'Monthly shared expenses',
      members: [userId, 'user-5', 'user-6'],
      eventIds: [],
      expenseIds: [],
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)), // 30 days ago
      updatedAt: serverTimestamp()
    });
    groups.push(group2.id);
    
    // Lunch Club Group
    const group3 = await addDoc(collection(db, 'groups'), {
      name: 'Office Lunch Club',
      description: 'Daily lunch expenses',
      members: [userId, 'user-7', 'user-8', 'user-9', 'user-10'],
      eventIds: [],
      expenseIds: [],
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)), // 60 days ago
      updatedAt: serverTimestamp()
    });
    groups.push(group3.id);
    
    // 3. Create demo expenses
    console.log('Creating demo expenses...');
    const expenses = [];
    
    // Recent expenses (this week)
    const expense1 = await addDoc(collection(db, 'expenses'), {
      description: 'Gas for Lake Tahoe trip',
      amount: 85.50,
      currency: 'USD',
      date: Timestamp.fromDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
      paidBy: userId,
      participants: [userId, 'user-2', 'user-3', 'user-4'],
      groupId: group1.id,
      settled: false,
      category: 'Transport',
      notes: 'Split evenly between all',
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
      updatedAt: serverTimestamp()
    });
    expenses.push(expense1.id);
    
    const expense2 = await addDoc(collection(db, 'expenses'), {
      description: 'Groceries for the weekend',
      amount: 156.75,
      currency: 'USD',
      date: Timestamp.fromDate(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
      paidBy: 'user-2',
      participants: [userId, 'user-2', 'user-3', 'user-4'],
      groupId: group1.id,
      settled: false,
      category: 'Food',
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
      updatedAt: serverTimestamp()
    });
    expenses.push(expense2.id);
    
    // This month expenses
    const expense3 = await addDoc(collection(db, 'expenses'), {
      description: 'Internet Bill',
      amount: 89.99,
      currency: 'USD',
      date: Timestamp.fromDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
      paidBy: userId,
      participants: [userId, 'user-5', 'user-6'],
      groupId: group2.id,
      settled: false,
      category: 'Bills',
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
      updatedAt: serverTimestamp()
    });
    expenses.push(expense3.id);
    
    const expense4 = await addDoc(collection(db, 'expenses'), {
      description: 'Friday team lunch at Thai Restaurant',
      amount: 125.00,
      currency: 'USD',
      date: Timestamp.fromDate(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
      paidBy: userId,
      participants: [userId, 'user-7', 'user-8', 'user-9', 'user-10'],
      groupId: group3.id,
      settled: false,
      category: 'Restaurant',
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
      updatedAt: serverTimestamp()
    });
    expenses.push(expense4.id);
    
    // Last month expenses (for comparison)
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 15);
    const expense5 = await addDoc(collection(db, 'expenses'), {
      description: 'Monthly rent',
      amount: 800.00,
      currency: 'USD',
      date: Timestamp.fromDate(lastMonthDate),
      paidBy: 'user-5',
      participants: [userId, 'user-5', 'user-6'],
      groupId: group2.id,
      settled: true,
      category: 'Rent',
      createdAt: Timestamp.fromDate(lastMonthDate),
      updatedAt: serverTimestamp()
    });
    expenses.push(expense5.id);
    
    // 4. Create demo events
    console.log('Creating demo events...');
    const event1 = await addDoc(collection(db, 'events'), {
      name: 'Lake Tahoe Weekend',
      description: 'Weekend getaway with friends',
      date: Timestamp.fromDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
      startDate: Timestamp.fromDate(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
      endDate: Timestamp.fromDate(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
      location: 'Lake Tahoe, CA',
      createdBy: userId,
      members: [userId, 'user-2', 'user-3', 'user-4'],
      expenseIds: [expense1.id, expense2.id],
      groupId: group1.id,
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)),
      updatedAt: serverTimestamp()
    });
    
    // 5. Create demo settlements
    console.log('Creating demo settlements...');
    const settlement1 = await addDoc(collection(db, 'settlements'), {
      fromUser: 'user-5',
      toUser: userId,
      amount: 266.66,
      currency: 'USD',
      date: Timestamp.fromDate(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
      expenseIds: [expense5.id],
      method: 'Venmo',
      notes: 'Rent payment',
      createdAt: Timestamp.fromDate(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
      updatedAt: serverTimestamp()
    });
    
    // 6. Create apps collection entry
    console.log('Creating apps collection...');
    await setDoc(doc(db, 'apps', 'justsplit'), {
      id: 'justsplit',
      name: 'JustSplit',
      description: 'Split expenses with friends and family',
      dataTypes: ['Expenses', 'Groups', 'Settlements', 'Events'],
      status: 'active',
      icon: 'FaChartLine',
      url: 'http://localhost:40002',
      category: 'Finance',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    // 7. Create user permissions
    console.log('Creating user permissions...');
    await addDoc(collection(db, 'permissions'), {
      userId: userId,
      appId: 'justsplit',
      permissions: ['read', 'write', 'delete'],
      roles: ['user'],
      features: ['expense-tracking', 'group-management', 'settlements'],
      lastAccessed: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    // 8. Create other user profiles for display names
    console.log('Creating other user profiles...');
    const otherUsers = [
      { id: 'user-2', name: 'Alice Johnson' },
      { id: 'user-3', name: 'Bob Smith' },
      { id: 'user-4', name: 'Charlie Brown' },
      { id: 'user-5', name: 'David Miller' },
      { id: 'user-6', name: 'Emma Wilson' },
      { id: 'user-7', name: 'Frank Davis' },
      { id: 'user-8', name: 'Grace Lee' },
      { id: 'user-9', name: 'Henry Taylor' },
      { id: 'user-10', name: 'Iris Chen' }
    ];
    
    for (const otherUser of otherUsers) {
      await setDoc(doc(db, 'users', otherUser.id), {
        id: otherUser.id,
        name: otherUser.name,
        displayName: otherUser.name,
        email: `${otherUser.id}@example.com`,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=006241&color=fff`,
        balance: 0,
        friends: [userId],
        currency: 'USD',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    console.log('✅ Hub dashboard data seeded successfully!');
    console.log(`Demo user: ${demoEmail} / ${demoPassword}`);
    console.log(`Created ${groups.length} groups, ${expenses.length} expenses, 1 event, 1 settlement`);
    console.log('You can now log in and see real data in the Hub dashboard!');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    console.error('Error details:', error.message);
  } finally {
    process.exit(0);
  }
}

// Run the seeding
seedData();