'use client';

import { useGoogleOneTapLogin } from '@react-oauth/google';
import { signInWithCredential, GoogleAuthProvider, User } from 'firebase/auth';
import { auth } from '../firebase/clientApp';
import { useState, useEffect } from 'react';

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log('Firebase User Object:', user);
        console.log('ID Token:', user.getIdToken());
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      console.log('Google One Tap response:', credentialResponse);
      const credential = GoogleAuthProvider.credential(credentialResponse.credential);
      try {
        const result = await signInWithCredential(auth, credential);
        setUser(result.user);
        setError(null);
        console.log('Firebase Sign-In Result:', result);
      } catch (error: any) {
        console.error('Error signing in with Google:', error);
        setError(error.message || 'An error occurred during sign-in');
      }
    },
    onError: () => {
      console.log('Login Failed');
      setError('Login failed');
    },
  });

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      setError(null);
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out:', error);
      setError('Error signing out');
    });
  };

  return (
    <div className="p-4">
      {user ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <p><strong>Display Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
          <p><strong>Provider ID:</strong> {user.providerData[0]?.providerId}</p>
          <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
          <button onClick={handleSignOut} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
        </div>
      ) : (
        <p className="text-lg">Please sign in with Google One Tap.</p>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}