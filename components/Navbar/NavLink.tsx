import React from 'react'

import Link from 'next/link'

import { Button } from '@chakra-ui/react'

import { Route } from '@/types/Route'

const NavLink : React.FC<Route> = ({ href, text}) => {
  return (
    <Link
        href={href}
        passHref
    >
        <Button
            variant='ghost'
            color={'white'}
        >
            {text}
        </Button>
    </Link>
  )
}

export default NavLink