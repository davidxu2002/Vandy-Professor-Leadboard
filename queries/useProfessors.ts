import {useState} from "react";

import {orderBy, query, where, QueryConstraint} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import professorsCollection from "@/firebase/converters/professorConverter";

import {Professor} from "@/types/Professor";
import {SortBy} from "@/types/SortBy";
import { Subject } from "@/types/Subject";

interface UseProfessorsProps {
    subjectId: string | null,
    professor: Professor | null,
    userId?: string
}
const useProfessors = (props: UseProfessorsProps) => {
    const {subjectId, professor, userId} = props;

    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Votes);

    // Should look like this later:

    // order reviews by score
    // const queryParams: QueryConstraint[] = [
    //     orderBy(
    //         minReports
    //             ? 'numReports'
    //             : sortBy === SortBy.Newest
    //                 ? 'createdAt'
    //                 : 'score',
    //         "desc"
    //     ),
    // ];

    // order reviews by Votes - can add ternary operators later to change sort criteria!
    const queryParams: QueryConstraint[] = [
        orderBy(
            SortBy.Votes,
            sortBy === "votes" ? "desc" : "asc"),
    ];
    if (subjectId) {
        queryParams.push(where("subject.ref", "==", subjectId));
    }
    if (professor) {
        queryParams.push(where("id", "==", professor.id));
    }

    // TODO: create ability to filter based on professors you interact with

    // get all professors, ordered by score
    const [professors, loading, error] = useCollectionData(query(
        professorsCollection,
        ...queryParams
    ));

    return {
        // filter out any profs with undefined IDs
        professors: professors === undefined ? [] : professors.filter((professor: Professor) => professor.id),
        sortBy,
        setSortBy,
        loading,
        error
    }

}

export default useProfessors;