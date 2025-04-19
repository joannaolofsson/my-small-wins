'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FutureSectionProps } from "@/types/interfaces";

export const FutureInputSection = ({
  type,
  placeholder,
  onAdd,
}: FutureSectionProps) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim() === "") return;
    onAdd(type, value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 my-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button onClick={handleAdd}>Add</Button>
    </div>
  );
};


