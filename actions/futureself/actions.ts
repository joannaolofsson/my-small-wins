"use server";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export async function addInput(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { error } = await supabase
    .from("future_inputs")
    .insert([
      {
        user_id: user.id,
        category: formData.get("category") as string, // e.g., "Habit", "Accomplishment", "Gift"
        name: formData.get("name") as string, // User's input
        inserted_at: new Date(),
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/futureself"); // Revalidate futureself page
}

export async function deleteInput(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("future_inputs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/futureself"); // Revalidate futureself page
}