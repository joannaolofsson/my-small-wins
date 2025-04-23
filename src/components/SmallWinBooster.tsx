
"use client";

import { useEffect, useState } from "react";
import { useWin } from "@/context/WinContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/lib/iconMap";
import { Booster } from "@/types/interfaces";
import { FaSeedling } from "react-icons/fa";

const gradientMap: Record<string, string> = {
  "green-500": "from-green-300 via-green-400 to-green-500",
  "red-500": "from-red-300 via-red-400 to-red-500",
  "blue-500": "from-blue-300 via-blue-400 to-blue-500",
  "yellow-500": "from-yellow-300 via-yellow-400 to-yellow-500",
  "purple-500": "from-purple-300 via-purple-400 to-purple-500",
};
export default function SmallWinBooster({ limit }: { limit?: number }) {
  const { wins } = useWin();
  const [boosters, setBoosters] = useState<Record<string, Booster>>({});

  useEffect(() => {
    const fetchAllBoosters = async () => {
      const newBoosters: Record<string, Booster> = {};

      await Promise.all(
        wins.map(async (win, index) => {
          const category = win.category || "habit";
          const res = await fetch(`/api/booster?category=${category}&count=${index}`);
          const data = await res.json();
          newBoosters[win.id] = data;
        })
      );

      setBoosters(newBoosters);
    };

    if (wins.length > 0) {
      fetchAllBoosters();
    }
  }, [wins]);

  const displayedWins = limit ? wins.slice(0, limit) : wins;

  if (displayedWins.length === 0) {
    return <p className="text-gray-500 italic">No wins yet. Start by adding one!</p>;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {displayedWins.map((win) => {
        const booster = boosters[win.id];
        const IconComponent = booster ? iconMap[booster.icon] || FaSeedling : FaSeedling;

        return (
          <Card
            key={win.id}
            className="relative items-start bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg flex flex-row gap-4 w-full p-2"
          >
            <div
              className={`absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-gradient-to-b ${
                booster ? gradientMap[booster.color] : "from-slate-100 to-slate-200"
              }`}
            />
            <Badge className="w-14 h-14 flex items-center justify-center text-xl bg-white rounded-lg shadow">
              <IconComponent className="text-xl text-slate-600" />
            </Badge>
            <div className="flex flex-col">
              <p className="text-gray-800 font-semibold truncate overflow-hidden">{win.message}</p>
              {booster && (
                <p className="text-sm text-gray-600 italic truncate overflow-hidden">
                  {booster.encouragement}
                </p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
