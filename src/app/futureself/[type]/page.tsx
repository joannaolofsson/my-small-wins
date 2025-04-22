'use client';

import React, { useState } from "react";
import { useFuture } from "@/context/FutureContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FuturePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = React.use(params); // Unwrap the Promise
  const { addInput } = useFuture(); // Access FutureContext
  const [value, setValue] = useState(""); // Input state
  const [submitted, setSubmitted] = useState(false); // Submission state

  // Helper function to determine the next type in sequence
  const getNextType = (currentType: string): string | null => {
    const typeOrder = ["habit", "accomplishment", "gift"];
    const currentIndex = typeOrder.indexOf(currentType.toLowerCase());
    return currentIndex !== -1 && currentIndex < typeOrder.length - 1
      ? typeOrder[currentIndex + 1]
      : null;
  };

  const handleSubmit = async () => {
    if (!value.trim()) return;

    try {
      await addInput(type, value); // Submit input dynamically based on type
      setValue(""); // Clear input field
      setSubmitted(true); // Show confirmation
    } catch (error) {
      console.error("Failed to submit input:", error);
    }
  };

  const nextType = getNextType(type || ""); // Get the next type dynamically

  return (
    <div className="flex w-full justify-center h-screen mt-10">
      <div className="flex flex-col items-start">
        <div className="w-lg bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-6 p-6">
          <h1 className="text-2xl pb-2">Add a {type}</h1>
          <p className="text-gray-600">Define your {type} here for your future self.</p>

          {!submitted ? (
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder={`Add a ${type?.toLowerCase()}...`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="border rounded-lg p-2"
              />
              <Button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✔️</span>
              <p className="text-gray-600">{type} submitted successfully!</p>

              {nextType && (
                <Link href={`/futureself/${nextType}`}>
                  <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                    Next: {nextType.charAt(0).toUpperCase() + nextType.slice(1)}
                  </Button>
                </Link>
              )}
              {!nextType && (
                <Link href="/">
                <Button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">
                Finish
                </Button>
                </Link>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
