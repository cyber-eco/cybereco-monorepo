#!/bin/bash
# Script to deploy Firestore indexes to production

echo "🔥 Deploying Firestore indexes..."

# Check if user is logged in to Firebase
if ! firebase projects:list > /dev/null 2>&1; then
    echo "❌ You need to login to Firebase first"
    echo "Run: firebase login"
    exit 1
fi

# Deploy indexes
echo "📊 Deploying indexes to Firestore..."
firebase deploy --only firestore:indexes

if [ $? -eq 0 ]; then
    echo "✅ Indexes deployed successfully!"
    
    # Show index building status
    echo ""
    echo "📋 Note: Indexes may take several minutes to build."
    echo "You can check the status in the Firebase Console:"
    echo "https://console.firebase.google.com/project/_/firestore/indexes"
else
    echo "❌ Failed to deploy indexes"
    exit 1
fi

# Option to deploy security rules
echo ""
read -p "Would you like to deploy production security rules? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔒 Deploying production security rules..."
    
    # Backup current rules
    cp firestore.rules firestore.rules.backup
    
    # Copy production rules
    cp firebase/production/firestore.rules firestore.rules
    
    # Deploy rules
    firebase deploy --only firestore:rules
    
    if [ $? -eq 0 ]; then
        echo "✅ Security rules deployed successfully!"
    else
        echo "❌ Failed to deploy security rules"
        # Restore backup
        cp firestore.rules.backup firestore.rules
    fi
    
    # Clean up backup
    rm -f firestore.rules.backup
fi

echo ""
echo "🎉 Deployment complete!"