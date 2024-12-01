import { type ReactNode } from "react";

interface ButtonProps {
  type?: "submit" | "button";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({ type = "button", disabled, children, className = "" }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full bg-[var(--foreground)] px-4 py-3 text-sm font-medium 
        text-[var(--background)] focus:outline-none focus:ring-2 
        focus:ring-[var(--foreground)] focus:ring-offset-2 
        focus:ring-offset-[var(--background)] transition-all
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
        ${className}`}
    >
      {children}
    </button>
  );
} 