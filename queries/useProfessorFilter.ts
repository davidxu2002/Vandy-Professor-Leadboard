import {useHits, useSearchBox} from "react-instantsearch";

// custom hook to get all subjects
const useProfessorFilter = () => {
    const { query, refine } = useSearchBox();
    const { hits } = useHits();

    return {
        hits,
        query,
        refine
    }
}

export default useProfessorFilter;