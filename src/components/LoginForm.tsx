"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { login } from "../../actions/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result.status === "success" && result.user) {
      router.push("/");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="text-[#333333]">Email</Label>
        <Input
          type="email"
          name="email"
          className="bg-[#F8F9FA] text-[#333333]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-[#333333]">Password</Label>
        <Input
          type="password"
          name="password"
          className="bg-[#F8F9FA] text-[#333333]"
        />
      </div>
      <div className="mt-2 max-w-[120px] self-end">
      <AuthButton type="Login" loading={loading} />
      {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
