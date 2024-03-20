import {VoteStatus} from "@/types/Vote";
import {UseToastOptions} from "@chakra-ui/react";

export const getVoteIncrement = (currentStatus: VoteStatus, newVoteStatus: VoteStatus) => {
    // Create a tuple of the current status and the action
    const statusActionPair = [currentStatus, newVoteStatus] as const;

    switch (statusActionPair.join('|')) {
        case `${VoteStatus.NONE}|${VoteStatus.UPVOTED}`:
        case `${VoteStatus.DOWNVOTED}|${VoteStatus.NONE}`:
            return 1; // New upvote or undo downvote
        case `${VoteStatus.UPVOTED}|${VoteStatus.NONE}`:
        case `${VoteStatus.NONE}|${VoteStatus.DOWNVOTED}`:
            return -1; // Undo upvote or new downvote
        case `${VoteStatus.UPVOTED}|${VoteStatus.DOWNVOTED}`:
            return -2; // Change upvote to downvote
        case `${VoteStatus.DOWNVOTED}|${VoteStatus.UPVOTED}`:
            return 2; // Change downvote to upvote
        default:
            return 0; // No change or invalid combination
    }
};

export const getToastMessage = (
    results: [boolean, boolean],
    currentStatus: VoteStatus,
    newVoteStatus: VoteStatus
): UseToastOptions => {
    const success = results[0] && results[1];
    if(newVoteStatus === VoteStatus.NONE) {
        const voteType = currentStatus === VoteStatus.UPVOTED ? "Upvote" : "Downvote";
        return {
            title: success ? `${voteType} Removed` : `${voteType} Failed`,
            description: success
                ? `Your ${voteType.toLowerCase()} has been removed.`
                : `Your ${voteType.toLowerCase()} could not be removed.`,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        }
    } else {
        const voteType = newVoteStatus === VoteStatus.UPVOTED ? "Upvote" : "Downvote";
        return {
            title: success ? `${voteType} Successful` : `${voteType} Failed`,
            description: success ? `Your ${voteType.toLowerCase()} has been recorded.` : `Your ${voteType.toLowerCase()} could not be recorded.`,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        }
    }
}