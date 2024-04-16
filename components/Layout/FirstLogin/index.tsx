import React, { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { addUserDoc } from '@/services/userData';

const FirstLoginHandler = () => {
  const { user } = useAuth();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user && user.metadata.creationTime === user.metadata.lastSignInTime) {
        // User just signed up (first login)
        handleFirstLogin(user);
      }
    });

    return () => unregisterAuthObserver(); // Cleanup
  }, []);

  const handleFirstLogin = (user) => {
    // Your function to execute on first login
    addUserDoc(user.id);
  };

  return null; // This component doesn't render anything
};

export default FirstLoginHandler;
