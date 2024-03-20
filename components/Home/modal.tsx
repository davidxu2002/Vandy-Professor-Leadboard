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
    Text,
    Image
} from '@chakra-ui/react';
import Cookies from 'js-cookie';

function HomeModal() {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    // const [hasSeenModal, setHasSeenModal] = useState(false);

    // useEffect(() => {
    //     const hasSeenModalBefore = Cookies.get('hasSeenModal');
    //     if (hasSeenModalBefore) {
    //         // If the user has seen the modal before, don't open it
    //         setHasSeenModal(true);
    //     } else {
    //         // If the user hasn't seen the modal before, open it and set the flag
    //         Cookies.set('hasSeenModal', 'true', { expires: 365 }); // Cookie expires in 1 year
    //         setHasSeenModal(false);
    //     }
    // }, []);

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