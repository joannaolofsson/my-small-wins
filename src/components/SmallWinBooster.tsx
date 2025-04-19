'use client';

import { useWin } from "@/context/WinContext";
import { FaSeedling, FaFire, FaCrown } from "react-icons/fa";

const iconMap: Record<string, JSX.Element> = {
  FaSeedling: <FaSeedling className="text-green-500" />,
  FaFire: <FaFire className="text-red-500" />,
  FaCrown: <FaCrown className="text-yellow-500" />,
};

export default function SmallWinBooster() {
  const { smallWins } = useWin();

  if (!smallWins || smallWins.length === 0) {
    return <p className="text-gray-500">No wins yet. Start by adding one!</p>;
  }

  return (
    <div className="w-lg bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-4 p-6">
      {smallWins.map((win) => {
        console.log("Rendering win:", win);
        const icon = iconMap[win.icon] ?? <FaSeedling className="text-gray-400" />;

        return (
          <div
            key={win.inputId}
            className={`border-b pb-4 px-4 rounded-lg ${win.color} border-2`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{icon}</div>
              <p className="font-bold text-lg">{win.message}</p>
            </div>
            <p className="text-sm text-gray-700 italic mt-1">
              {win.encouragement}
            </p>
          </div>
        );
      })}
    </div>
  );
}
