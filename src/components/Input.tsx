"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onClear?: () => void;
  cross?: boolean;
}

const Input: React.FC<InputProps> = ({
  value = "",
  cross = false,
  className = "",
  placeholder = "",
  type = "text",
  onClear,
  ...props
}) => {
  return (
    <div className="relative flex-1">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={cn(
          "rounded-md px-3 py-2 pr-8 w-full h-10 text-sm text-[#161616] placeholder:text-gray-500 bg-[#EDEDED] border border-transparent focus:border-[#ffeca6] focus:ring-1 focus:ring-[#FFD643]/50 transition-all duration-300 ease-in-out outline-none",
          className
        )}
        {...props}
      />

      {/* Clear button */}
      {cross && value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          <X size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
};

export default Input;
