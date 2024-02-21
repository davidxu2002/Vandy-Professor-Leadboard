// input for creating a vote
export interface VoteInput {
    userId: string;
    voteStatus: VoteStatus;
}

// full vote data
export interface Vote extends VoteInput {
    id: string;
}

// vote status
export enum VoteStatus {
    NONE,
    UPVOTED,
    DOWNVOTED
}