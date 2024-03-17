import React from 'react';
import {Card, Heading, Skeleton, Text, VStack} from "@chakra-ui/react";
import useAuth from "@/hooks/auth/useAuth";

const Profile = () => {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Skeleton />
        )
    }

    if(!user) {
        return (
            <Card>
                <Heading>
                    No User
                </Heading>
                <Text>
                    Please log in to view your profile page.
                </Text>
            </Card>
        )
    }

    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <Heading color='#2B7A78'>
                This is your profile page
            </Heading>
            <Text color='#2B7A78'>
                You can see your past activity here
            </Text>
        </VStack>
    );
};

export default Profile;