'use client';

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import { SmallWinFormSection } from "@/components/SmallWinFormSection";
import SmallWinBooster from "@/components/SmallWinBooster";
import { useWin } from "@/context/WinContext";

export default function SmallWinsPage() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");
  const { clearAllWins } = useWin();

  return (
    <div className="flex flex-col mx-auto w-lg mt-10">
      <Button asChild variant="none">
        <Link href="/"><PiCaretLeft /> Tillbaka</Link>
      </Button>

      <h2 className="text-2xl my-4">Small Wins</h2>

      <SmallWinFormSection selectedId={selectedId} />
      <SmallWinBooster />
      <Button onClick={clearAllWins} variant="destructive" className="my-4 w-fit">
  Clear All
</Button>
    </div>
    
  );
}
