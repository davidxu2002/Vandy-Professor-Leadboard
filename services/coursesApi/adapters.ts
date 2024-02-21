import {Course as ApiCourse} from "@/types/VandyAPI";
import {Course as DbCourse} from "@/types/Course";

export const courseAdapter = (course: ApiCourse): DbCourse => ({
    id: course.$id,
    name: course.name,
    description: course.description,
    numReviews: 0
});