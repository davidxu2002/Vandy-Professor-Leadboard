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
    toFirestore(professor: WithFieldValue<Professor>): DocumentData {
        return { 
            id: professor.id, 
            name: professor.name, 
            votes: professor.votes, 
            subject: {
                $id: professor.subject.$id,
                $ref: professor.subject.$ref,
                ref: professor.subject.ref,
            },
            current_place: professor.current_place,
            day_start: {
                place: professor.day_start.place,
                score: professor.day_start.score
            }
        };
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
            subject: {
                $id: data.subject.id,
                $ref: data.subject.$ref,
                ref: data.subject.ref,
            },
            current_place: data.current_place,
            day_start: {
                place: data.day_start.place,
                score: data.day_start.score
            }
        };
    },
};

// collection reference for querying professors
const professorsCollection = collection(firestore, PROFESSORS_COLLECTION).withConverter(professorConverter);

export default professorsCollection;