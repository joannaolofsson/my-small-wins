
'use client'
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signUp } from "../../actions/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signUp(formData)
    
    if(result.status == "success") {
      router.push("/login");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };
  return (
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-[#333333]">
            Username
          </Label>
          <Input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            className="text-[#333333] bg-[#F8F9FA]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[#333333]">
            Email
          </Label>
          <Input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="text-[#333333] bg-[#F8F9FA]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[#333333]">
            Password
          </Label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="text-[#333333] bg-[#F8F9FA]"
          />
        </div>
        <div className="mt-2 max-w-[120px] self-end">
          <AuthButton type="Sign up" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
  );
};

export default SignUpForm;
