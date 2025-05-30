import AppWrapper from "@/components/AuthWrapper";
import { FutureProvider } from "@/context/FutureContext";

export default function Home() {
  return ( 
    <FutureProvider>
      <div className="min-h-screen mt-8"> 
        <h1 className="text-4xl md:text-6xl font-semibold text-start md:text-center px-4">Track your small wins</h1>
        <div className="w-full">
          <AppWrapper />
        </div>
      </div>
    </FutureProvider>
  );
}
