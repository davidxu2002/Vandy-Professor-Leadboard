import React from 'react';
import useComments from "@/hooks/queries/useComments";
import {Skeleton, VStack} from "@chakra-ui/react";
import Reviews from "@/components/Home/Comments";
import { Comment } from "@/types/Comment";

interface Props {
    userId: string
}

const UserReviews: React.FC<Props> = ({ userId }) => {

    const { comments, loading } = useComments(userId);

    return (
        <VStack
            w={'100%'}
        >
            {
                loading ? (
                    <Skeleton />
                ) : (
                    <Reviews
                        comment ={comments} // Adjusted here
                        profile
                    />
                )
            }
        </VStack>
    );
};

export default UserReviews;
