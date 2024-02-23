import React from 'react'

import { Flex, Box, HStack, Image } from '@chakra-ui/react'

import AuthButton from '../AuthButton/AuthButton'
import NavLink from './NavLink'

import routes from './routes'

const Navbar = () => {
  return (
    <Flex
        alignItems="center"
        w='100%'
        gap={4}
        h='70px'
        bg='navbar.500'
        rounded='md'
        px={4}
    >

        <HStack
            mr='auto'
        >
            {
                routes.map((route, index) => (
                    <NavLink
                        key={index}
                        href={route.href}
                        text={route.text}
                    />
                ))
            }
        </HStack>
        <Box
            display={{base: 'none', md: 'block'}}
        >
            <AuthButton />
        </Box>
    </Flex>
  )
}

export default Navbar