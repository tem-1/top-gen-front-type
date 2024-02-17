import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LoginButton = () => {
  // Check if running on the client-side
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, return a link to the profile page
      return <Link href="/profile">Profile</Link>;
    }
  }

  // If no token or server-side rendering, return link to login page
  return (
    <Link href="/login">
      <Button
        variant="outline"
        className={cn("border-[#00A1FF] text-[#00A1FF]")}
      >
        Нэвтрэх
      </Button>
    </Link>
  );
};

export default LoginButton;
