import React from 'react';

import {Text, useColorModeValue, HStack, VStack} from "@chakra-ui/react";

import CommentUpvoteDownvote from "@/components/Home/Comments/CommentUpvoteDownvote";

import { Comment as CommentType } from "@/types/Comment";

interface Props {
    comment: CommentType
}

const Comment: React.FC<Props> = ({ comment }) => {

    const borderColor = 'blackAlpha.400';
    const timeColor = 'blackAlpha.700';

    return (
        <HStack
            w={'100%'}
            borderWidth={1}
            borderColor={borderColor}
            rounded={'md'}
            p={2}
            justifyContent={'space-between'}
        >
            <VStack
                align={'start'}
            >
                <Text
                    flex={1}
                    color={'#4A5568'}
                >
                    {comment.content}
                </Text>
                <Text
                    fontSize={'xs'}
                    color={timeColor}
                >
                    {comment.createdAt.fromNow()}
                </Text>
            </VStack>
            <CommentUpvoteDownvote
                reviewId={comment.reviewId}
                commentId={comment.id}
                score={comment.score}
            />
        </HStack>
    );
};

export default Comment;
