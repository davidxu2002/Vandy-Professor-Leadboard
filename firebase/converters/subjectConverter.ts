import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";
import { SUBJECTS_COLLECTION } from "@/firebase/firestore/collections";

import { Subject } from "@/types/VandyAPI";

// converts a subject document to a Subject object, allowing for typed queries and strict type checking
const subjectConverter: FirestoreDataConverter<Subject> = {
    toFirestore(course: WithFieldValue<Subject>): DocumentData {
        return { $id: course.$id, ref: course.ref };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Subject {
        const data = snapshot.data(options);
        return {
            $id: data.id,
            $ref: data.$ref, 
            ref: data.ref
        };
    },
};

// collection reference for querying professors
const professorsCollection = collection(firestore, SUBJECTS_COLLECTION).withConverter(subjectConverter);

export default professorsCollection;