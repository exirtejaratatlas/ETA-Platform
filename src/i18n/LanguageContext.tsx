import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LANGUAGE_DIRECTION, type Direction, type LanguageCode, type Translations } from "./types";
import { en } from "./en";
import { fa } from "./fa";

const dictionaries: Record<LanguageCode, Translations> = { en, fa };
const STORAGE_KEY = "eta-language";

interface LanguageContextValue {
  language: LanguageCode;
  direction: Direction;
  setLanguage: (language: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Not mounted anywhere yet (see docs/delivery/RTL-READINESS-NOTE.md).
 * Defaulting to "en" makes mounting this a zero-visual-diff change whenever
 * that step is approved — matches current index.html lang="en" dir="ltr".
 */
export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: {
  children: ReactNode;
  defaultLanguage?: LanguageCode;
}) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "fa" ? stored : defaultLanguage;
  });

  const direction = LANGUAGE_DIRECTION[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const setLanguage = (next: LanguageCode) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ language, direction, setLanguage, t: dictionaries[language] }),
    [language, direction]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
