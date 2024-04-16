import React, { useState, useEffect } from 'react';
import { Box, Card, CardBody,CardFooter, Divider, Text, Flex, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, IconButton, HStack } from "@chakra-ui/react";
import { Professor } from '@/types/Professor';
import { motion } from 'framer-motion';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { updateProfVote } from '@/services/professorVotes';
import { VoteStatus } from '@/types/Vote';
import CardModal from './CardModal/index';
import Comments from "@/components/Home/Comments";
import WriteComment from "@/components/Home/Comments/WriteComment";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import db from '@/firebase/db';
import { getFirestore, collection, doc, getDoc, where, query} from 'firebase/firestore';
import {useCollectionData} from "react-firebase-hooks/firestore";


import { PROFESSORS_COLLECTION } from '@/firebase/firestore/collections';
import app from '@/node_modules/next/app';

interface Props {
    professorData: Professor;
    setSubjectId?: (subjectId: string | null) => void;
    setProfessor?: (professor: Professor | null) => void;
    onToggleAlert: (toggled: boolean) => void;
}

const MotionCard = motion(Card); // Wrap Card with motion for animation

const ProfessorCard: React.FC<Props> = ({ professorData, setSubjectId, setProfessor, onToggleAlert }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subjectName, setSubjectName] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Initialize Firebase authentication
        const auth = getAuth();

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Unsubscribe to avoid memory leaks
        return () => unsubscribe();
    }, []);

    const fetchProfessorSubject = async (professorData: Professor): Promise<string> => {
        try {
            const subjectData = professorData.subject;
            
            if (subjectData && subjectData.ref) {
                return subjectData.ref;
            } else {
                return "No Subject";
            }
            
        } catch (error) {
            console.error("Error fetching professor subject:", error);
            return "No Subject";
        }
    };

    useEffect(() => {
        fetchSubjectName(); // Call the function when the component mounts
    }, [professorData]); // Call the function whenever professorData changes

    // Function to fetch the subject name and set it in the state
    const fetchSubjectName = async () => {
        try {
            const name = await fetchProfessorSubject(professorData); // Call the function
            setSubjectName(name); // Set the subject name in the state
        } catch (error) {
            console.error("Error fetching subject name:", error);
            setSubjectName("No Subject"); // Handle errors gracefully
        }
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleVote = (voteType: 'up' | 'down') => {
        if (user) {
            updateProfVote(professorData.id, 'a', voteType === 'up' ? VoteStatus.UPVOTED : VoteStatus.DOWNVOTED);
            if (voteType == 'up') {
                // handlePlaceChangeUp();
            }
            else {
                // handlePlaceChangeDown();
            }
        } else {
            console.log("Please log in to vote.");
            onToggleAlert(true);
        }
    };

    return (
        <>
            <MotionCard
                whileHover={{ scale: .99 }} // Scale on hover
                width={'100%'}
                borderRadius="lg"
                boxShadow="md"
                backgroundColor="#F7FAFC"
                p={1}
                cursor="pointer"
                onClick={handleOpenModal}
            >
                <CardBody

                >
    <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        pb={2}
        mb={2}
    >
        <Box>
            <Text
                color="gray.700"
                fontSize="xl"
                fontWeight="bold"
            >
                            <Badge 
                            fontSize='xlg'
                            variant='subtle'
                            colorScheme='gray'
                            mr='3'
                            >{professorData.current_place}.</Badge> 
                            <Badge 
                            fontSize='xlg'
                            variant='subtle'
                            colorScheme='gray'
                            mr='3'
                            >{professorData.name}</Badge> 
                            {/* {professorData.name} */}
            </Text>
        </Box>
        <Badge
            colorScheme="teal"
            fontSize="sm"
            borderRadius="full"
            px={2}
            py={1}
        >
            {subjectName}
        </Badge>
    </Flex>
    {/* <HStack mt={4} spacing={4} justifyContent="flex-end">
        <IconButton
            aria-label="Upvote"
            color="gray.600"
            icon={<AiOutlineArrowUp />}
            onClick={(event) => {
                event.stopPropagation();
                handleVote('up');
            }}
        />
        <Text color="gray.600" fontSize="lg">
            {professorData.votes}
        </Text>
        <IconButton
            aria-label="Downvote"
            color="gray.600"
            icon={<AiOutlineArrowDown />}
            onClick={(event) => {
                event.stopPropagation();
                handleVote('down');
            }}
        />
    </HStack> */}
        </CardBody>
        <Divider 
            color="gray.400"
        />
        <CardFooter
            color="gray.400"
        >
            {professorData.votes} votes | { professorData.votes - professorData.day_start.score} votes on day
        </CardFooter>
            </MotionCard>
            <CardModal
                professorData={professorData}
                isOpen={isOpen}
                handleCloseModal={handleCloseModal}
            />
        </>
    );
};

export default ProfessorCard;
