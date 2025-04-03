import React from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Futureself() {
  return (
    <div className="flex w-full justify-center m-8"> {/* Här skall de kort som lagts till i imput fälten visas med en länk att klicka vidare...*/}
       <div className="flex flex-col items-start gap-8 ">
        <Button>Tillbaka</Button>
        <Card className='flex flex-col text-lg'>
          <Link href="#">
          <CardTitle className='px-6 py-4'>
            Card 1
          </CardTitle>
          </Link>
        </Card>
        <Card className='flex flex-col text-lg'>
          <Link href="#">
          <CardTitle className='px-6 py-4'>
            Card 1
          </CardTitle>
          </Link>
        </Card>
        <Card className='flex flex-col text-lg'>
          <Link href="#">
          <CardTitle className='px-6 py-4'>
            Card 1
          </CardTitle>
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default Futureself