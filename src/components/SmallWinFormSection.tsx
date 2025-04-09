'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useWin } from '@/context/WinContext';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

type WinFormValues = {
  message: string;
};

export const SmallWinFormSection = () => {
    const { addWin } = useWin();
  const { register, handleSubmit, reset } = useForm<WinFormValues>();

  const onSubmit: SubmitHandler<WinFormValues> = (data) => {
    addWin(data.message);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <Label htmlFor="name">Name your win?</Label>
      <Input
        {...register("message")}
        placeholder="Write a small win..."
        className="flex-1 bg-[#F8F9FA]"
      />
       <Label htmlFor="name">How do you feel about it?</Label>
      <Input
        {...register("message")}
        placeholder="How do you feel about it..."
        className="flex-1 bg-[#F8F9FA]"
      />
      <Button type="submit" variant="default">
        Submit
      </Button>
    </form>
  );
};
