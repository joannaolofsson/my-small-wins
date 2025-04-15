'use client'

import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiCaretLeft } from 'react-icons/pi';
import { FutureInputSection } from '@/components/FutureInputSection';
import { InputProps, InputType } from '@/types/interfaces';
import { useFuture } from '@/context/FutureContext';
import Link from 'next/link';

export default function FutureselfClient({ username, userId, initialInputs }: InputProps) {
  const { inputs, addInput } = useFuture();

  return (
    <div className="flex w-full justify-center h-screen">
      <div className="flex flex-col items-start w-lg">
        <Button asChild variant="none">
          <Link href="/" className="font-semibold flex items-center">
            <PiCaretLeft /> Tillbaka
          </Link>
        </Button>


        {['Habit', 'Accomplishment', 'Gift'].map((type) => (

          <FutureInputSection
            key={type}
            type={type as InputType}
            placeholder={`Add a ${type.toLocaleLowerCase()} ...`}
            onAdd={addInput}
          />
        ))}

        <section className="w-lg flex flex-col mt-8">

          <div>
            {inputs.map((input) => (
              <Link key={`${input.id}-${input.category}`} href={`/smallwins?id=${input.id}`}>
                <Card
                  className="border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 shadow-lg cursor-pointer mb-4"
                >
                  <CardTitle className="text-lg font-medium px-6 pt-4">
                    {input.category}: {input.category}
                  </CardTitle>
                  <CardContent>
                    🏆 Click to see more details about this win!
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}