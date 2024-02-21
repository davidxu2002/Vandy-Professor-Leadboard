import {useState} from "react";

import useProfessors from "@/queries/useProfessors";

import {Professor} from "@/types/Professor";

// custom hook to handle the reviews feed from the home page
// allows users to filter by courseid
const useFeed = () => {
    const [courseId, setCourseId] = useState<string | null>(null);

    const { professors, loading, error, sortBy, setSortBy } = useProfessors({
        courseId
    });

    return {
        courseId,
        setCourseId,
        sortBy,
        setSortBy,
        professors,
        loading,
        error
    }
}

export default useFeed;