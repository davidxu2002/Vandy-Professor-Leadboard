import React from 'react';

import {Avatar, Card, Heading} from "@chakra-ui/react";

import {User} from "@firebase/auth";

interface Props {
    user: User
}

const ProfileHeader: React.FC<Props> = ({ user }) => {

    return (
        <Card
            flexDirection={'row'}
            alignItems={'center'}
            gap={4}
        >
            <Avatar
                size={'lg'}
                name={user.displayName || undefined}
                src={user.photoURL || undefined}
                referrerPolicy="no-referrer"
            />
            <Heading
                size={'md'}
            >
                {user.displayName}
            </Heading>
        </Card>
    );
};

export default ProfileHeader;