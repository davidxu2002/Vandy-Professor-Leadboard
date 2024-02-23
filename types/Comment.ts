import {Moment} from "moment";

export interface CommentInput {
    reviewId: string;
    content: string;
    userId: string;
}

export interface Comment extends CommentInput {
    id: string;
    score: number;
    createdAt: Moment;
}