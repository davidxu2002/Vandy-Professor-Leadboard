import React from 'react';
import {CircularProgress} from "@chakra-ui/react";

const LoadingIndicator = () => {
    return (
        <CircularProgress
            isIndeterminate
            color='brand.500'
        />
    );
};

export default LoadingIndicator;
