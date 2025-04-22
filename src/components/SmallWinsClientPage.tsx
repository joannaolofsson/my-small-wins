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
    <div className="min-h-screen mt-8"> 
      <Button asChild variant="none" className="mx-8">
        <Link href="/"><PiCaretLeft /> Tillbaka</Link>
      </Button>
      <h2 className="text-4xl text-[#333333] py-4 px-12">Small Wins</h2>
      <p className="text-[#333333] px-12">Add your small wins to see your accomplishments grow</p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 px-10 ">
        <div className="col-span-1 md:col-span-3">
      <SmallWinFormSection selectedId={selectedId} />
      </div>
      <div className="col-span-1 md:col-span-2">
      <SmallWinBooster limit={10} />
      </div>
      </div>

    </div>
  );
}
