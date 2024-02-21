import React from 'react';
import { Heading, VStack } from "@chakra-ui/react";
import { Professor } from '@/types/Professor';
import ProfessorCard from '../ProfessorCard/index';
import useFeed from "@/hooks/feed/useFeed";
import { useState } from 'react';

const HomePage = () => {
    const {
        courseId,
        setCourseId,
        sortBy,
        setSortBy,
        professors,
        loading,
    } = useFeed();

    const [numProf, setNumProf] = useState(100);
    const [endScroll, setEndScroll] = useState(false);

    
      // Function to simulate loading more data
      const loadMoreData = () => {
        setEndScroll(true);
        // Simulate loading more data from an API or database
        setTimeout(() => {
            setNumProf(numProf+100);
            setEndScroll(false);
        }, 1000);
      };
    
      // Function to handle scroll events
      const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && numProf < professors.length) {
          // User has scrolled to the bottom
          loadMoreData();
        }
      };

    return (
        <div style={{ height: '500px', overflowY: 'auto' }} onScroll={handleScroll}>
            {/* <VStack
                w={'100%'}
                spacing={8}
                align="center"
                p={6}
            > */}
            {professors.slice(0, numProf).map((professor: Professor, index) => (
                <ProfessorCard
                    key={index}
                    professorData={professor}
                    ranking={index + 1}
                />
            ))}
            {endScroll && <li>Loading...</li>}
        {/* </VStack> */}
    </div>
    );
};

export default HomePage;
