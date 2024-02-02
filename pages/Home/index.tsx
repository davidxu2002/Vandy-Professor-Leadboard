import React from 'react';
import { Heading, VStack } from "@chakra-ui/react";
import { Professor } from '@/types/Professor';
import ProfessorCard from '@/components/ProfessorCard/index';

const professors: Professor[] = [
    {
        name: "John Doe",
        subject: "Computer Science"
    },
    {
        name: "Alice Johnson",
        subject: "Mathematics"
    },
    {
        name: "Bob Smith",
        subject: "Economics"
    },
    {
        name: "Eva Williams",
        subject: "Physics"
    },
    {
        name: "Michael Davis",
        subject: "Chemistry"
    },
    {
        name: "Sara Miller",
        subject: "Biology"
    },
    {
        name: "Chris Anderson",
        subject: "Psychology"
    },
    {
        name: "Olivia Taylor",
        subject: "History"
    },
    {
        name: "Daniel White",
        subject: "English"
    }
];

const HomePage = () => {
    return (
        <VStack
            w={'100%'}
            spacing={8}
            align="center"
            p={6}
        >
            <Heading
                size={'xl'}
                color={'#2B7A78'}
                mb={8}
            >
            Vanderbilt Professor Leaderboard
            </Heading>
            {professors.map((professor, index) => (
                <ProfessorCard
                    key={index}
                    professorData={professor}
                    ranking={index + 1}
                />
            ))}
        </VStack>
    );
};

export default HomePage;
