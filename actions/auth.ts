"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import createClient from "@/utils/server"; 

export async function login(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { status: error.message, user: null };
  }

  return { status: "success", user: data.user };
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    return { status: error.message, user: null };
  }

  return { status: "success", user: data.user };
}

export async function signOut() {
    const supabase = await createClient();
    const session = await supabase.auth.getSession();
  
    if (!session) {
      redirect("/login"); 
    }
  
    const { error } = await supabase.auth.signOut();
    if (error) redirect("/error");
  
    revalidatePath("/", "layout");
    redirect("/login");
  }

