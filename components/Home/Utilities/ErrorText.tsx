import React from 'react';
import {Text} from "@chakra-ui/react";

interface Props {
    touched: boolean,
    error: string,
}

const ErrorText: React.FC<Props> = ({ touched, error }) => {

    if(!touched || !error) return null;

    return (
        <Text
            color={'red.500'}
            fontSize={'sm'}
        >
            {touched && error}
        </Text>
    );
};

export default ErrorText;
