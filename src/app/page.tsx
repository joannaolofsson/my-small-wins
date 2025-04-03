
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex w-full justify-center m-8">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-4xl tex">Small win</h1>
        <h2 className="text-2xl">tracker</h2>
        <p>What habits does your future self have?</p>
        <p>Track your small wins today and meet a future you want to live in.</p>
        <div>
          <Button>Start</Button>
        </div>
      </div>
    </div>
  );
}
