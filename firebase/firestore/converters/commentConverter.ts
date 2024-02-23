import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import moment from "moment/moment";

import firestore from "@/firebase/firestore";

import {COMMENTS_COLLECTION, REVIEWS_COLLECTION} from "@/firebase/firestore/collections";

import {Comment} from "@/types/Comment";

const commentConverter: FirestoreDataConverter<Comment> = {
    toFirestore(review: WithFieldValue<Comment>): DocumentData {
        return {
            id: review.id,
            reviewId: review.reviewId,
            userId: review.userId,
            content: review.content,
            score: review.score,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Comment {
        const data = snapshot.data(options);
        return {
            id: data.id,
            reviewId: data.reviewId,
            userId: data.userId,
            content: data.content,
            score: data.score,
            createdAt: moment.unix(data.createdAt.seconds),
        };
    },
};

const commentsCollection = (reviewId: string) => collection(firestore, REVIEWS_COLLECTION, reviewId, COMMENTS_COLLECTION)
    .withConverter(commentConverter);

export default commentsCollection;