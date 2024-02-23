import {orderBy, query} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import commentsCollection from "@/firebase/firestore/converters/commentConverter";


const useComments = (reviewId: string) => {

    const [comments, loading, error] = useCollectionData(query(
        commentsCollection(reviewId),
        orderBy('score', 'desc')
    ));

    return {
        comments: comments ? comments.filter(comment => comment.id !== undefined) : [],
        loading,
        error,
    }
}

export default useComments;