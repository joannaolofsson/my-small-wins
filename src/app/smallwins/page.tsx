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
    <div className="flex flex-col mx-auto w-lg mt-10">
      <div className="">
        <Button asChild variant="none">
          <Link href="/"><PiCaretLeft />
            Tillbaka
          </Link>
        </Button>
      </div>
      <div className="text-2xl mb-4"><h2>Small wins</h2></div>

      <div className="relative flex flex-col items-center">
        {filteredInputs.map((input) => (
          <Card key={input.id}
            className="w-full h-auto border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 p-4">
            <CardTitle className="text-lg font-medium px-6 pt-4">
              <span className="hidden"> {input.type}:</span> {input.value}
            </CardTitle>
            <CardContent>
              🏆 You did something great!
            </CardContent>
          </Card>
        ))}
      </div>


      <div >
        <SmallWinFormSection />
      </div>
      <div className="">
        {wins.map((win) => (
          <Card key={win.id} className="border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 shadow-lg cursor-pointer mb-4">
            <CardTitle className="px-4 py-2">🎯 {win.message}</CardTitle>
            <CardContent>You're awesome!</CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};


export default SmallWins;
