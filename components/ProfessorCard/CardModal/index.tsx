import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { Professor } from "@/types/Professor";
import Comments from "@/components/Home/Comments/index";
import WriteComment from "@/components/Home/Comments/WriteComment";

interface Props {
    professorData: Professor;
    isOpen: boolean;
    handleCloseModal: () => void;
}

const CardModal: React.FC<Props> = ({ professorData, isOpen, handleCloseModal }) => {
    return (
        <>
        <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader paddingBottom="2">{professorData.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody paddingBottom="2">
                    {/* <Text color={'#2B7A78'} fontSize="md">
                        {professorData.subject}
                    </Text> */}
                    <Text color={'#4A5568'} fontSize="md" marginBottom="4">
                        Some additional information or description about the professor goes here.
                    </Text>
                    <WriteComment reviewId={professorData.id} />
                                <Comments
                                    reviewId={professorData.id}
                                />
                </ModalBody>
            </ModalContent>
        </Modal>
    </>

    );
}

export default CardModal;