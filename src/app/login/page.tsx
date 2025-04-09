import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PiCaretLeft } from 'react-icons/pi'

function SignupPage() {
  return (
    <div className="flex w-full justify-center mt-10">
      <div className="flex flex-col items-start max-w-2xl w-lg">
        <Button asChild variant="none">
          <Link href="/" className="font-semibold flex items-center ">
            <PiCaretLeft /> Tillbaka
          </Link>
        </Button>
    <form className="flex flex-col gap-4 w-full">
        <Label htmlFor="name">Name your win?</Label>
      <Input
        placeholder="Write a small win..."
        className="flex-1 bg-[#F8F9FA]"
      />
       <Label htmlFor="name">How do you feel about it?</Label>
      <Input
        placeholder="How do you feel about it..."
        className="flex-1 bg-[#F8F9FA]"
      />
      <Label htmlFor="name">How do you feel about it?</Label>
      <Input
        placeholder="How do you feel about it..."
        className="flex-1 bg-[#F8F9FA]"
      />
      <Button asChild >
          <Link href="/futureself" className="font-semibold flex items-center gap-1">
            Login
          </Link>
        </Button>
    </form>
    </div>
    </div>
  )
}

export default SignupPage