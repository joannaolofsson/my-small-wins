"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { login } from "../../actions/auth";

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
      <div>
        <label className="block text-sm font-medium text-[#333333]">Email</label>
        <input
          type="email"
          name="email"
          className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#333333]">Password</label>
        <input
          type="password"
          name="password"
          className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
        />
      </div>
      <AuthButton type="Login" loading={loading} />
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default LoginForm;
