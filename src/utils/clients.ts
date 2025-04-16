import { createClient } from "@supabase/supabase-js";



export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
} 


//Alternative
//export const supabase = createClient(
  //SUPABASE_URL,
  //SUPABASE_ANON_KEY
//);
