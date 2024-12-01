"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

type InputStatus = "idle" | "loading" | "error" | "success";

interface FormFields {
  name: string;
  email: string;
}

interface ApiResponse {
  name: string;
  email: string;
  error?: string;
}

const INITIAL_FORM_STATE: FormFields = {
  name: "Emerson",
  email: "emerson@emerson.com",
};

const LOADING_DELAY = 1000;
const RESPONSE_DELAY = 400;

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM_STATE);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<InputStatus>("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY));

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY));

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(`Thanks for joining, ${data.name}! We'll be in touch soon.`);
        setFormData(INITIAL_FORM_STATE);
      } else {
        setStatus("error");
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="w-full max-w-sm">
        <Header />
        <div className="mt-10">
          <Form
            formData={formData}
            status={status}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="mt-4">
          <StatusMessage status={status} message={message} />
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <div>
      <h1 className="text-3xl font-normal tracking-tight">Join waitlist</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Be notified when we launch.
      </p>
    </div>
  );
}

interface FormProps {
  formData: FormFields;
  status: InputStatus;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function Form({ formData, status, handleChange, handleSubmit }: FormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        id="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        disabled={status === "loading"}
        status={status}
      />
      <FormInput
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={status === "loading"}
        status={status}
      />
      <SubmitButton status={status} />
    </form>
  );
}

interface FormInputProps {
  id: keyof FormFields;
  type: "text" | "email";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  status: InputStatus;
}

function FormInput({
  id,
  type,
  value,
  onChange,
  disabled,
  status,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={id.charAt(0).toUpperCase() + id.slice(1)}
        required
        disabled={disabled}
        className={getInputStyles(status)}
      />
    </div>
  );
}

function SubmitButton({ status }: { status: InputStatus }) {
  return (
    <button
      type="submit"
      disabled={status === "loading"}
      className={`w-full bg-[var(--foreground)] px-4 py-3 text-sm font-medium 
        text-[var(--background)] focus:outline-none focus:ring-2 
        focus:ring-[var(--foreground)] focus:ring-offset-2 
        focus:ring-offset-[var(--background)] transition-all
        ${status === "loading" ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
    >
      {status === "loading" ? "Joining..." : "Join →"}
    </button>
  );
}

function StatusMessage({ status, message }: { status: InputStatus; message: string }) {
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
        {message || "‎"}  {/* Using a non-breaking space to maintain height */}
      </p>
    </div>
  );
}

function getInputStyles(status: InputStatus) {
  const baseStyles =
    "block w-full border-0 bg-[var(--input-background)] px-4 py-3 text-sm transition-colors";
  
  const borderStyles = {
    idle: "border border-[var(--input-border)] focus:border-[var(--input-border-focus)]",
    loading: "border border-[var(--input-border)] opacity-50 cursor-not-allowed",
    error: "border-2 border-red-500 dark:border-red-400",
    success: "border border-[var(--input-border)] focus:border-[var(--input-border-focus)]",
  };

  return `${baseStyles} ${borderStyles[status]} focus:ring-0`;
}
