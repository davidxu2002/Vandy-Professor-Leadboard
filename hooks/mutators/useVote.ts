import {useToast} from "@chakra-ui/react";

import {getToastMessage, getVoteIncrement} from "@/services/voteUtils";

import {Vote, VoteInput, VoteStatus} from "@/types/Vote";

// custom hook to handle voting on comments
const useVote = (
    userId: string,
    votes: Vote[],
    loading: boolean,
    vote: (amountIncrement: number) => Promise<boolean>,
    updateVote: (voteId: string, voteStatus: VoteStatus) => Promise<boolean>,
    addVote: (vote: VoteInput) => Promise<boolean>,
) => {

    const toast = useToast();

    const handleVote = async (voteType: VoteStatus) => {
        if (loading || !userId) return;

        const alreadyVoted = votes?.length;
        const currentVoteStatus = alreadyVoted ? votes[0].voteStatus : VoteStatus.NONE;
        const newStatus = currentVoteStatus === voteType ? VoteStatus.NONE : voteType;
        const amountIncrement = getVoteIncrement(currentVoteStatus, newStatus);

        const results = await Promise.all([
            vote(amountIncrement),
            alreadyVoted
                ? updateVote(votes[0].id, newStatus)
                : addVote({
                    userId,
                    voteStatus: newStatus,
                })
        ]);

        toast(getToastMessage(results, currentVoteStatus, newStatus));
    };

    const onUpvote = async () => {
        await handleVote(VoteStatus.UPVOTED);
    };

    const onDownvote = async () => {
        await handleVote(VoteStatus.DOWNVOTED);
    };

    return {
        onUpvote,
        onDownvote,
        voteStatus: votes?.length ? votes[0].voteStatus : VoteStatus.NONE,
        loading,
    }

}

export default useVote;