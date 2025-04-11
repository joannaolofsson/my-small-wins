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
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-2 w-full p-6">
      <div className='py-4'>
        <Label htmlFor="name" className='pb-2' >Name your win?</Label>
        <Input
          {...register("message")}
          placeholder="Write a small win..."
          className="flex-1 bg-[#F8F9FA]"
        />
      </div>
      <div className='my-4'>
        <Label htmlFor="name" className='pb-2'>How do you feel about it?</Label>
        <Input
          {...register("message")}
          placeholder="How do you feel about it..."
          className="flex-1 bg-[#F8F9FA]"
        />
      </div>
      <div className='w-lg flex justify-end pr-12'>
        <Button type="submit" variant="default">
          Submit
        </Button>
      </div>
    </form>
  );
};
