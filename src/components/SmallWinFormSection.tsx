import { useForm, SubmitHandler } from "react-hook-form";
import { useWin } from "@/context/WinContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { createSupabaseClient } from "@/utils/clients";

type WinFormValues = {
  message: string;
  encouragement: string; // No message field anymore

};type SmallWinFormSectionProps = {
  selectedId: string | null;
};

export const SmallWinFormSection = ({ selectedId }: SmallWinFormSectionProps) => {
  const { addWin } = useWin();
  const { register, handleSubmit, reset } = useForm<WinFormValues>();
  const supabase = createSupabaseClient();

  const onSubmit: SubmitHandler<WinFormValues> = async (data) => {
    const uniqueId = crypto.randomUUID();

    try {
      // Retrieve the authenticated user's session
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.session?.user?.id) {
        console.error("User is not authenticated:", sessionError?.message || "No session found");
        return;
      }

      const userId = session.session.user.id;

      // Fetch encouragement and icon from the API
      const res = await fetch(`/api/small-win?type=manual`);
      const apiData = await res.json();

      // Add win to context/state
      addWin({
        inputId: uniqueId,
        uniqueKey: uniqueId,
        message: data.message,
        icon: apiData.icon || "✨",
        encouragement: apiData.encouragement || data.encouragement,
      });

      // Save win to Supabase
      const { error: insertError } = await supabase.from("win_messages").insert({
        input_id: uniqueId,
        user_id: userId,
        winmessage: data.message,
        icon: apiData.icon || "✨",
        encouragement: apiData.encouragement || data.encouragement,
        category: "manual",
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
        <Label htmlFor="encouragement" className="pb-2">
          How do you feel about it?
        </Label>
        <Input
          id="encouragement"
          {...register("encouragement", { required: false })}
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
