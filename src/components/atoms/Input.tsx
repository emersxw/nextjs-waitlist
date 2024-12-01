import { type ChangeEvent } from "react";
import { type InputStatus } from "@/types";

interface InputProps {
  id: string;
  name: string;
  type: "text" | "email";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  status?: InputStatus;
  placeholder: string;
  required?: boolean;
}

export function Input({
  id,
  name,
  type,
  value,
  onChange,
  disabled,
  status = "idle",
  placeholder,
  required,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={getInputStyles(status)}
      />
    </div>
  );
}

function getInputStyles(status: InputStatus) {
  const baseStyles =
    "block w-full border-0 bg-[var(--input-background)] px-4 py-3 text-sm transition-colors placeholder:text-[var(--foreground)] placeholder:opacity-50";
  
  const borderStyles = {
    idle: "border border-[var(--input-border)] focus:border-[var(--input-border-focus)]",
    loading: "border border-[var(--input-border)] opacity-50 cursor-not-allowed",
    error: "border-2 border-red-500 dark:border-red-400",
    success: "border border-[var(--input-border)] focus:border-[var(--input-border-focus)]",
  };

  return `${baseStyles} ${borderStyles[status]} focus:ring-0`;
} 