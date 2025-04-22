import { supabase } from "./supabase-client";
import { WinInput } from "@/types/interfaces";


export async function fetchSmallWins(): Promise<WinInput[]> {
  try {
    const { data, error } = await supabase
      .from("smallwins")
      .select("*")
      .order("created_at", { ascending: false }); // Default to ordering by recency

    if (error) {
      console.error(`Error fetching data from smallwins:`, error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error(`Unexpected error in fetchSmallWins:`, err);
    return [];
  }
}

export async function fetchSmallWinsByUser(userId: string): Promise<WinInput[]> {
  try {
    const { data, error } = await supabase
      .from("smallwins")
      .select("*")
      .eq("user_id", userId) // Assumes your user ID column is correct
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching smallwins for user ${userId}:`, error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error(`Unexpected error in fetchSmallWinsByUser:`, err);
    return [];
  }
}

export async function addSmallWin(input: Omit<WinInput, "id">): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("smallwins")
      .insert([
        { 
          input_future: input.inputFuture, // Correct column name
          message: input.message,
          icon: input.icon,
          encouragement: input.encouragement,
          created_at: new Date().toISOString(),
          emotion: input.emotion,
          color: input.color || "default-color",
        },
      ]);

    if (error) {
      console.error(`Error adding data to smallwins:`, error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Unexpected error in addSmallWin:`, err);
    return false;
  }
}


export async function deleteSmallWin(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("smallwins").delete().match({ id });

    if (error) {
      console.error(`Error deleting input with ID ${id} from smallwins:`, error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Unexpected error while deleting input with ID ${id}:`, err);
    return false;
  }
}
