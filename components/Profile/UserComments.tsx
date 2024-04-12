// Import React and necessary components from Chakra UI
import React from 'react';
import { VStack, Skeleton } from "@chakra-ui/react";
// Import the custom hooks and components
import useUserComments from "@/hooks/queries/useUserComments";
import Reviews from "@/components/Home/Comments";

// Define the props interface for the UserReviews component
interface Props {
    userId: string
}

// Define the UserReviews component with destructured userId from props
const UserReviews: React.FC<Props> = ({ userId }) => {
    // Use the custom hook to fetch comments associated with the userId
    const { comments, loading } = useUserComments(userId);

    return (
        // Vertical Stack for layout
        <VStack w={'100%'}>
            {
                // Conditional rendering based on loading state
                loading ? (
                    // Show a skeleton when loading
                    <Skeleton height='20px' width='100%' />
                ) : (
                    // Pass the comments to the Reviews component when not loading
                    <Reviews comments={comments} />
                )
            }
        </VStack>
    );
};

export default UserReviews;
