import {useState} from "react";

import useProfessors from "@/queries/useProfessors";

import {Professor} from "@/types/Professor";

// Gets all the data
// allows users to filter by subjectId
const useFeed = () => {
    const [subjectId, setSubjectId] = useState<string | null>(null);
    const [professor, setProfessor] = useState<Professor | null>(null);

    const { professors, loading, error, sortBy, setSortBy } = useProfessors({
        subjectId: subjectId,
        professor: professor
    });


    return {
        subjectId,
        setSubjectId,
        sortBy,
        setSortBy,
        professor,
        setProfessor,
        professors,
        loading,
        error
    }
}

export default useFeed;