import React, { useState, useEffect } from 'react';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Image
} from '@chakra-ui/react';
import Cookies from 'js-cookie';

const HomeModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        // Check if the modalShown cookie exists
        const modalShown = Cookies.get('modalShown');
        if (!modalShown) {
            // If the cookie doesn't exist, show the modal and set the cookie
            onOpen();
            Cookies.set('modalShown', 'true', { expires: 7 }); // Cookie expires in 7 days
        }
    }, [onOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center" fontSize="2xl">Welcome to Vanderbilt Professor Leaderboard!</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign="center" paddingY={4} marginTop={-4}>
                    <Image src="/HomePage.png" alt="Sample image of home page" />
                    <Text color={'#4A5568'} fontSize="md" marginTop={4}>
                        This is a dynamic leaderboard that is designed to promote professor evaluation
                        in a fun and engaging way. You have one vote a day and can use it to either upvote
                        your favorite professor or downvote your not-so-favorite professor. Log in with
                        your Vanderbilt account to begin voting!
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default HomeModal;
