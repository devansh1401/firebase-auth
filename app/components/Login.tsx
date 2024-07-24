'use client';

import { useGoogleOneTapLogin } from '@react-oauth/google';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/clientApp';
import { useState, useEffect } from 'react';

export default function Login() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      const credential = GoogleAuthProvider.credential(credentialResponse.credential);
      try {
        const result = await signInWithCredential(auth, credential);
        setUser(result.user);
      } catch (error) {
        console.log(error);
        console.error('Error signing in with Google:', error);
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div className="p-4">
      {user ? (
        <div>
          <p className="text-lg">Welcome, {user.displayName}!</p>
          <button onClick={handleSignOut} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
        </div>
      ) : (
        <p className="text-lg">Please sign in with Google One Tap.</p>
      )}
    </div>
  );
}