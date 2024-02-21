import React from 'react';
import { Heading, VStack, Text, Box } from "@chakra-ui/react";
import { Professor } from '@/types/Professor';

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

const ProfessorsPage = () => {
    return (
        <VStack spacing={4} align="start" p={6}>
            <Heading size="xl" color={'#2B7A78'}>
                Professors
            </Heading>
            <Text>
                Explore the list of talented professors at our institution.
            </Text>
            <VStack align="start" spacing={2}>
                {professors.map((professor, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
                        <Heading size="md">{professor.name}</Heading>
                        <Text>{professor.subject}</Text>
                    </Box>
                ))}
            </VStack>
        </VStack>
    );
};

export default ProfessorsPage;
