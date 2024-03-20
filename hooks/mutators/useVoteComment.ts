import useAuth from "@/hooks/auth/useAuth";
import useCommentVotes from "@/hooks/queries/useCommentVotes";
import useVote from "@/hooks/mutators/useVote";

import {voteComment} from "@/services/comment";
import {addCommentVote, updateCommentVote} from "@/services/commentVotes";


import {VoteInput, VoteStatus} from "@/types/Vote";

// custom hook to handle voting on comments
const useVoteComment = (reviewId: string, commentId: string) => {

    const { user } = useAuth();

    // gets the current votes for the comment
    const { votes, loading } = useCommentVotes(user?.uid || "", reviewId, commentId);

    return useVote(
        user?.uid || "",
        votes,
        loading,
        (amountIncrement: number) => voteComment(reviewId, commentId, amountIncrement),
        (voteId: string, voteStatus: VoteStatus) => updateCommentVote(reviewId, commentId, voteId, voteStatus),
        (vote: VoteInput) => addCommentVote(reviewId, commentId, vote),
    )
}

export default useVoteComment;