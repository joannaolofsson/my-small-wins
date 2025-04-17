import { iconMap } from "@/lib/iconMap";


interface SmallWinItem {
  uniqueKey: string;
  icon: string;
  message: string;
  category?: string;
  encouragement: string;
}


type Props = {
  item: {
    message: string;
    icon: string;
    encouragement: string; 
  };
};



export default function SmallWinCard({ item }: Props) {
  const IconComponent = iconMap[item.icon]; 

  return (
    <div className="w-lg bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-2 p-6">
      {IconComponent && <IconComponent className="text-2xl text-blue-500" />}
      <div>
        <p className="text-sm text-gray-700">{item.message}</p>
        <span className="text-xs text-gray-400 italic">{item.encouragement}</span>
      </div>
    </div>
  );
}



