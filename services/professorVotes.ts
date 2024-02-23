import {doc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {PROFESSORS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

import {VoteStatus} from "@/types/Vote";

// updates vote document in subcollection and vote field for a professor
export const updateProfVote = async (profId: string, voteId: string, voteStatus: VoteStatus): Promise<boolean> =>
    updateDoc(doc(firestore, PROFESSORS_COLLECTION, profId, VOTES_COLLECTION, voteId), {
        voteStatus,
    })
        .then(() => true)
        .catch(() => false);