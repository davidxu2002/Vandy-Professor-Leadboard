import React, {ChangeEvent} from 'react';

import { Textarea } from "@chakra-ui/react";

import FormElement from "@/components/Utilities/FormComponents/FormElement";

interface Props {
    label: string,
    placeholder: string,
    description?: string,
    value: string,
    onChange: (value: string) => void,
    onBlur?: () => void,
    error?: string,
}

const TextareaInput: React.FC<Props> = ({ label, placeholder, description, value, onChange, onBlur, error}) => {
    return (
        <FormElement
            label={label}
            error={error}
            description={description}
        >
            <Textarea
                placeholder={placeholder}
                value={value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
                onBlur={onBlur}
                focusBorderColor={"brand.500"}
            />
        </FormElement>
    );
};

export default TextareaInput;
