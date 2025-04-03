import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Badge } from '@/components/ui/badge'

function Smallwins() {
  return (
    <div className="flex w-full justify-center m-8">
      <div className="flex flex-col items-start gap-8 ">

      <Card className='flex flex-col text-lg'>
        <CardTitle className='px-6 py-4'>Future self 1</CardTitle>
        <CardContent>
          <ul>
            <li>Great job</li>
          </ul>
        </CardContent>
      </Card> {/*Samma kort man tryckt på tidigare */}

      <section className='flex flex-col gap-2 bg-blue-50 px-6 py-4'>
        <h2 className='text-lg'>My win:</h2>
        <Input></Input>
        <Button>Add</Button>
      </section>
      <section className='flex flex-col gap-2 bg-blue-50 px-6 py-4'>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </section>
      <section>
        <Badge>Win</Badge>
      </section>
    </div>
    </div>
  )
}

export default Smallwins