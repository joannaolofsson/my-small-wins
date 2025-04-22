import FutureClient from "@/components/FutureClient";
import { FutureProvider } from "@/context/FutureContext";

export default function HabitPage() {

  return (
    <FutureProvider>
      <FutureClient />
    </FutureProvider>
  );
}

