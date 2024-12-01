import { type FormEvent, type ChangeEvent } from "react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { type InputStatus, type FormFields } from "@/types";

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

export function WaitlistForm({ 
  formData, 
  status, 
  handleChange, 
  handleSubmit, 
  translations 
}: FormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        disabled={status === "loading"}
        status={status}
        placeholder={translations.name}
        required
      />
      <Input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={status === "loading"}
        status={status}
        placeholder={translations.email}
        required
      />
      <Button 
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? `${translations.joining}` : `${translations.join} →`}
      </Button>
    </form>
  );
} 