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


/*import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import createClient from "@/utils/server";


export async function signUp(formData: FormData) {
    const supabase = await createClient();

    const creadentials = {
        username: formData.get("username") as string,  
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error, data } = await supabase.auth.signUp({
        email: creadentials.email,
        password: creadentials.password,
        options: {
            data: {
                username: creadentials.username,
        }
    }
    })

    if(error) {
        return {
            status: error?.message,
            user: null
        };
    } else if (data?.user?.identities?.length === 0) {
        return {
            status: "User with this email already exists, please login",
            user: null
        }
    }
        revalidatePath("/", "layout");
        return {status: "success", user: data.user};
    }

export async function login(formData: FormData) {
    const supabase = await createClient();

    const credentials = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error, data} = await supabase.auth.signInWithPassword(credentials);
console.log("Logged in user:", data?.user); // Log user data here

    if(error) {
        return {
            status: error?.message,
            user: null,
        }
    }

    const {data: existingUser} = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", credentials?.email)
    .limit(1)
    .single();

    if(!existingUser) {
        const { error: inserError} = await supabase.from("user_profiles").insert({
            email: data?.user.email,
            username: data?.user?.user_metadata?.username,
        })

        if(inserError) {
            return {
                status: inserError?.message,
                user: null,
            }
        }
    }


    revalidatePath("/", "layout");
    return { status: "success", user: data.user};
}

export async function signOut() {
    const supabase = await createClient();
    const {error} = await supabase.auth.signOut();

    if(error) {
        redirect("/error")
    }

    revalidatePath("/", "layout");
    redirect("/login");
}*/