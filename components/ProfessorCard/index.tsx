import React, { useState } from 'react';
import { Card, CardBody, Text, Flex, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, IconButton, HStack } from "@chakra-ui/react";
import { Professor } from '@/types/Professor';
import { motion } from 'framer-motion';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { updateProfVote } from '@/services/professorVotes';

interface Props {
    professorData: Professor;
    ranking: number;
}

const MotionCard = motion(Card); // Wrap Card with motion for animation

const ProfessorCard: React.FC<Props> = ({ professorData, ranking }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [votes, setVotes] = useState(0);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleVote = (voteType: 'up' | 'down') => {
        setVotes((prevVotes) => {
            // Update the firebase count
            // updateProfVote()
            return voteType === 'up' ? prevVotes + 1 : prevVotes - 1;
        });
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
                            SUBJECT
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

            <Modal isOpen={isOpen} onClose={handleCloseModal} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{professorData.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <Text color={'#2B7A78'} fontSize="md">
                            {professorData.subject}
                        </Text> */}
                        <Text color={'#4A5568'} fontSize="md">
                            Some additional information or description about the professor goes here.
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfessorCard;
