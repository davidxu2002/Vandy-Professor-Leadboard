import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";
import {PROFESSORS_COLLECTION} from "@/firebase/firestore/collections";

import {Professor} from "@/types/Professor";

// converts a professor document to a Professor object, allowing for typed queries and strict type checking
const professorConverter: FirestoreDataConverter<Professor> = {
    toFirestore(course: WithFieldValue<Professor>): DocumentData {
        return { id: course.id, name: course.name };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Professor {
        const data = snapshot.data(options);
        return {
            id: data.id,
            name: data.name,
            votes: data.votes,
        };
    },
};

// collection reference for querying professors
const professorsCollection = collection(firestore, PROFESSORS_COLLECTION).withConverter(professorConverter);

export default professorsCollection;