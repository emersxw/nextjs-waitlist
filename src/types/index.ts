export type InputStatus = "idle" | "loading" | "error" | "success";
export type Language = "en" | "pt-BR";

export interface FormFields {
  name: string;
  email: string;
}

export interface ApiResponse {
  name: string;
  email: string;
  error?: string;
} 