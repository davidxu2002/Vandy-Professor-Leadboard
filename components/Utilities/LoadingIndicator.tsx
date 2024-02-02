import React from 'react';
import {CircularProgress} from "@chakra-ui/react";

const LoadingIndicator = () => {
    return (
        <CircularProgress
            isIndeterminate
            color='highlight.50'
        />
    );
};

export default LoadingIndicator;
