import React from 'react';

import UpvoteDownvote from "@/components/Utilities/UpvoteDownvote";

import useVoteComment from "@/hooks/mutators/useVoteComment";

interface Props {
    reviewId: string
    commentId: string,
    score: number
}

const CommentUpvoteDownvote: React.FC<Props> = ({ reviewId, commentId, score }) => {

    const { onUpvote, onDownvote, voteStatus } = useVoteComment(reviewId, commentId);

    return (
        <UpvoteDownvote
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            voteStatus={voteStatus}
            score={score}
            iconSize={'1rem'}
            scoreSize={'sm'}
        />
    );
};

export default CommentUpvoteDownvote;