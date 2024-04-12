import React from 'react';

import {Input} from "@chakra-ui/react";

interface Props {
    courseId: string
    setCourseId: (courseId: string) => void
}

const CourseSearch: React.FC<Props> = ({ courseId, setCourseId }) => {
    return (
        <Input
            placeholder={'Search for a course'}
            onChange={(e) => setCourseId(e.target.value)}
            value={courseId}
            focusBorderColor={'brand.500'}
        />
    );
};

export default CourseSearch;
