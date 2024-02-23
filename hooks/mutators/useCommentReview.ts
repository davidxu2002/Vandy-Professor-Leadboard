import useAuth from "@/hooks/auth/useAuth";
import useCommentVotes from "@/hooks/queries/useCommentVotes";

import {voteComment} from "@/services/comment";
import {addCommentVote, updateCommentVote} from "@/services/commentVotes";

import {VoteStatus} from "@/types/Vote";

const useVoteComment = (reviewId: string, commentId: string) => {

    const { user } = useAuth();

    const { votes, loading } = useCommentVotes(user?.uid || "", reviewId, commentId);

    const onUpvote = async () => {
        if(loading || !user) return;
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            if(voteStatus != VoteStatus.UPVOTED)
            {
                await Promise.all([
                    voteComment(reviewId, commentId, voteStatus == VoteStatus.DOWNVOTED ? 2 : 1),
                    updateCommentVote(reviewId, commentId, votes[0].id, VoteStatus.UPVOTED)
                ])
            }
            else {
                await Promise.all([
                    voteComment(reviewId, commentId, -1),
                    updateCommentVote(reviewId, commentId, votes[0].id, VoteStatus.NONE)
                ])
            }
        } else {
            await Promise.all([
                await voteComment(reviewId, commentId, 1),
                await addCommentVote(reviewId, commentId,{
                    userId: user.uid || "",
                    voteStatus: VoteStatus.UPVOTED,
                })
            ])
        }
    }

    const onDownvote = async () => {
        if(loading || !user) return;
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            if(voteStatus != VoteStatus.DOWNVOTED)
            {
                await Promise.all([
                    voteComment(reviewId, commentId,voteStatus == VoteStatus.UPVOTED ? -2 : -1),
                    updateCommentVote(reviewId, commentId, votes[0].id, VoteStatus.DOWNVOTED)
                ])
            }
            else {
                await Promise.all([
                    voteComment(reviewId, commentId, 1),
                    updateCommentVote(reviewId, commentId, votes[0].id, VoteStatus.NONE)
                ])
            }
        } else {
            await Promise.all([
                await voteComment(reviewId, commentId,-1),
                await addCommentVote(reviewId, commentId,{
                    userId: user.uid || "",
                    voteStatus: VoteStatus.DOWNVOTED,
                })
            ])
        }
    }

    return {
        onUpvote,
        onDownvote,
        voteStatus: votes?.length ? votes[0].voteStatus : VoteStatus.NONE,
        loading,
    }

}

export default useVoteComment;