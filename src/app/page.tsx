import { Button } from "@/components/ui/button"
import Link from "next/link"



function Home() {
  return (
    <div className="flex w-full justify-center m-8">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-6xl tex">Track your small wins</h1>

        <p className="text-lg">What habits does your future self have?</p>
        <p className="text-lg">Track your small wins today and meet a future you want to live in.</p>
        <div className="flex gap-2">
      
          <Button asChild variant="secondary">
            <Link href="/smallwins">Track wins</Link>
          </Button>
          <Button asChild variant="none">
            <Link href="/signup" className="font-semibold">Saknar konto, registrera dig</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home


