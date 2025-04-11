import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PiCaretLeft } from 'react-icons/pi'

function ThankYou() {
  return (
    <div className="flex w-full justify-center m-8">
      <div className="flex flex-col items-start gap-8 ">
        <Button asChild variant="none">
          <Link href="/" className="font-semibold flex items-center gap-1">
            <PiCaretLeft /> Tillbaka
          </Link>
        </Button>
        <div>
          <h1>Thank you for signing up</h1>
        </div>

      </div>
    </div>
  )
}

export default ThankYou