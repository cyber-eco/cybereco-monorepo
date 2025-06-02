'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider, 
  FacebookAuthProvider,
  TwitterAuthProvider, 
  signInWithPopup,
  linkWithPopup,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  Auth
} from 'firebase/auth';
import type { AuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, Firestore } from 'firebase/firestore';

// Base user interface that apps can extend
export interface BaseUser {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Auth configuration interface
export interface AuthConfig {
  auth: Auth;
  db: Firestore;
  userCollection?: string;
  enableIndexedDBRecovery?: boolean;
}

// Auth context interface
export interface AuthContextType<T extends BaseUser = BaseUser> {
  currentUser: FirebaseUser | null;
  userProfile: T | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, extraData?: Partial<T>) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithProvider: (providerName: 'google' | 'facebook' | 'twitter') => Promise<void>;
  linkAccount: (providerName: 'google' | 'facebook' | 'twitter') => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<T>) => Promise<void>;
  handleDatabaseRecovery?: () => Promise<void>;
  hasDatabaseCorruption?: boolean;
}

// Provider props interface
export interface AuthProviderProps<T extends BaseUser = BaseUser> {
  children: React.ReactNode;
  config: AuthConfig;
  createUserProfile?: (firebaseUser: FirebaseUser, extraData?: Partial<T>) => T;
  onUserProfileLoaded?: (userProfile: T) => void;
  enableCorruptionRecovery?: boolean;
}

// Utility function to sanitize data for Firestore
export function sanitizeForFirestore(obj: Record<string, unknown>): Record<string, any> {
  const cleaned: Record<string, any> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  });
  return cleaned;
}

// Create auth context factory
export function createAuthContext<T extends BaseUser = BaseUser>() {
  const AuthContext = createContext<AuthContextType<T> | undefined>(undefined);

  function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }

  function AuthProvider({
    children,
    config,
    createUserProfile,
    onUserProfileLoaded,
    enableCorruptionRecovery = false
  }: AuthProviderProps<T>) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasDatabaseCorruption, setHasDatabaseCorruption] = useState(false);

    const { auth, db, userCollection = 'users' } = config;

    // Default user profile creator
    const defaultCreateUserProfile = (firebaseUser: FirebaseUser, extraData?: Partial<T>): T => {
      const baseProfile: BaseUser = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        ...(firebaseUser.email && { email: firebaseUser.email }),
        ...(firebaseUser.photoURL && { avatarUrl: firebaseUser.photoURL }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return { ...baseProfile, ...extraData } as T;
    };

    const userProfileCreator = createUserProfile || defaultCreateUserProfile;

    // Handle database corruption recovery
    const handleDatabaseRecovery = async () => {
      setIsLoading(true);
      // This would contain app-specific recovery logic
      setHasDatabaseCorruption(false);
      window.location.reload();
    };

    // Auth persistence setup
    useEffect(() => {
      const setupAuthPersistence = async () => {
        try {
          if (hasDatabaseCorruption) {
            await setPersistence(auth, browserSessionPersistence);
          } else {
            await setPersistence(auth, browserLocalPersistence);
          }
        } catch (error) {
          console.error('Failed to set auth persistence:', error);
          if (enableCorruptionRecovery) {
            setHasDatabaseCorruption(true);
          }
        }
      };

      setupAuthPersistence();
    }, [auth, hasDatabaseCorruption, enableCorruptionRecovery]);

    // Auth state listener
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        
        if (user) {
          try {
            const userDocRef = doc(db, userCollection, user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
              const userData = sanitizeForFirestore(userDoc.data()) as T;
              setUserProfile(userData);
              onUserProfileLoaded?.(userData);
            } else {
              // Create new user profile
              const newUserData = userProfileCreator(user);
              await setDoc(userDocRef, sanitizeForFirestore(newUserData as Record<string, unknown>));
              setUserProfile(newUserData);
              onUserProfileLoaded?.(newUserData);
            }
          } catch (error) {
            console.error('Error handling user profile:', error);
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
        
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, [auth, db, userCollection, userProfileCreator, onUserProfileLoaded]);

    // Authentication methods
    const getProvider = (providerName: string): AuthProvider => {
      switch (providerName) {
        case 'google': return new GoogleAuthProvider();
        case 'facebook': return new FacebookAuthProvider();
        case 'twitter': return new TwitterAuthProvider();
        default: throw new Error(`Unsupported provider: ${providerName}`);
      }
    };

    const signIn = async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = async (email: string, password: string, displayName: string, extraData?: Partial<T>) => {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await firebaseUpdateProfile(result.user, { displayName });
      
      // User profile will be created by the auth state listener
    };

    const signInWithProvider = async (providerName: 'google' | 'facebook' | 'twitter') => {
      const provider = getProvider(providerName);
      await signInWithPopup(auth, provider);
      // User profile creation handled by auth state listener
    };

    const linkAccount = async (providerName: 'google' | 'facebook' | 'twitter') => {
      if (!currentUser) throw new Error("No user is signed in");
      const provider = getProvider(providerName);
      await linkWithPopup(currentUser, provider);
    };

    const signOut = () => firebaseSignOut(auth);

    const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

    const updateProfile = async (data: Partial<T>) => {
      if (!currentUser || !userProfile) throw new Error("No user is signed in");
      
      const userDocRef = doc(db, userCollection, currentUser.uid);
      const cleanData = sanitizeForFirestore(data as Record<string, unknown>);
      
      // Update Firestore
      await setDoc(userDocRef, { ...cleanData, updatedAt: new Date().toISOString() }, { merge: true });
      
      // Update Firebase Auth profile if needed
      const authUpdates: any = {};
      if (data.name && data.name !== currentUser.displayName) {
        authUpdates.displayName = data.name;
      }
      if (data.avatarUrl !== undefined && data.avatarUrl !== currentUser.photoURL) {
        authUpdates.photoURL = data.avatarUrl;
      }
      
      if (Object.keys(authUpdates).length > 0) {
        await firebaseUpdateProfile(currentUser, authUpdates);
      }
      
      // Update local state
      const updatedProfile = { ...userProfile, ...cleanData, updatedAt: new Date().toISOString() } as T;
      setUserProfile(updatedProfile);
    };

    const value: AuthContextType<T> = {
      currentUser,
      userProfile,
      isLoading,
      signIn,
      signUp,
      signOut,
      signInWithProvider,
      linkAccount,
      resetPassword,
      updateProfile,
      ...(enableCorruptionRecovery && {
        handleDatabaseRecovery,
        hasDatabaseCorruption
      })
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  }

  return { AuthProvider, useAuth, AuthContext };
}

// Export default auth context for basic use cases
export const { AuthProvider, useAuth, AuthContext } = createAuthContext<BaseUser>();