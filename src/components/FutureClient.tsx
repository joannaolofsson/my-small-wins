  'use client';

  import React, { useState, useEffect } from "react";
  import { useRouter } from "next/router"; // Access dynamic route parameters
  import { useFuture } from "@/context/FutureContext";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";

  export default function FuturePage() {
    const router = useRouter();
    const { type } = router.query; 
    const { addInput } = useFuture(); // Access FutureProvider context
    const [value, setValue] = useState(""); 
    const [submitted, setSubmitted] = useState(false); 

    useEffect(() => {
      // Wait for router to be ready before accessing the query
      if (!router.isReady) {
        return;
      }
    }, [router.isReady]);

    const handleSubmit = async () => {
      if (!value.trim() || !type) return;

      try {
        await addInput(type as string, value); 
        setValue(""); 
        setSubmitted(true); 
      } catch (error) {
        console.error("Failed to submit input:", error);
      }
    };

    if (!router.isReady) {
      return <div>Loading...</div>; // Ensure router is ready before rendering
    }

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
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
