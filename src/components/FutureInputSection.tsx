'use client';

import { useState } from "react";
import { InputType, useFuture } from "@/context/FutureContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface InputSectionProps {
  type: InputType;
  placeholder: string;
}

export const FutureInputSection = ({ type, placeholder }: InputSectionProps) => {
  const { addInput } = useFuture();
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    addInput(type, value.trim());
    setValue("");
  };

  return (
    <div className="w-full flex flex-col mt-6">
      <h2 className="text-lg mb-1">{placeholder}</h2>
      <div className="flex flex-row justify-center items-center">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter a ${type.toLowerCase()}`}
          className="inline-block border border-[#D1D5DB] rounded-lg py-4 px-6 mr-2 bg-[#F8F9FA]"
        />

        <Button onClick={handleAdd} variant="default">
          Add
          <span className="hidden"> {type}</span>
        </Button>

      </div>
    </div>
  );
};
