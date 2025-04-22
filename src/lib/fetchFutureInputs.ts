export async function fetchFutureInputs(userId: string) {
    try {
      const { data, error } = await supabase
        .from("future_inputs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
  
      if (error) {
        console.error("Error fetching data from future_inputs:", error.message);
        return [];
      }
  
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Unexpected error in fetchFutureInputs:", err);
      return [];
    }
  }
  