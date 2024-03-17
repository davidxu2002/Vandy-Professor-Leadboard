import {doc, increment, setDoc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";
import {COURSES_COLLECTION} from "@/firebase/firestore/collections";

import {Course} from "@/types/Course";

// adds a course document to the courses collection
export const setCourse = async (course: Course): Promise<boolean> => {
    return setDoc(doc(firestore, COURSES_COLLECTION, course.id), {...course})
        .then(() => true)
        .catch(() => false);
}

// increments a course's numReviews by a given amount
export const updateCourseNumReviews = async (courseId: string, amountIncrement: number): Promise<boolean> =>
    updateDoc(doc(firestore, COURSES_COLLECTION, courseId), {
        numReviews: increment(amountIncrement)
    })
        .then(() => true)
        .catch(() => false);