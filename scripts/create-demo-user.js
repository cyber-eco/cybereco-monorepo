// Script to create a demo user in Firebase Auth emulator
const admin = require('firebase-admin');

// Initialize admin SDK with emulator
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';

admin.initializeApp({
  projectId: 'demo-cybereco-hub',
});

async function createDemoUser() {
  try {
    // Create demo user
    const user = await admin.auth().createUser({
      uid: 'demo-user-123',
      email: 'demo@cybere.co',
      password: 'demo123',
      displayName: 'Demo User',
      emailVerified: true,
    });

    console.log('Successfully created demo user:', user.uid);
    console.log('Email:', user.email);
    console.log('Password: demo123');
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('Demo user already exists');
      process.exit(0);
    } else {
      console.error('Error creating demo user:', error);
      process.exit(1);
    }
  }
}

createDemoUser();
EOF < /dev/null