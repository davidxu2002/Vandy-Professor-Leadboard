import React from 'react';
import {Heading, VStack} from "@chakra-ui/react";

const HomePage = () => {
    return (
        <VStack
            w={'100%'}
            spacing={8}
        >
            <Heading
                size={'lg'}
                color={'#2B7A78'}
            >
                Vanderbilt Professor Leaderboard
            </Heading>
        </VStack>
    );
};

export default HomePage;
