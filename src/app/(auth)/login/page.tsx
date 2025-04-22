import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen mt-8">
        <div className="w-full max-w-md flex flex-col justify-center bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-6 gap-2 p-8">
          <h2 className="mb-4 text-2xl md:text-4xl text-center text-[#333333]">
            Sign in
          </h2>
          <section className="w-full flex justify-center">
          <LoginForm />
          </section>
          <div className="mt-1 flex justify-end">
            <p className="font-normal text-sm text-[#333333]">{`Don't have an account?`}</p>
            <Link className="font-semibold text-sm ml-4 text-[#333333]" href="/register">
              Sign Up
            </Link>
          </div>
          <div className="flex justify-end">
            <p className="font-normal text-sm text-[#333333]">{`Forgot your password?`}</p>
            <Link className="font-semibold text-sm ml-4 text-[#333333]" href="/forgot-password">
              Reset
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
