import auth from "@/firebase/auth";

import {useAuthState, useSignOut} from "react-firebase-hooks/auth";

const useAuth = () => {

    const [user, loading, error] = useAuthState(auth);

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