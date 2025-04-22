'use client';

import { useWin } from "@/context/WinContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import { SmallWinFormSection } from "@/components/SmallWinFormSection";
import SmallWinBooster from "@/components/SmallWinBooster";

interface Props {
  selectedId: string;
}

export default function SmallWinsClientPage({ selectedId }: Props) {
  const { clearAllWins } = useWin();

  return (
    <div className="flex flex-col items-start mx-auto w-lg mt-10">
      <Button asChild variant="none">
        <Link href="/"><PiCaretLeft /> Tillbaka</Link>
      </Button>
      <h2 className="text-4xl text-[#333333] py-4 px-4">Small Wins</h2>
      <p className="px-4 text-[#333333]">Add your small wins to see your accomplishments grow</p>

      <SmallWinFormSection selectedId={selectedId} />
      <SmallWinBooster limit={10} />
      <Button onClick={clearAllWins} variant="destructive" className="my-4 w-fit">
        Clear All
      </Button>
    </div>
  );
}
