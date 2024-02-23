import {doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {PROFESSORS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

import {VoteStatus} from "@/types/Vote";

// increments/decrements vote field for a professor
export const updateProfVote = async (profId: string, voteId: string, voteStatus: VoteStatus): Promise<boolean> =>
    updateDoc(doc(firestore, PROFESSORS_COLLECTION, profId), {
        votes: increment(voteStatus === VoteStatus.UPVOTED? 1 : -1),
    })
        .then(() => true)
        .catch(() => false);
    
// TODO: make some kind of unique vote type to store under subcollection