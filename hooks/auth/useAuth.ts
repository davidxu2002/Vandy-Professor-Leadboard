import { useState, useEffect } from "react";

import auth from "@/firebase/auth";

import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {User} from "@firebase/auth";

const useAuth = () => {

    const [rawUser, loading, error] = useAuthState(auth);

    const [user, setUser] = useState<User | null| undefined>(rawUser);

    useEffect(() => {
        setUser(rawUser);
    }, [rawUser]);

    const [signOut] = useSignOut(auth);

    const onSignOut = async (): Promise<boolean> => (
        signOut()
            .then((_result) => true)
            .catch((_error) => false)
    )

    return {
        user,
        isConnected: !!user,
        onSignOut,
        loading,
        error,
    }
}

export default useAuth;