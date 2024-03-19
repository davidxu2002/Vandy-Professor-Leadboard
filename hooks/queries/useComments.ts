import {useState} from "react";

import {orderBy, query} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import commentsCollection from "@/firebase/firestore/converters/commentConverter";

import {SortByComment} from "@/types/SortByComment";


// custom hook to get all comments for a review
const useComments = (reviewId: string) => {

    const [sortByComment, setSortBy] = useState<SortByComment>(SortByComment.Newest);

    // get all comments for a review, ordered by score
    const [comments, loading, error] = useCollectionData(query(
        commentsCollection(reviewId),
        orderBy(
            sortByComment === SortByComment.Newest ? 'createdAt' : 'score',
            'desc'
        )
    ));

    return {
        // filter out any comments with undefined IDs (which must be added to the record after creation)
        comments: comments ? comments.filter(comment => comment.id !== undefined) : [],
        sortByComment,
        setSortBy,
        loading,
        error,
    }
}

export default useComments;