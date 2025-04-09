import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

// Fix menuitems och logo 
function Header() {
  return (
    
    <div className="flex flex-row gap-4 justify-evenly bg-[#F8F9FA] w-full px-8 py-4">

        <div className='flex flex-row justify-between bg-[#F8F9FA] w-full'>
          <div className='flex flex-row justify-between gap-4'>
            <Link href="/">Small win tracker</Link>
            <Link href="/futureself">Future Self</Link>
            <Link href="/smallwins">Small Wins</Link>
          </div>
          <div className='flex flex-row gap-2 '>
          <Button asChild>
            <Link href="/signup" className="hidden sm:block">
              Sign Up
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
          </div>
          </div>
     

      </div>
  )
}

export default Header