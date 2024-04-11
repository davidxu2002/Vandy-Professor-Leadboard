import React, { useState, useEffect } from 'react';

import AutoCompleteMenu from '../AutoCompleteMenu';

import useSubjects from '@/queries/useSubjects';

import {Subject} from "@/types/Subject";

interface Props {
    subjectId: string | null,
    setSubjectId: (subjectId: string | null) => void,
    description?: string,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
}

const SubjectMenu: React.FC<Props> = ({ subjectId, setSubjectId, description, onBlur, error, closeButton }) => {

    const { refine, hits } = useSubjects();

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (subjectId) {
            setInputValue(subjectId);
        } else {
            setInputValue("");
        }
    }, [subjectId]);

    const handleInputChange = (val: string) => {
        setInputValue(val);
        refine(val);
    }

    return (
        <AutoCompleteMenu
            label={"Department"}
            value={subjectId}
            description={description}
            inputValue={inputValue}
            setInputValue={handleInputChange}
            placeholder={"Find a Department"}
            options={(hits).map(subject => subject.objectID)}
            optionLabels={(hits).map(subject => subject.objectID)}
            onSelect={ setSubjectId}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default SubjectMenu;
