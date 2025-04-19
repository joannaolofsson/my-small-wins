'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { useWin } from "@/context/WinContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

type WinFormValues = {
  message: string;
  emotion: string;
};

export const SmallWinFormSection = ({ selectedId }: { selectedId: string | null }) => {
  const { smallWins, addWin } = useWin();
  const { register, handleSubmit, reset } = useForm<WinFormValues>();

  const onSubmit: SubmitHandler<WinFormValues> = async (data) => {
    const uniqueId = crypto.randomUUID();

    try {
      const res = await fetch("/api/booster?count=1");

      if (!res.ok) {
        const text = await res.text();
        console.error("Booster fetch failed:", res.status, text);
        return;
      }

      const apiData = await res.json();
      const {
        icon = "✨",
        encouragement = "You got this!",
        color = "border-blue-400",
      } = apiData || {};

      await addWin({
        inputId: uniqueId,
        message: data.message,
        icon,
        encouragement,
        color,
        emotion: data.emotion,

      });


      reset();
    } catch (err) {
      console.error("Error handling form submission:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg my-4 flex flex-col gap-2 w-full p-6">
      <div className="py-4">
        <Label htmlFor="message" className="pb-2">Name your win:</Label>
        <Input
          id="message"
          {...register("message", { required: true })}
          placeholder="Share your small win"
          className="flex-1 bg-[#F8F9FA]"
        />
      </div>

      <div className="my-4">
        <Label htmlFor="emotion" className="pb-2">How do you feel about it?</Label>
        <Input
          id="emotion"
          {...register("emotion")}
          placeholder="How does it make you feel?"
          className="flex-1 bg-[#F8F9FA]"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
