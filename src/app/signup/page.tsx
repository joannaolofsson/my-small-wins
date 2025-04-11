'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PiCaretLeft } from 'react-icons/pi'
import { SignUp } from './signup'
import { useState } from 'react'


const handleSignUp = async () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const result = await SignUp(email, password);
  if (result) {
    // successmessage
  } else {
    // error
  }
}

function SignupPage() {
  return (
    <div className="flex w-full justify-center mt-10">
      <div className="flex flex-col items-start max-w-2xl w-lg">
        <Button asChild variant="none">
          <Link href="/" className="font-semibold flex items-center ">
            <PiCaretLeft /> Tillbaka
          </Link>
        </Button>
        <form className="flex flex-col gap-4 w-full h-auto border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 p-6">
          <Label htmlFor="email">Email:</Label>
          <Input
            placeholder="Email"
            className="flex-1 bg-[#F8F9FA]"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="Password"
            className="flex-1 bg-[#F8F9FA]"
          />
          <div className='w-lg flex justify-end pr-12'>
            <Button onClick={handleSignUp} className="font-semibold flex items-center gap-1">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage