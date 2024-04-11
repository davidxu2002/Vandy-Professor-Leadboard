import {addDoc, collection, doc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {VoteInput, VoteStatus} from "@/types/Vote";
import {COMMENTS_COLLECTION, PROFESSORS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

export const addCommentVote = async (reviewId: string, commentId: string, vote: VoteInput) => {
    const doc = await addDoc(collection(firestore, PROFESSORS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId, VOTES_COLLECTION), vote)
    await updateDoc(doc, {
        id: doc.id,
    });
}

export const updateCommentVote = async (reviewId: string, commentId: string, voteId: string, voteStatus: VoteStatus) => {
    return updateDoc(doc(firestore, PROFESSORS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId, VOTES_COLLECTION, voteId), {
        voteStatus,
    });
}

