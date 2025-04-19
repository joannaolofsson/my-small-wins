
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiCaretLeft } from 'react-icons/pi';
import { FutureInputSection } from '@/components/FutureInputSection';
import { InputProps, InputType } from '@/types/interfaces';
import { useFuture } from '@/context/FutureContext';
import Link from 'next/link';

export default function FutureselfClient({ userId }: InputProps) {
  const { inputs, addInput } = useFuture();

  return (
    <div className="flex w-full justify-center h-screen mt-10">
      <div className="flex flex-col items-start">
        <Button asChild variant="none">
          <Link href="/" className="font-semibold flex items-center">
            <PiCaretLeft /> Tillbaka
          </Link>
        </Button>

    
        <div className='w-lg bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-2 p-6'>
          <h1 className='text-2xl'>Describe your future self</h1>
          <p>Your future self is an updated version of you</p>
          <p>And by defining things about your future you, you can take action an start tracking your future self</p>

          {['Habit', 'Accomplishment', 'Gift'].map((type) => (
          <FutureInputSection
          key={type}
          type={type as InputType}
          placeholder={`Add a ${type.toLocaleLowerCase()} ...`}
        onAdd={(category, name) => addInput(category, name, userId)}
        />
        ))}

        </div>
      
        <section className="w-lg flex flex-col mt-8 ">
          <div>
            {inputs.map((input) => (
              <Link href="/smallwins">
              <Card>
                <CardTitle>{input.name}</CardTitle>
              </Card>
            </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}