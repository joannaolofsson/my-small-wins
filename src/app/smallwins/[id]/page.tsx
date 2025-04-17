'use client'

import { useWin } from "@/context/WinContext";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import { SmallWinFormSection } from "@/components/SmallWinFormSection";
import SmallWinCard from "@/components/SmallWinCard";


export default function SmallWins() {
  const { wins } = useWin(); 

  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  return (
    <div className="flex flex-col mx-auto w-lg mt-10">
 
      <div>
        <Button asChild variant="none">
          <Link href="/"><PiCaretLeft /> Tillbaka</Link>
        </Button>
      </div>

      <div className="text-2xl mb-4">
        <h2>Small Wins</h2>
      </div>


      <SmallWinFormSection selectedId={selectedId} />

  
      <div className="mt-4">
        {wins.length > 0 ? (
          <div>
            {wins.map((win) => (
              <SmallWinCard key={win.uniqueKey} item={win} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No wins yet. Start by adding one!</p>
        )}
      </div>
    </div>
  );
};
