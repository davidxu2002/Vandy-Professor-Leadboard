import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {CommentInput} from "@/types/Comment";
import {COMMENTS_COLLECTION, PROFESSORS_COLLECTION } from "@/firebase/firestore/collections";

// adds a review to the database
export const addComment = async (commentInput: CommentInput) => {
    const doc = await addDoc(collection(firestore, PROFESSORS_COLLECTION, commentInput.reviewId, COMMENTS_COLLECTION), {
        ...commentInput,
        createdAt: new Date(),
        score: 0,
    })
    await updateDoc(doc, {
        id: doc.id,
    })
}

// upvotes or downvotes a review
// export const voteComment = async (reviewId: string, commentId: string, amountIncrement: number) => {
//     return updateDoc(doc(firestore, PROFESSORS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId), {
//         score: increment(amountIncrement),
//     });
// }