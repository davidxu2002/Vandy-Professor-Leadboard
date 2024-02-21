import React from 'react';
import { Heading, VStack } from "@chakra-ui/react";
import { Professor } from '@/types/Professor';
import ProfessorCard from '@/components/ProfessorCard/index';
import useFeed from "@/hooks/feed/useFeed";


const HomePage = () => {
    const {
        courseId,
        setCourseId,
        sortBy,
        setSortBy,
        professors,
        loading,
    } = useFeed();

    return (
        <VStack
            w={'100%'}
            spacing={8}
            align="center"
            p={6}
        >
            {/* <Heading
                size={'xl'}
                color={'#2B7A78'}
                mb={8}
            >
            Vanderbilt Professor Leaderboard
            </Heading> */}
            {professors.map((professor: Professor, index) => (
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
