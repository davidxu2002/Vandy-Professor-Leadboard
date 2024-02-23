import React from 'react';

import {Skeleton, Text, VStack} from "@chakra-ui/react";

import Comment from "@/components/Home/Comments/Comment";

import useComments from "@/hooks/queries/useComments";

interface Props {
    reviewId: string
}

const Comments: React.FC<Props> = ({ reviewId }) => {

    const { comments, loading } = useComments(reviewId);

    if(loading) {
        return (
            <Skeleton />
        )
    }

    return (
        <VStack
            w={'100%'}
        >
            {
                comments.length > 0 ? (
                    comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                        />
                    ))
                ) : (
                    <Text>
                        No Comments!
                    </Text>
                )
            }
        </VStack>
    );
};

export default Comments;
