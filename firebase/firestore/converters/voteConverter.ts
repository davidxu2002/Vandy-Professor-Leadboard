import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Vote} from "@/types/Vote";
import {COMMENTS_COLLECTION, REVIEWS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

const voteConverter: FirestoreDataConverter<Vote> = {
    toFirestore(review: WithFieldValue<Vote>): DocumentData {
        return {
            id: review.id,
            userId: review.userId,
            voteStatus: review.voteStatus
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Vote {
        const data = snapshot.data(options);
        return {
            id: data.id,
            userId: data.userId,
            voteStatus: data.voteStatus
        };
    },
};

export const reviewVotesCollection = (
    reviewId: string
) => collection(firestore, REVIEWS_COLLECTION, reviewId, VOTES_COLLECTION).withConverter(voteConverter);

export const commentVotesCollection = (
    reviewId: string,
    commentId: string
) => collection(firestore, REVIEWS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId, VOTES_COLLECTION).withConverter(voteConverter);
