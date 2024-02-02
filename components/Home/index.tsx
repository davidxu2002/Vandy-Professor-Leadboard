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
                color={'black'}
            >
                Vandy Professor Leaderboard
            </Heading>
        </VStack>
    );
};

export default HomePage;
