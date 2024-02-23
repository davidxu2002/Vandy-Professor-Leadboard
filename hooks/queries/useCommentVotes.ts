import {query, where} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import {commentVotesCollection} from "@/firebase/firestore/converters/voteConverter";

const useCommentVotes = (userId: string, reviewId: string, commentId: string) => {

    const [votes, loading, error] = useCollectionData(query(commentVotesCollection(reviewId, commentId),
        where('userId', '==', userId),
    ));

    return {
        votes,
        loading,
        error,
    }
}

export default useCommentVotes;