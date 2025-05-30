import React from "react";
import { Button } from "./ui/button";

const AuthButton = ({
  type,
  loading,
}: {
  type: "Login" | "Sign up";
  loading: boolean;
}) => {
  return (
    <Button
      disabled={loading}
      type="submit"
      className={`${
        loading ? "bg-[#C9A7D9]" : "bg-[#B48EC9]"
      }`}
    >
      {loading ? "Loading..." : type}
    </Button>
  );
};

export default AuthButton;

