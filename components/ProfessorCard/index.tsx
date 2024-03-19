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

interface Props {
    professorData: Professor;
    ranking: number;
}

const MotionCard = motion(Card); // Wrap Card with motion for animation

const ProfessorCard: React.FC<Props> = ({ professorData, ranking }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subjectName, setSubjectName] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);

    // useEffect(() => {
    //     if (professorData) {
    //         fetchSubject();
    //     }
    // }, [professorData]);

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

    const fetchSubject = async () => {
        try {
            const subjects = await fetchSubjects(100);
            if (subjects.length > 0) {
                setSubjectName(subjects[0].name);
            } else {
                setSubjectName("No Subject");
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
            setSubjectName("No Subject");
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
