"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

type InputStatus = "idle" | "loading" | "error" | "success";
type Language = "en" | "pt-BR";

interface FormFields {
  name: string;
  email: string;
}

interface ApiResponse {
  name: string;
  email: string;
  error?: string;
}

const translations = {
  "en": {
    title: "Join waitlist",
    subtitle: "Be notified when we launch.",
    name: "Name",
    email: "you@example.com",
    join: "Join",
    joining: "Joining...",
    success: (name: string) => `Thanks for joining, ${name}! We'll be in touch soon.`,
    error: {
      default: "An unexpected error occurred.",
      prefix: "Error: ",
    },
  },
  "pt-BR": {
    title: "Entre na lista de espera",
    subtitle: "Seja notificado quando lançarmos.",
    name: "Nome",
    email: "voce@exemplo.com",
    join: "Participar",
    joining: "Participando...",
    success: (name: string) => `Obrigado por participar, ${name}! Entraremos em contato em breve.`,
    error: {
      default: "Ocorreu um erro inesperado.",
      prefix: "Erro: ",
    },
  },
} as const;

const INITIAL_FORM_STATE: FormFields = {
  name: "",
  email: "",
};

const LOADING_DELAY = 1000;
const RESPONSE_DELAY = 400;

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM_STATE);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<InputStatus>("idle");
  const [lang, setLang] = useState<Language>("en");

  const t = translations[lang];

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
        setMessage(t.success(data.name));
        setFormData(INITIAL_FORM_STATE);
      } else {
        setStatus("error");
        setMessage(`${t.error.prefix}${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setMessage(t.error.default);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="w-full max-w-sm">
        <div className="flex justify-end mb-8">
          <LanguageSwitch currentLang={lang} onLanguageChange={setLang} />
        </div>
        <Header title={t.title} subtitle={t.subtitle} />
        <div className="mt-10">
          <Form
            formData={formData}
            status={status}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            translations={{
              name: t.name,
              email: t.email,
              join: t.join,
              joining: t.joining,
            }}
          />
        </div>
        <div className="mt-4">
          <StatusMessage status={status} message={message} />
        </div>
      </div>
    </main>
  );
}

function LanguageSwitch({
  currentLang,
  onLanguageChange,
}: {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onLanguageChange("en")}
        className={`text-sm transition-opacity ${
          currentLang === "en" ? "opacity-100" : "opacity-50 hover:opacity-75"
        }`}
      >
        EN
      </button>
      <div className="w-px h-4 bg-[var(--input-border)]" />
      <button
        onClick={() => onLanguageChange("pt-BR")}
        className={`text-sm transition-opacity ${
          currentLang === "pt-BR" ? "opacity-100" : "opacity-50 hover:opacity-75"
        }`}
      >
        PT
      </button>
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-3xl font-normal tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
    </div>
  );
}

interface FormProps {
  formData: FormFields;
  status: InputStatus;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  translations: {
    name: string;
    email: string;
    join: string;
    joining: string;
  };
}

function Form({ formData, status, handleChange, handleSubmit, translations }: FormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        id="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        disabled={status === "loading"}
        status={status}
        placeholder={translations.name}
      />
      <FormInput
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={status === "loading"}
        status={status}
        placeholder={translations.email}
      />
      <SubmitButton 
        status={status} 
        joinText={translations.join}
        joiningText={translations.joining}
      />
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
  placeholder: string;
}

function FormInput({
  id,
  type,
  value,
  onChange,
  disabled,
  status,
  placeholder,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        disabled={disabled}
        className={getInputStyles(status)}
      />
    </div>
  );
}

function SubmitButton({ 
  status, 
  joinText, 
  joiningText 
}: { 
  status: InputStatus;
  joinText: string;
  joiningText: string;
}) {
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
      {status === "loading" ? `${joiningText}` : `${joinText} →`}
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
    "block w-full border-0 bg-[var(--input-background)] px-4 py-3 text-sm transition-colors placeholder:text-[var(--foreground)] placeholder:opacity-50";
  
  const borderStyles = {
    idle: "border border-[var(--input-border)] focus:border-[var(--input-border-focus)]",
    loading: "border border-[var(--input-border)] opacity-50 cursor-not-allowed",
    error: "border-2 border-red-500 dark:border-red-400",
    success: "border border-[var(--input-border)] focus:border-[var(--input-border-focus)]",
  };

  return `${baseStyles} ${borderStyles[status]} focus:ring-0`;
}
