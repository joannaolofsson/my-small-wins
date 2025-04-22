'use client';

import React, { useState } from "react";
import { useWin } from "@/context/WinContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SmallWinsPage() {
  const { createWin } = useWin(); // Access WinContext
  const [message, setMessage] = useState(""); // Track user input
  const [emotion, setEmotion] = useState(""); // Track emotion input
  const [submitted, setSubmitted] = useState(false); // Submission state

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      await createWin({
        inputFuture: "default-uuid", // Use placeholder UUID for now
        message,
        icon: "🎉", // Default icon
        encouragement: "Great job!", // Default encouragement
        color: "blue", // Default color
        emotion,
        category: "manual", // Default category
      });

      setMessage(""); // Clear inputs
      setEmotion("");
      setSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error("Failed to add Small Win:", error);
    }
  };

  return (
    <div className="flex w-full justify-center h-screen mt-10">
      <div className="flex flex-col items-start">
        <div className="w-lg bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg my-4 flex flex-col gap-6 p-6">
          <h1 className="text-2xl pb-2">Add a Small Win</h1>

          {!submitted ? (
            <>
              <Input
                type="text"
                placeholder="Share your small win"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border rounded-lg p-2"
              />
              <Input
                type="text"
                placeholder="How does it make you feel?"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="border rounded-lg p-2"
              />
              <Button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </Button>
            </>
          ) : (
            <p className="text-green-500 text-xl">✔️ Small Win added successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
}
