import { type Language } from "@/types";

interface LanguageSwitchProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitch({ currentLang, onLanguageChange }: LanguageSwitchProps) {
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