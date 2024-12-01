"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { LanguageSwitch } from "@/components/molecules/LanguageSwitch";
import { StatusMessage } from "@/components/molecules/StatusMessage";
import { WaitlistForm } from "@/components/organisms/WaitlistForm";
import { type InputStatus, type Language, type FormFields } from "@/types";
import { translations } from "@/translations";

const INITIAL_FORM_STATE: FormFields = {
  name: "",
  email: "",
};

const LOADING_DELAY = 1000;
const RESPONSE_DELAY = 400;

export default function WaitlistPage() {
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

      const data = await response.json();

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
        <div>
          <h1 className="text-3xl font-normal tracking-tight">{t.title}</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{t.subtitle}</p>
        </div>
        <div className="mt-10">
          <WaitlistForm
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
