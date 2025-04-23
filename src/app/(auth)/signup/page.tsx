// Denna sida används inte utan är standby för att implementera en fungerande login

import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React from "react";


const SignUp = async () => {
  return (

    <div className="flex flex-col items-center min-h-screen mt-8">
    <section className="w-full max-w-md flex flex-col justify-center bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-6 gap-2 p-8">
      <h2 className="text-3xl w-full text-center font-semibold mb-6">
        Sign up
      </h2>
      <section className="w-full flex justify-center">
        <SignUpForm />
      </section>
        <div className="mt-2 flex justify-end">
          <p className="text-sm font-normal">Already have an account?</p>
          <Link className="text-sm font-semibold ml-2" href="/login">
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
