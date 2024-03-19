import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {COMMENTS_COLLECTION, PROFESSORS_COLLECTION} from "@/firebase/firestore/collections";

import {CommentInput} from "@/types/Comment";

// adds a comment document to a review's comments subcollection
export const addComment = async (commentInput: CommentInput): Promise<boolean> => {
    try {
        // create the document with the input data
        const doc = await addDoc(collection(firestore, PROFESSORS_COLLECTION, commentInput.reviewId, COMMENTS_COLLECTION), {
            ...commentInput,
            createdAt: new Date(),
            score: 0,
        })
        // update the document with the ID
        await updateDoc(doc, {
            id: doc.id,
        })
        return true
    } catch (e) {
        return false
    }

}

// upvotes or downvotes a review
export const voteComment = async (reviewId: string, commentId: string, amountIncrement: number): Promise<boolean> =>
    updateDoc(doc(firestore, PROFESSORS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId), {
        score: increment(amountIncrement),
    })
        .then(() => true)
        .catch(() => false)