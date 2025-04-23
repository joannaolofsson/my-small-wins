'use client';

import React, { useState } from "react";
import { FutureProvider, useFuture } from "@/context/FutureContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FuturePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = React.use(params); 
  const { addInput } = useFuture(); 
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);


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
    <FutureProvider>
    <div className="flex flex-col items-center min-h-screen mt-8">
      <div className="w-full max-w-4xl flex flex-col justify-center bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-6 gap-2 py-8 px-8 md:px-20">
          <h2 className="mb-4 text-2xl md:text-4xl text-start text-[#333333]">What {type} do you want for your future self?</h2>

          {!submitted ? (
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder={`Add a ${type?.toLowerCase()}...`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-[#F8F9FA] text-[#333333]"
              />
              <Button
                onClick={handleSubmit}
                className=""
              >
                Submit
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-2">
              <span className="text-green-500 text-xl">✔️</span>
              <p className="text-gray-600">{type} success!</p>

              {nextType && (
                <Link href={`/futureself/${nextType}`}>
                  <Button variant="default">
                     {nextType.charAt(0).toUpperCase() + nextType.slice(1)}
                  </Button>
                </Link>
              )}
              {!nextType && (
                <Link href="/">
                <Button variant="default" className="">
                Finish
                </Button>
                </Link>
                )}
            </div>
          )}
        </div>
      </div>
      </FutureProvider>
  );
}
