import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useWin } from "@/context/WinContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { WinFormValues } from "@/types/interfaces";
import { FaSeedling, FaFire, FaCrown } from "react-icons/fa";


export const SmallWinFormSection = ({ selectedId }: { selectedId: string | null }) => {
  const { addWin } = useWin();
  const { register, handleSubmit, reset } = useForm<WinFormValues>();

// För att fixa antal klick
  const [clickCount, setClickCount] = useState(0);
  
const iconMap: Record<string, React.ReactNode> = {
  FaSeedling: <FaSeedling className="text-slate-500" />,
  FaFire: <FaFire className="text-slate-500" />,
  FaCrown: <FaCrown className="text-slate-500" />,
};

const onSubmit: SubmitHandler<WinFormValues> = async (data) => {
  const currentCount = clickCount + 1;
  setClickCount(currentCount);

  try {
    const res = await fetch(`/api/booster?count=${currentCount}`);
    if (!res.ok) {
      console.error("Failed to fetch booster");
      return;
    }

    const { icon, encouragement, color } = await res.json();
    console.log("Fetched booster data:", { icon, encouragement, color });

    const mappedIcon = iconMap[icon] || <FaSeedling className="text-slate-500" />; // Ensure iconMap is accessible here

    await addWin({
      inputId: crypto.randomUUID(),
      message: data.message,
      icon,
      encouragement,
      color,
      emotion: data.emotion,
    });

    reset({
      message: "",
      emotion: "",
    });
  } catch (error) {
    console.error("Error in form submission:", error);
  }
};

  

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg my-4 flex flex-col gap-2 w-full p-6"
    >
      <div className="py-4">
        <Label htmlFor="message" className="text-lg font-normal text-[#333333] pb-2"> Name your win: *</Label>
        <Input
          id="message"
          {...register("message", { required: true })}
          placeholder="Share your small win"
          className="flex-1 bg-[#F8F9FA] text-[#333333]"
        />
      </div>

      <div className="my-4">
        <Label htmlFor="emotion" className="text-lg font-normal text-[#333333] pb-2">How do you feel about it? *</Label>
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
