import AppWrapper from "@/components/AuthWrapper";
import { FutureProvider } from "@/context/FutureContext";

export default function Home() {
  return ( 
    <FutureProvider>
      <div className="flex flex-col items-center mt-10"> 
        <h1 className="text-6xl font-semibold">Track your small wins</h1>
        <div className="flex flex-col my-4 gap-2">
          <AppWrapper />
        </div>
      </div>
    </FutureProvider>
  );
}


// Todo
// Dashboard - lägg till inputs samt länk till dynamisk smallwins page
// Make page reponsive
// Styling
// Sparas på supabase
// Clean up code
// Readme



// Ta fram några snygga icons
// Varför loopar inte iconerna...
// Plan presentation - Måndag

// -- Bonus --
// Kolla efter fler ställen som jag kan rensa bland types och interfaces