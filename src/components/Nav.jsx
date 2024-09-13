import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Nav = () => {
  return (
    <nav className='px-3 sm:px-16 py-4 sm:py-4 flex justify-between'>
        <Link to={"/"} className='flex items-center gap-1'>
            <img src="public\logo_white.svg" alt="logo" 
            width={45}
            height={45}
            />
            <h1 className='font-inte font-semibold text-2xl'>
                Chat Lens
            </h1>
        </Link>
        <Link to={"/get-starderd"}>
            <Button variant='outline' className="font-inte font-semibold">Get Started</Button>
        </Link>
    </nav>
  )
}

export default Nav