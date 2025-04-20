'use client';

import React, { useState } from "react";
import { useWin } from "@/context/WinContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { WinFormValues } from "@/types/interfaces";
import { randomUUID } from "crypto";

export const SmallWinFormSection = () => {
  const { createWin } = useWin(); // Access `WinContext`
  const { register, handleSubmit, reset } = useForm<WinFormValues>();
  const [clickCount, setClickCount] = useState(0);

  const onSubmit: SubmitHandler<WinFormValues> = async (data) => {
    const currentCount = clickCount + 1;
    setClickCount(currentCount);

    try {
      // Fetch booster API for additional values (icon, encouragement, color)
      const res = await fetch(`/api/booster?count=${currentCount}`);
      let icon = "✨";
      let encouragement = "You got this!";
      let color = "border-b-blue-400";

      if (res.ok) {
        const apiData = await res.json();
        icon = apiData.icon || icon;
        encouragement = apiData.encouragement || encouragement;
        color = apiData.color || color;
      } else {
        console.error("Booster fetch failed:", res.status);
      }

      // Submit the small win
      await createWin({
        inputFuture: crypto.randomUUID(), // Generates a valid UUID
        message: data.message,
        icon: "🎉",
        encouragement: "Great job!",
        color: "blue",
        emotion: data.emotion,
        category: "manual",
      });
      
      
      
      
      
      

      reset(); // Reset the form
    } catch (err) {
      console.error("Error handling form submission:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg my-4 flex flex-col gap-2 w-full p-6"
    >
      <div className="py-4">
        <Label htmlFor="message" className="text-lg font-normal text-[#333333] pb-2">
          Name your win: *
        </Label>
        <Input
          id="message"
          {...register("message", { required: true })}
          placeholder="Share your small win"
          className="flex-1 bg-[#F8F9FA] text-[#333333]"
        />
      </div>

      <div className="my-4">
        <Label htmlFor="emotion" className="text-lg font-normal text-[#333333] pb-2">
          How do you feel about it? *
        </Label>
        <Input
          id="emotion"
          {...register("emotion")}
          placeholder="How does it make you feel?"
          className="flex-1 bg-[#F8F9FA] text-[#333333]"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
