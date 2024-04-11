import React from 'react';
import FormElement from "@/components/Utilities/FormComponents/FormElement";
import {Checkbox} from "@chakra-ui/react";

interface Props {
    label: string,
    value: boolean,
    description?: string,
    onChange: (value: boolean) => void,
    onBlur?: () => void,
    error?: string,
}

const CheckboxInput: React.FC<Props> = ({ label, value, description, onChange, onBlur, error }) => {
    return (
        <FormElement
            label={label}
            error={error}
            description={description}
        >
            <Checkbox
                isChecked={value}
                onChange={(e) => onChange(e.target.checked)}
                onBlur={onBlur}
                colorScheme={"brand"}
            />
        </FormElement>
    );
};

export default CheckboxInput;
