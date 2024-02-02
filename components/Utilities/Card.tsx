import React from 'react';

import {Card as ChakraCard, CardProps} from '@chakra-ui/react';

interface Props extends CardProps {
    children: React.ReactNode,
}

const Card: React.FC<Props> = ({ children, ...props }) => {
    return (
        <ChakraCard
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent='center'
            width="100%"
            position="relative"
            minWidth="0px"
            bg='navbar.500'
            backgroundClip="border-box"
            rounded='lg'
            shadow='xl'
            {...props}
        >
            {children}
        </ChakraCard>
    );
};

export default Card;
