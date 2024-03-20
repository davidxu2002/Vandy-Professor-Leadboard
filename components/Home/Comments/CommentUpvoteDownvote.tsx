import React from 'react';

import UpvoteDownvote from "@/components/Utilities/UpvoteDownvote";

import useVoteComment from "@/hooks/mutators/useCommentReview";

interface Props {
    reviewId: string
    commentId: string,
    score: number
}

const CommentUpvoteDownvote: React.FC<Props> = ({ reviewId, commentId, score }) => {

    const { onUpvote, onDownvote, voteStatus } = useVoteComment(reviewId, commentId);

    let scoreColor = '';
    if (score > 0) {
        scoreColor = 'green.500';
    } else if (score < 0) {
        scoreColor = 'red.500';
    } else {
        scoreColor = 'blackAlpha.700';
    }

    return (
        <UpvoteDownvote
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            voteStatus={voteStatus}
            score={score}
            iconSize={'1rem'}
            scoreSize={'sm'}
            scoreColor={scoreColor}
        />
    );
};

export default CommentUpvoteDownvote;
