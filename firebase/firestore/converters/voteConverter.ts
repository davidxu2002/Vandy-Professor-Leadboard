import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";
import {COMMENTS_COLLECTION, PROFESSORS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

import {Vote} from "@/types/Vote";

// converts a vote document to a Vote object, allowing for typed queries and strict type checking
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

// collection reference for querying votes on reviews
export const reviewVotesCollection = (
    reviewId: string
) => collection(firestore, PROFESSORS_COLLECTION, reviewId, VOTES_COLLECTION).withConverter(voteConverter);

// collection reference for querying votes on comments
export const commentVotesCollection = (
    reviewId: string,
    commentId: string
) => collection(firestore, PROFESSORS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId, VOTES_COLLECTION).withConverter(voteConverter);