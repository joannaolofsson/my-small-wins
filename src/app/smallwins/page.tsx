'use client';

import { useFuture } from "@/context/FutureContext";
import { useWin } from "@/context/WinContext"; // ✅ Must be imported!
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import { SmallWinFormSection } from "@/components/SmallWinFormSection";

const SmallWins = () => {
  const { wins } = useWin(); // ✅ Now this works
  const { inputs } = useFuture();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const filteredInputs = selectedId
    ? inputs.filter((input) => input.id === selectedId)
    : inputs;

  return (
    <div className="grid grid-cols-1 grid-row-4 justify-center mt-10 w-full">
      <div className="w-lg flex flex-col items-start">
        <Button asChild variant="none">
          <Link href="/" className="font-semibold flex items-center gap-1">
            <PiCaretLeft /> Tillbaka
          </Link>
        </Button>

        <h1 className="text-3xl mb-2">Your Small Wins</h1>        

        <div className="flex flex-col mt-8 w-full">
          {filteredInputs.map((input) => (
            <Card key={input.id} className="
            w-full border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 shadow-lg cursor-pointer mb-4">
              <CardTitle className="text-lg font-medium px-6 pt-4">
               <span className="hidden"> {input.type}:</span> {input.value}
              </CardTitle>
              <CardContent>
                🏆 You did something great!
              </CardContent>
            </Card>
          ))}
        </div>

        <SmallWinFormSection />

        <div className="w-lg flex flex-col gap-4 mt-6">
          {wins.map((win) => (
            <Card key={win.id} className="border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 shadow-lg cursor-pointer mb-4">
              <CardTitle className="px-4 py-2">🎯 {win.message}</CardTitle>
              <CardContent>You're awesome!</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallWins;
