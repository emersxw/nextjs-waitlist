import { type InputStatus } from "@/types";

interface StatusMessageProps {
  status: InputStatus;
  message: string;
}

export function StatusMessage({ status, message }: StatusMessageProps) {
  return (
    <div
      aria-live="polite"
      className="h-5 transition-opacity duration-200"
    >
      <p
        className={`text-sm ${
          status === "success"
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        } ${message ? "opacity-100" : "opacity-0"}`}
      >
        {message || "‎"}
      </p>
    </div>
  );
} 