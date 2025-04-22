'use client';
import React from "react";
import { useFuture } from "@/context/FutureContext"; // Fetch Future Self goals
import { useWin } from "@/context/WinContext"; // Fetch Small Wins
import SmallWinBooster from "./SmallWinBooster";
import { Button } from "./ui/button";
import Link from "next/link";
export default function Summary() {
  const { inputFuture } = useFuture(); // Use FutureContext for Future Self goals
  const { wins } = useWin(); // Use WinContext for Small Wins

  return (
    <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Small Wins Column */}
      <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold">Small Wins</h2>
        <SmallWinBooster limit={5} />
        <p>Total Small Wins: {wins.length}</p> {/* Display count of wins */}
        <div className="mt-4 text-center">
          <Link href="/smallwins/manual">
            <Button variant="default">Go to Small Wins</Button>
          </Link>
        </div>
      </div>

      {/* Future Self Goals Column */}
      <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold">Future Self Goals</h2>
        <p>Total Inputs: {inputFuture.length}</p> {/* Display count of Future Self inputs */}
      </div>
    </div>
  );
}
