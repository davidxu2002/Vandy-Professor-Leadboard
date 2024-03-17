import React from 'react';

import {Card, useColorModeValue} from "@chakra-ui/react";

import { CardProps } from "@chakra-ui/card";

interface Props extends CardProps {
    onClick: () => void,
    children: React.ReactNode
}

const ClickableCard: React.FC<Props> = ({ onClick, children, ...props }) => {

    const hoverBackground = useColorModeValue('whiteAlpha.400', 'whiteAlpha.50');

    return (
        <Card
            cursor={'pointer'}
            _hover={{
                bg: hoverBackground
            }}
            onClick={onClick}
            transition={'all 0.2s ease-in-out'}
            {...props}
        >
            {children}
        </Card>
    );
};

export default ClickableCard;