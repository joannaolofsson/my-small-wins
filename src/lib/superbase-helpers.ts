import { supabase } from "@/lib/supabase-client";
import { FutureInput } from "@/types/interfaces";

// Fetch data from the future_inputs table
export async function fetchFutureInputs() {
  try {
    const { data, error } = await supabase
      .from("future_inputs")
      .select("*")
      .order("created_at", { ascending: false }); // Default to ordering by recency

    if (error) {
      console.error(`Error fetching data from future_inputs:`, error.message);
      return [];
    }

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(`Unexpected error in fetchFutureInputs:`, err);
    return [];
  }
}

// Add data to the future_inputs table
export async function addFutureInput(userId: string, category: string, name: string) {
  try {
    const { error } = await supabase.from("future_inputs").insert({
      user_id: userId,
      category,
      name,
      created_at: new Date().toISOString(), // Optional: Add timestamp
    });

    if (error) {
      console.error(`Error adding data to future_inputs:`, error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Unexpected error in addFutureInput:`, err);
    return false;
  }
}

// Delete data from the future_inputs table
export async function deleteFutureInput(id: string) {
  try {
    const { error } = await supabase.from("future_inputs").delete().match({ id });

    if (error) {
      console.error("Error deleting input from future_inputs:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error in deleteFutureInput:", err);
    return false;
  }
}
