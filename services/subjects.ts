import { doc, increment, setDoc, updateDoc } from "@firebase/firestore";

import firestore from "@/firebase/firestore";
import { SUBJECTS_COLLECTION } from "@/firebase/firestore/collections";

import { Subject } from "@/types/VandyAPI";

// adds a course document to the courses collection
export const setSubject = async (subject: Subject): Promise<boolean> => {
    return setDoc(doc(firestore, SUBJECTS_COLLECTION, subject.$id), {...subject})
        .then(() => true)
        .catch(() => false);
}