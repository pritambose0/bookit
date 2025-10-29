"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "bg-[#FFD643] hover:bg-[#edc73f] transition-colors duration-200 cursor-pointer text-[#161616] font-medium px-4 h-10 rounded-md flex items-center justify-center space-x-1 text-sm disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
