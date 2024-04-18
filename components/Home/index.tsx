import React, { useState, useEffect } from 'react';
import { Box, Center, Heading, VStack, Spinner, Button, NumberInput, NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, 
  Badge,
} from "@chakra-ui/react";
import { Professor } from '@/types/Professor';
import ProfessorCard from '../ProfessorCard/index';
import useFeed from "@/hooks/feed/useFeed";
import HomeModal from './modal';
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { CloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import ExploreHeader from './ExploreFilter/index';

const HomePage = () => {
    const {
        subjectId,
        setSubjectId,
        sortBy,
        setSortBy,
        professor,
        setProfessor,
        professors,
        loading,
    } = useFeed();

    const [numProf, setNumProf] = useState(50);
    const [endScroll, setEndScroll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    // For the alert stuff
    const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });

    useEffect(() => {
      setIsModalOpen(true); // Open the modal when the component mounts
      if (isOpen) {
        const timeout = setTimeout(() => {
          onClose();
          onToggle();
        }, 3000); // Close the alert after 3 seconds
  
        return () => clearTimeout(timeout);
      }
    }, [isOpen, onClose, onToggle]);
  
    const alertVariants = {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    };

    // Function to simulate loading more data
    const loadMoreData = () => {
      setEndScroll(true);
      setTimeout(() => {
          setNumProf(numProf+50);
          setEndScroll(false);
      }, 1000);
    };
  
    // Function to handle scroll events
    const handleScroll = (event) => {
      const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
      if (scrollHeight - scrollTop === (clientHeight) && numProf < professors.length) {
        // User has scrolled to the bottom
        loadMoreData();
      }
    };

    return (
      
      <>
      {isOpen ? (
            // <motion.div
            //   pos="fixed"
            //   initial="hidden"
            //   animate={isOpen ? 'visible' : 'hidden'}
            //   exit="exit"
            //   variants={alertVariants}
            //   transition={{ duration: 0.5 }}
            //   zIndex={100}
            // >
              <Alert
                pos="fixed"
                top="0"
                left="0"
                zIndex="100"
                status="info"
                borderRadius="md"
                boxShadow="md"
              >
                <AlertIcon />
                <AlertTitle>Login with Vanderbilt email to vote</AlertTitle>
              </Alert>
            // </motion.div>
          ) : (<></>)}
        <VStack
          w={'100%'}
          spacing={2}
          align="center"
          p={6}
        >
          <Box
    bg='white'
    w='100%'
    p='4'
    borderRadius="lg"
    boxShadow="md" // Adding a slight shadow for depth
    mb="" // Adding margin bottom for separation from other elements
>
    <Center>
        <Heading
            as="h1" // Using semantic HTML by specifying it as an h1
            size="lg" // Adjusting the size of the heading
            fontWeight="bold" // Making the heading bold for emphasis
            color="gray.800" // Setting a darker color for better visibility
            ml='2'
        > Vandy Professor Leaderboard
        </Heading>
    </Center>
</Box>

            <ExploreHeader
              subjectId={subjectId}
              setSubjectId={setSubjectId}
              professor={professor}
              setProfessor={setProfessor}
              sortBy={sortBy}
              setSortBy={setSortBy}
              numProf={numProf}
              setNumProf={setNumProf}
            />
            <VStack
                w={'100%'}
                spacing={4}
                // height='690px'
                overflowY='auto'
                // onScroll={handleScroll}
            >
            <HomeModal />
            {/* This part could probably be made into a separate component? */}
            {professors.slice(0, numProf).map((professor: Professor, index) => (
                <ProfessorCard
                    key={index}
                    professorData={professor}
                    setSubjectId={setSubjectId}
                    setProfessor={setProfessor}
                    onToggleAlert={onToggle}
                />
            ))}
              {/* {endScroll && <Spinner></Spinner>} */}
            </VStack>
      </VStack>
      </>

    );
};

export default HomePage;
