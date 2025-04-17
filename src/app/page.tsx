
import AppWrapper from "@/components/AuthWrapper";

export default function Home() {
  

  return (
    <div className="flex flex-col items-center mt-10"> 
    <h1 className="text-4xl">Track your small wins</h1>
      <div className="flex flex-col w-lg bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-2 p-6'">
      <AppWrapper />
      </div>
    </div>
  );
}
