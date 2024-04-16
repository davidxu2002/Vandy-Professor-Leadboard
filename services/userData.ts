import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import { PROFESSOR_VOTES_COLLECTION, USERS_COLLECTION } from "@/firebase/firestore/collections";
import { UserData } from "@/types/UserData";
import { VoteStatus } from "@/types/Vote";
import Vote from "@/pages/vote";

// adds a new user document to the users subcollection
export const addUserDoc = async (userId: string): Promise<boolean> => {
    try {
        // create the document with the input data
        const doc = await addDoc(collection(
            firestore, 
            USERS_COLLECTION
            ), 
            {
                upvotes: 0,
                downvotes: 0,
                dailyStreak: 0,
            }
        );
        // update the document with the ID
        await updateDoc(doc, {
            id: userId,
        });
        // const profVoteDoc = await addDoc(collection(firestore, USERS_COLLECTION, userId, PROFESSOR_VOTES_COLLECTION), {
        //     upvote: 0,
        //     downvote: 0,
        // })
        // await updateDoc(profVoteDoc, {
        //     id: userId,
        // });
        return true
    } catch (e) {
        return false
    }
}

// updates the vote status of a vote document that is stored in a comment's votes subcollection
export const updateUserDoc = async (
    userId: string,
    profId: string,
    voteStatus: VoteStatus
): Promise<boolean> => {
    try {
        // Increment votes/downvotes
        if (voteStatus == VoteStatus.UPVOTED) {
            updateDoc(doc(firestore, USERS_COLLECTION, userId), {
                upvotes: increment(1)
            });
        } else {
            updateDoc(doc(firestore, USERS_COLLECTION, userId), {
                downvotes: increment(1) 
            })
        }
        return true;
    } catch (e) {
        return false;
    }
}

