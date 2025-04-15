'use client';

import { useEffect } from "react";
import { useFuture } from "@/context/FutureContext";
import { useWin } from "@/context/WinContext";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import { SmallWinFormSection } from "@/components/SmallWinFormSection";

const SmallWins = () => {
  const { wins, addWin } = useWin();
  const { inputs } = useFuture();
  
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const filteredInputs = selectedId
    ? inputs.filter((input) => input.id === selectedId)
    : inputs;

  useEffect(() => {
    const fetchEncouragement = async () => {
      const input = filteredInputs[0];
      if (!input) return;

      const alreadyAdded = wins.some((win) => win.id === input.id);
      if (alreadyAdded) return;

      const res = await fetch(`/api/small-win?type=${input.type}`);
      const data = await res.json();

      addWin({
        id: input.id,
        message: input.value,
        icon: data.icon,
        encouragement: data.encouragement,
      });
    };

    fetchEncouragement();
  }, [filteredInputs, wins, addWin]);

  return (
    <div className="flex flex-col mx-auto w-lg mt-10">
      <div>
        <Button asChild variant="none">
          <Link href="/"><PiCaretLeft />Tillbaka</Link>
        </Button>
      </div>
      <div className="text-2xl mb-4">
        <h2>Small wins</h2>
      </div>

      <div className="relative flex flex-col items-center">
        {filteredInputs.map((input) => (
          <Card key={input.id}
            className="w-full h-auto border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 p-4">
            <CardTitle className="text-lg font-medium px-6 pt-4">
              <span className="hidden">{input.type}:</span> {input.value}
            </CardTitle>
            <CardContent>🏆 You did something great!</CardContent>
          </Card>
        ))}
      </div>

      <SmallWinFormSection />

      <div>
        {wins.map((win) => (
          <Card key={win.id} className="border border-white/20 rounded-xl backdrop-blur-[15px] bg-white/30 shadow-lg cursor-pointer mb-4">
            <CardTitle className="px-4 py-2">
              {win.icon} {win.message}
            </CardTitle>
            <CardContent className="italic text-sm text-muted">
              {win.encouragement}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmallWins;
