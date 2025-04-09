'use client';

import Link from "next/link";
import { useFuture } from "@/context/FutureContext";
import { FutureInputSection } from "@/components/FutureInputSection";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { PiCaretLeft } from "react-icons/pi";

const Futureself = () => {
  const { inputs } = useFuture();

  return (
    <div className="flex w-full justify-center mt-10">
      <div className="flex flex-col items-start max-w-2xl w-lg">
        <Button asChild variant="none">
          <Link href="/" className="font-semibold flex items-center ">
            <PiCaretLeft /> Tillbaka
          </Link>
        </Button>

        <h1 className="text-4xl my-2">Envision your future you in 5, 10, or 15 years</h1>

        <FutureInputSection
          type="Habit"
          placeholder="What habit is an essential part in the life of future you?"
        />
        <FutureInputSection
          type="Accomplishment"
          placeholder="What is important to you that your future you has accomplished?"
        />
        <FutureInputSection
          type="Gift"
          placeholder="What do you want to give to your future self?"
        />

        <section className="w-lg flex flex-col mt-8">
          {inputs.map((input) => (
            <Link key={input.id} href={`/smallwins?id=${input.id}`}>
              <Card className="
              border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 shadow-lg cursor-pointer mb-4">
                <CardTitle className="text-lg font-medium px-6 pt-4">
                  <span className="hidden">{input.type}:</span>{input.value}
                </CardTitle>
                <CardContent>
                  <ul>
                    <li>Save encouraging or reflective messages here</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Futureself;
