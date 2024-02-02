import React from 'react';

import {Button} from "@chakra-ui/react";
import {FcGoogle} from "react-icons/fc";

import useLogin from "@/hooks/useSignIn";

const SignInWithGoogleButton = () => {

    const { onSignIn } = useLogin();

    return (
        <Button
            leftIcon={<FcGoogle />}
            onClick={onSignIn}
        >
            Log In with Google
        </Button>
    );
};

export default SignInWithGoogleButton;