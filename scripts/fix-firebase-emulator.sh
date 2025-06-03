#!/bin/bash

# Script to fix common Firebase emulator issues

echo "🔧 Fixing Firebase Emulator Issues..."

# Kill any existing emulator processes
echo "1. Stopping any running emulators..."
pkill -f "firebase" || true
pkill -f "java.*emulators" || true

# Clear emulator data
echo "2. Clearing emulator data..."
rm -rf ~/.cache/firebase/emulators/
rm -rf ./emulator-data/

# Clear Node modules cache
echo "3. Clearing Node cache..."
rm -rf node_modules/.cache

# Restart the emulators with clean state
echo "4. Starting emulators with clean state..."
echo "   Run 'npm run dev:clean' to start with fresh data"
echo "   Or 'npm run dev' to start with persistent data"

echo "✅ Done! The emulators should work better now."
echo ""
echo "If you still see 'Sending authEvent failed' errors:"
echo "1. This is a known Firebase emulator issue"
echo "2. It doesn't affect functionality - auth will still work"
echo "3. The error usually goes away after the first login"