'use client';

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import { SmallWinFormSection } from "@/components/SmallWinFormSection";
import SmallWinBooster from "@/components/SmallWinBooster";


export default function SmallWinsPage() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");
 

  return (
    <>
    <div className="flex flex-col items-start mx-auto w-lg mt-10">
      <Button asChild variant="none">
        <Link href="/"><PiCaretLeft /> Tillbaka</Link>
      </Button>
      <h2 className="text-4xl text-[#333333] py-4 px-4">Small Wins</h2>
      <p className="px-4 text-[#333333]">Add your small wins to see your accomplisments grow</p>

      <SmallWinFormSection selectedId={selectedId} />
      <SmallWinBooster limit={10}/>

    </div>
    </>
  );
}
