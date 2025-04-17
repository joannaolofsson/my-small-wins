import { useForm, SubmitHandler } from "react-hook-form";
import { useWin } from "@/context/WinContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase-client";

type WinFormValues = {
  message: string;
  encouragement: string; 
  emotion:string;
};

export const SmallWinFormSection = ({ selectedId }: { selectedId: string | null }) => {
  const { addWin } = useWin();
  const { register, handleSubmit, reset } = useForm<WinFormValues>();

  const onSubmit: SubmitHandler<WinFormValues> = async (data) => {
    const uniqueId = crypto.randomUUID();

    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.session?.user?.id) {
        console.error("User is not authenticated:", sessionError?.message || "No session found");
        return;
      }

      const userId = session.session.user.id;

      const res = await fetch(`/api/small-win?type=manual`);
      const apiData = await res.json();

      // Ny win
      addWin({
        inputId: uniqueId,
        uniqueKey: uniqueId,
        message: data.message,
        icon: apiData.icon,
        encouragement: data.encouragement, 
      });
      

      // Detta sparas i supabase
      const { error: insertError } = await supabase.from("win_messages").insert({
        input_id: uniqueId,
        user_id: userId,
        winmessage: data.message,
        icon: apiData.icon || "✨",
        encouragement: data.encouragement, 
        category: null, 
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error("Error inserting win into Supabase:", insertError.message);
      } else {
        console.log("Win saved successfully to Supabase!");
      }

      reset();
    } catch (err) {
      console.error("Error handling form submission:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-2 w-full p-6"
    >
      <div className="py-4">
        <Label htmlFor="message" className="pb-2">
          Name your win:
        </Label>
        <Input
          id="message"
          {...register("message", { required: true })}
          placeholder="Write a small win..."
          className="flex-1 bg-[#F8F9FA]"
        />
      </div>

      <div className="my-4">
        <Label htmlFor="emotion" className="pb-2">
          How do you feel about it?
        </Label>
        <Input
          id="emotion" 
          {...register("emotion", { required: false })}
          placeholder="Write your feelings..."
          className="flex-1 bg-[#F8F9FA]"
        />
      </div>

      <div className="w-lg flex justify-end pr-12">
        <Button type="submit" variant="default">
          Submit
        </Button>
      </div>
    </form>
  );
};
