import React from 'react';

import {FormControl, FormErrorMessage, FormHelperText, FormLabel} from "@chakra-ui/react";

interface Props {
    label: string,
    description?: string,
    children: React.ReactNode,
    error?: string,
}

const FormElement: React.FC<Props> = ({ label, description, error, children}) => {
    return (
        <FormControl
            isInvalid={!!error}
            py={0}
            colorScheme={"brand"}
            w={"100%"}
        >
            <FormLabel>{label}</FormLabel>
            {children}
            {description && (
                <FormHelperText>
                    {description}
                </FormHelperText>
            )}
            {error && (
                <FormErrorMessage>{error}</FormErrorMessage>
            )}
        </FormControl>
    );
};

export default FormElement;
