import React from 'react';
import {Card, Heading, Text, VStack} from "@chakra-ui/react";
import SignInWithGoogleButton from "@/components/AuthButton/SignInWithGoogleButton";

const NotConnected = () => {
    return (
        <Card>
            <VStack>
                <Heading>
                    You are not signed in
                </Heading>
                <Text>
                    You must be signed in to view this page
                </Text>
                <SignInWithGoogleButton />
            </VStack>
        </Card>
    );
};

export default NotConnected;
