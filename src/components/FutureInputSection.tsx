'use client';

import { useState } from "react";
import { FutureType, useFuture } from "@/context/FutureContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface InputSectionProps {
  type: FutureType;
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
    <div className="mb-4">
      <h2 className="text-xl mb-2">{placeholder}</h2>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter a ${type.toLowerCase()}`}
        className="border p-2 mr-2 bg-[#F8F9FA]"
      />
      <Button onClick={handleAdd} variant="default">
        Add {type}
      </Button>
    </div>
  );
};
