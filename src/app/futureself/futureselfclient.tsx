'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiCaretLeft } from 'react-icons/pi';
import { addInput, deleteInput } from '../../../actions/futureself/actions';

type InputType = 'Habit' | 'Accomplishment' | 'Gift';

interface InputItem {
  id: string;
  user_id: string;
  category: InputType;
  name: string;
}

interface Props {
  username: string;
  userId: string;
  initialInputs: InputItem[];
}

export default function FutureselfClient({ username, userId, initialInputs }: Props) {
  const [inputs, setInputs] = useState<InputItem[]>(initialInputs);

  async function handleAdd(category: InputType, name: string) {
    const res = await fetch('/api/addInput', {
      method: 'POST',
      body: JSON.stringify({ category, name, user_id: userId }),
    });

    const newItem = await res.json();
    setInputs((prev) => [...prev, newItem]);
  }

  return (
    <div className="flex w-full justify-center mt-10">
      <div className="flex flex-col items-start max-w-2xl w-lg">
        <Button asChild variant="none">
          <Link href="/" className="font-semibold flex items-center">
            <PiCaretLeft /> Tillbaka
          </Link>
        </Button>

        <h1 className="text-4xl my-2">Hej, {username}</h1>

        {['Habit', 'Accomplishment', 'Gift'].map((type) => {
          const [inputValue, setInputValue] = useState("");
          return (
            <div key={type}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Add a ${type.toLowerCase()}...`}
                className="my-2 p-2 border rounded w-full"
              />
              <Button
                onClick={() => {
                  handleAdd(type as InputType, inputValue);
                  setInputValue("");
                }}
              >
                Add {type}
              </Button>
            </div>
          );
        })}

        <section className="w-lg flex flex-col mt-8">
          {inputs.map((input) => (
            <Card
              key={input.id}
              className="border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 shadow-lg cursor-pointer mb-4"
            >
              <CardTitle className="text-lg font-medium px-6 pt-4">
                {input.category}: {input.name}
              </CardTitle>
              <CardContent>
                <ul>
                  <li>Save encouraging or reflective messages here</li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}