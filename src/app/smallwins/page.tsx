'use client';

import { useWin } from "@/context/WinContext";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import { SmallWinFormSection } from "@/components/SmallWinFormSection";

const SmallWins = () => {
  const { wins } = useWin(); // Use the context for wins state

  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  return (
    <div className="flex flex-col mx-auto w-lg mt-10">
      {/* Back Button */}
      <div>
        <Button asChild variant="none">
          <Link href="/"><PiCaretLeft /> Tillbaka</Link>
        </Button>
      </div>

      {/* Page Title */}
      <div className="text-2xl mb-4">
        <h2>Small Wins</h2>
      </div>

      {/* Form Section */}
      <SmallWinFormSection selectedId={selectedId} />

      {/* Wins List */}
      <div className="mt-4">
        {wins.length > 0 ? (
          <ul className="list-disc list-inside w-full">
            {wins.map((win) => (
              <li key={win.uniqueKey} className="flex items-center mb-2">
                <span className="text-2xl mr-2">{win.icon || "✨"}</span>
                <div>
                  <p className="font-semibold">{win.message}</p>
                  <p className="text-sm text-gray-600 italic">{win.encouragement}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No wins yet. Start by adding one!</p>
        )}
      </div>
    </div>
  );
};

export default SmallWins;
