import React from 'react';

import {Card, Divider, Skeleton, Text, VStack} from "@chakra-ui/react";

import Comment from "@/components/Home/Comments/Comment";

import useComments from "@/hooks/queries/useComments";
import SortByRadio from "@/components/Utilities/SortByRadio";

interface Props {
    reviewId: string
}

const Comments: React.FC<Props> = ({ reviewId }) => {

    const { comments, loading, sortByComment, setSortBy } = useComments(reviewId);

    return (
        <VStack
            w={'100%'}
            alignItems={'flex-start'}
        >
            <SortByRadio
                sortByComment={sortByComment}
                setSortBy={setSortBy}
            />
            <Divider />
            {
                loading ? (
                    <Skeleton
                        w={'100%'}
                    />
                ) : (
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
                )
            }
        </VStack>
    );
};

export default Comments;