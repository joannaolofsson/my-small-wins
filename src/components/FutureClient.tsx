'use client';

import React, { useState } from "react";
import { useFuture } from "@/context/FutureContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function FutureClient() {
  const { addInput } = useFuture(); // Access FutureContext for addInput
  const [value, setValue] = useState(""); // State for input value
  const [submitted, setSubmitted] = useState(false); // Submission state

  const handleSubmit = async () => {
    if (!value.trim()) return;

    try {
      const type = "Habit"; // Example hardcoded type, can be dynamic
      await addInput(type, value); // Submit the input
      setValue(""); // Clear the input field
      setSubmitted(true); // Show confirmation message
    } catch (error) {
      console.error("Failed to submit input:", error);
    }
  };

  return (
    <div className="flex w-full justify-center h-screen mt-10">
      <div className="flex flex-col items-start">
        <div className="w-lg bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-6 p-6">
          <h1 className="text-2xl pb-2">Your Future Self</h1>
          <p className="text-gray-600">Define habits, accomplishments, and gifts here.</p>

          {!submitted ? (
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Add a habit..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="border rounded-lg p-2"
              />
              <Button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Submit
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✔️</span>
              <p className="text-gray-600">Submitted!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
