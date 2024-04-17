import auth from "@/firebase/auth";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from 'react';
import firebase from 'firebase/app';
import db from "@/firebase/db";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import 'firebase/firestore';


const provider = new GoogleAuthProvider();
provider.setCustomParameters({hd: "vanderbilt.edu"})
const useLogin = () => {

    const [user, loading, error] = useAuthState(auth);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in
            console.log('User signed in:', user.uid);
    
            // Add the user to the "users" collection
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    displayName: user.displayName,
                    email: user.email,
                    // Add any other user data you want to store
                });
                console.log('User added to "users" collection');
            } catch (error) {
                console.error('Error adding user to "users" collection:', error);
            }
        } else {
            // No user is signed in
            console.log('No user signed in');
        }
    });

    const onSignIn = async () => {
        const result = await signInWithPopup(auth, provider)
            .catch((error) => {
                console.log(error)
            })
        console.log(result);
    }

    return {
        user,
        onSignIn,
        loading,
        error
    }
}

export default useLogin;