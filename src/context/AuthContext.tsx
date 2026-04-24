'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider, 
  signOut, 
  User 
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  limit 
} from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle redirect results if any
    getRedirectResult(auth).catch((error) => {
      console.error("Redirect login error:", error);
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Check if user exists in Firestore or if it's the first user
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          // Force admin if it's the owner email, even if already registered as user
          if (firebaseUser.email === 'vallrack67@gmail.com' && data.role !== 'admin') {
            await setDoc(userDocRef, { ...data, role: 'admin' }, { merge: true });
            setIsAdmin(true);
          } else {
            setIsAdmin(data.role === 'admin');
          }
        } else {
          // Check if this is the first user OR if it's the specific owner email
          const usersQuery = query(collection(db, 'users'), limit(1));
          const usersSnapshot = await getDocs(usersQuery);
          
          let role = 'user';
          if (usersSnapshot.empty || firebaseUser.email === 'vallrack67@gmail.com') {
            role = 'admin';
          }
          
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: role,
            createdAt: new Date().toISOString(),
          };
          
          await setDoc(userDocRef, userData);
          setIsAdmin(role === 'admin');
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // Force account selection to avoid automatic login with wrong account
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      // Detect if it's a mobile device or a tablet
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        console.log("Mobile detected, using signInWithRedirect");
        await signInWithRedirect(auth, provider);
      } else {
        console.log("Desktop detected, using signInWithPopup");
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAdmin: isAdmin || user?.email === 'vallrack67@gmail.com', 
      loading, 
      loginWithGoogle, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
