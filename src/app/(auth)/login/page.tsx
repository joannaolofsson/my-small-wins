import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="w-full flex mt-20 justify-center items-center">
        <section className="flex flex-col w-[400px] bg-white/30 border border-white/20 rounded-xl backdrop-blur-[15px] shadow-lg cursor-pointer my-4 flex flex-col gap-2 p-6">
          <h1 className="text-3xl w-full text-center font-medium mb-6">
            Sign in
          </h1>
          <LoginForm />
          <div className="mt-2 flex items-center">
            <h1>{`Don't have an account?`}</h1>
            <Link className="font-bold ml-2" href="/register">
              Sign Up
            </Link>
          </div>
          <div className="mt-2 flex items-center">
            <h1>{`Forgot your password?`}</h1>
            <Link className="font-bold ml-2" href="/forgot-password">
              Reset Password
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
