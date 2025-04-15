import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React from "react";


const SignUp = async () => {
  return (

    <div className="flex w-full justify-center mt-12">
    <section className="flex flex-col w-[400px] bg-white/30 p-6 rounded-xl border border-white/20 backdrop-blur-md">
      <h1 className="text-3xl w-full text-center font-semibold mb-6">
        Sign up
      </h1>
        <SignUpForm />
        <div className="mt-2 flex items-center">
          <h1>Already have an account?</h1>
          <Link className="font-bold ml-2" href="/login">
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
