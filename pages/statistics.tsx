import React from 'react';
import { Center, Flex, Heading, VStack, Text, Box } from "@chakra-ui/react";
import { Professor } from '@/types/Professor';
import Navbar from '@/components/Navbar/index';

const DataDisplay = ({ label, number }) => {
    return (
      <Box bg='white' text='black' p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" m="4">
        <Heading color='black' as="h2" size="md" mb="2">{label}</Heading>

        <Center>
        <Text color='black' fontSize="2xl" fontWeight="bold">{number}</Text>

        </Center>

      </Box>
    );
  }

const ProfessorsPage = () => {
    return (
        <VStack
          w={'100%'}
          spacing={2}
          align="center"
          p={6}
        >
            <Flex direction="column" alignItems="center" justifyContent="center" mt="8">
                <DataDisplay label="Most Upvotes" number={123} />
                <DataDisplay label="Most Places Climbed" number={456} />
                <DataDisplay label="Most Downvotes" number={789} />
                <DataDisplay label="Most Places Fallen" number={101112} />
            </Flex>
        </VStack>
    );
};

export default ProfessorsPage;
