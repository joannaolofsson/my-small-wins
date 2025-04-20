import { Badge } from "@/components/ui/badge";
import { FaSeedling, FaFire, FaCrown } from "react-icons/fa";
import { Card } from "./ui/card";
import { useWin } from "@/context/WinContext";
import { BoosterProp } from "@/types/interfaces";

const iconMap: Record<string, React.ReactNode> = {
  FaSeedling: <FaSeedling className="text-slate-500" />,
  FaFire: <FaFire className="text-slate-500" />,
  FaCrown: <FaCrown className="text-slate-500" />,
};


export default function SmallWinBooster({ limit }: BoosterProp) {
  const { smallWins } = useWin();

  const displayedWins = limit ? smallWins.slice(0, limit) : smallWins;

  if (!displayedWins || displayedWins.length === 0) {
    return <p className="text-gray-500 italic">No wins yet. Start by adding one!</p>;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {displayedWins.map((win) => {
        const icon = iconMap[win.icon] || <FaSeedling className="text-slate-500" />;
        return (
          <Card
            key={win.inputId}
            className="relative bg-white/20 rounded-xl shadow-lg border border-gray-200 flex flex-row items-center py-0"
          >
            <Badge className="relative w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-r from-bronze via-silver to-gold px-[2px]">
              <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                {icon}
              </div>
            </Badge>
            <p className="font-regular text-sm text-[#333333] truncate">{win.message}</p>
            <p className="text-medium text-gray-700 truncate">{win.encouragement}</p>
          </Card>
        );
      })}
    </div>
  );
}
