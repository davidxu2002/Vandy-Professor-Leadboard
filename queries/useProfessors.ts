import {useState} from "react";

import {orderBy, query, where, QueryConstraint} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import professorsCollection from "@/firebase/converters/professorConverter";

import {Professor} from "@/types/Professor";
import {SortBy} from "@/types/SortBy";

interface UseProfessorsProps {
    courseId: string | null,
    minReports?: number
    userId?: string
}

const useProfessors = (props: UseProfessorsProps) => {

    const {courseId, minReports, userId} = props;

    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Votes);

    // order reviews by score - can add ternary operators later to change sort criteria
    const queryParams: QueryConstraint[] = [
        orderBy(
            SortBy.Votes,
            "desc"
        ),
    ];

    // if (courseId) queryParams.push(where("courseId", "==", courseId));
    // if (professor) queryParams.push(where("professor.id", "==", professor.id));
    // if (minReports) queryParams.push(where("numReports", ">=", minReports));
    // if (userId) queryParams.push(where("userId", "==", userId));

    // get all professors, ordered by score
    const [professors, loading, error] = useCollectionData(query(
        professorsCollection,
        ...queryParams
    ));

    return {
        // filter out any reviews with undefined IDs (which must be added to the record after creation)
        professors: professors === undefined ? [] : professors.filter((professor: Professor) => professor.id),
        sortBy,
        setSortBy,
        loading,
        error
    }

}

export default useProfessors;