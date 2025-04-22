import { Badge } from "@/components/ui/badge";
import { FaSeedling, FaFire, FaCrown } from "react-icons/fa";
import { Card } from "./ui/card";
import { useWin } from "@/context/WinContext";

const iconMap: Record<string, React.ReactNode> = {
  FaSeedling: <FaSeedling className="text-slate-500" />,
  FaFire: <FaFire className="text-slate-500" />,
  FaCrown: <FaCrown className="text-slate-500" />,
};
export default function SmallWinBooster({ limit }: { limit?: number }) {
  const { wins } = useWin();

  // Limit the number of wins displayed
  const displayedWins = limit ? wins.slice(0, limit) : wins;

  // No wins fallback
  if (displayedWins.length === 0) {
    return <p className="text-gray-500 italic">No wins yet. Start by adding one!</p>;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {displayedWins.map((win) => (
        <Card
          key={win.inputId || win.id} // Use a fallback if inputId is missing
          className="relative bg-white/20 rounded-xl shadow-lg border border-gray-200 flex flex-row items-center py-0"
        >
          <Badge className="relative w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-r from-bronze via-silver to-gold px-[2px]">
            <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
              {iconMap[win.icon] || <FaSeedling className="text-slate-500" />}
            </div>
          </Badge>
          <div className="flex flex-col ml-4">
            <p className="font-medium text-sm text-[#333333] truncate">{win.message}</p>
            <p className="text-sm text-gray-700 truncate">{win.encouragement}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
