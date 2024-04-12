import {useHits, useSearchBox} from "react-instantsearch";

// custom hook to get all subjects
const useSubjects = () => {
    const { query, refine } = useSearchBox();
    const { hits } = useHits();

    return {
        hits,
        query,
        refine
    }
}

export default useSubjects;