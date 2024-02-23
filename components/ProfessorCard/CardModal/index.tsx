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