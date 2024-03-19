import React, { useState, useEffect } from 'react';
import { Card, CardBody, Text, Flex, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, IconButton, HStack } from "@chakra-ui/react";
import { Professor } from '@/types/Professor';
import { motion } from 'framer-motion';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { updateProfVote } from '@/services/professorVotes';
import { VoteStatus } from '@/types/Vote';
import CardModal from './CardModal/index';
import Comments from "@/components/Home/Comments";
import WriteComment from "@/components/Home/Comments/WriteComment";
import { fetchSubjects } from '@/services/coursesApi/fetch';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import db from '@/firebase/db';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import firestore from '@/firebase/firestore';
import { PROFESSORS_COLLECTION } from '@/firebase/firestore/collections';

interface Props {
    professorData: Professor;
    ranking: number;
}

const MotionCard = motion(Card); // Wrap Card with motion for animation

const ProfessorCard: React.FC<Props> = ({ professorData, ranking }) => {
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
        } else {
            console.log("Please log in to vote.");
        }
    };

    return (
        <>
            <MotionCard
                whileHover={{ scale: 1.1 }} // Scale on hover
                width={500}
                height={150}
                borderRadius="lg"
                boxShadow="md"
                backgroundColor="#F7FAFC"
                p={4}
                cursor="pointer"
                onClick={handleOpenModal}
            >
                <CardBody>
                    <Flex
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        borderBottom="1px solid #CBD5E0"
                        pb={2}
                        mb={2}
                    >
                        <Text
                            color={'#2B7A78'}
                            fontSize="xl"
                            fontWeight="bold"
                        >
                            {ranking}. {professorData.name}
                        </Text>
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
                    <HStack mt={4} spacing={4} justifyContent="flex-end">
                        <IconButton
                            aria-label="Upvote"
                            color="gray.600"
                            icon={<AiOutlineArrowUp />}
                            onClick={(event: { stopPropagation: () => void; }) => {
                                event.stopPropagation();
                                handleVote('up');
                            }
                            }
                        />
                        <Text color="gray.600" fontSize="lg">
                            {professorData.votes}
                        </Text>
                        <IconButton
                            aria-label="Downvote"
                            color="gray.600"
                            icon={<AiOutlineArrowDown />}
                            onClick={(event: { stopPropagation: () => void; }) => {
                                event.stopPropagation();
                                handleVote('down');
                            }
                            }
                        />
                    </HStack>
                </CardBody>
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
