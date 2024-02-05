import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const LoginButton = () => {
  return (
    <Button
      variant={"outline"}
      className={cn("border-[#00A1FF] text-[#00A1FF]")}
    >
      Нэвтрэх
    </Button>
  );
};

export default LoginButton;
