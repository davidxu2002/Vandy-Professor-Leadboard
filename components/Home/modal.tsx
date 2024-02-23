import React, { useState, useEffect } from "react";
import {
    useDisclosure, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react';

function HomeModal() {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    useEffect(() => {
        onClose(); // Close the modal when component mounts
    }, []);
    
    return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Welcome to Vanderbilt Professor Leaderboard!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Insert instructions here!
                    </ModalBody>
                </ModalContent>
            </Modal>
    );
}

export default HomeModal;