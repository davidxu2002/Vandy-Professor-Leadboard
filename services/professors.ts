import {doc, setDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {PROFESSORS_COLLECTION} from "@/firebase/firestore/collections";

import {Professor} from "@/types/Professor";

// adds a professor document to the professors collection
export const setProfessor = async (professor: Professor): Promise<boolean> =>
    setDoc(doc(firestore, PROFESSORS_COLLECTION, professor.id), professor)
        .then(() => true)
        .catch(() => false);