import { useLanguage } from "./LanguageContext";
import type { LanguageCode } from "./types";

const options: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fa", label: "FA" },
];

/**
 * Skeleton only — not mounted into SiteHeader yet.
 * ETA-DESIGN-SYSTEM.md §8 Track A calls for this in SiteHeader.tsx once
 * Persian content (Track B) exists; wiring it in earlier would expose a
 * language switch with nothing behind it but placeholder strings.
 */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-1 rounded-lg border border-surface-200 bg-white p-1 text-sm font-medium"
    >
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          aria-pressed={language === option.code}
          className={`rounded-md px-2.5 py-1 transition-colors ${
            language === option.code
              ? "bg-copper-600 text-white"
              : "text-surface-600 hover:bg-surface-100"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
