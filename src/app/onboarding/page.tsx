import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Tooltip } from '@/components/ui/tooltip'


function Onboarding() {
  return (
    <div className="flex w-full justify-center m-8">
      <div className="flex flex-col items-start gap-8 ">
      <h1 className='text-4xl'>Envision your future you, 5, 10 or 15 years down the line.</h1>

      <section className='flex flex-col gap-2 bg-blue-50 px-6 py-4'>
        <h2 className='text-xl'>What habit is an essential part in the life of future you?</h2>
        <Input></Input>
        <Button>Add</Button>
  

      <Card className='flex flex-col text-lg'>
        <CardTitle className='px-6 py-4'>Exercise as a hobby</CardTitle>
        <CardContent> {/* Här skall fetchen in med peppande ord */}
          <ul>
            <li></li>
          </ul>
        </CardContent>
      </Card>
      </section>

      <section className='flex flex-col gap-2 bg-blue-50 px-6 py-4'>
        <h2 className='text-xl'>What is important to you that your future you have accompished?</h2>
        <Input></Input>
        <Button>Add</Button>


      <Card className='flex flex-col text-lg'>
        <CardTitle className='px-6 py-4'>To have found a inner calm</CardTitle>
        <CardContent> {/* Här skall fetchen in med peppande ord */}
          <ul>
            <li></li>
          </ul>
        </CardContent>
      </Card>
      </section>

      <section className='flex flex-col gap-2 bg-blue-50 px-6 py-4'>
        <h2 className='text-xl'>What do you want to give to your future self?</h2>
        <Input></Input>
        <Button>Add</Button>
  

      <Card className='flex flex-col text-lg'>
        <CardTitle className='px-6 py-4'>A dream vacation</CardTitle>
        <CardContent> {/* Här skall fetchen in med peppande ord */}
          <ul>
            <li></li>
          </ul>
        </CardContent>
      </Card>
      </section>

      <section className='flex flex-col gap-2 bg-blue-50 px-6 py-4'>
        <h2 className='text-xl'>You have now completed your profile. Your future self says thank you</h2>
        <div>
        <Tooltip>
          <Button>
            Next
        </Button>
        </Tooltip>
        </div>
      </section>
    
    </div>
    </div>

  )
}
export default Onboarding