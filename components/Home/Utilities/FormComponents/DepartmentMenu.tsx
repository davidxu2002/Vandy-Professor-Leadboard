import React, {useState, useEffect} from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

interface Props {
    department: string | null,
    setDepartment: (professor: string | null) => void,
    description?: string,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
}

const departments = [
    "CS",
    "MATH",
    "PHYS",
    "CHEM",
    "BIO",
    "ECON",
    "ENGL",
]

const DepartmentMenu: React.FC<Props> = ({ department, setDepartment, description, onBlur, error, closeButton }) => {

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (department) {
            setInputValue(department);
        } else {
            setInputValue("");
        }
    }, [department]);

    return (
        <AutoCompleteMenu
            value={department}
            label={"Department"}
            description={description}
            inputValue={inputValue}
            setInputValue={setInputValue}
            placeholder={"Find a Department"}
            options={departments}
            optionLabels={departments}
            onSelect={setDepartment}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default DepartmentMenu;
