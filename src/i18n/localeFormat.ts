import type { LanguageCode } from "./types";

/**
 * Locale-aware formatting stubs — intentionally NOT implemented per-locale.
 *
 * Open Decision Required (ETA-DESIGN-SYSTEM.md §8 Track A — do not infer):
 * - Numeral system for "fa": Eastern Arabic digits (۰۱۲۳...) vs. Western digits.
 * - Calendar system for "fa": Jalali (Persian) calendar vs. Gregorian.
 *
 * Until those are decided against an approved source, both locales fall back
 * to the same Gregorian/Western-numeral behavior as the existing, untouched
 * src/lib/format.ts. Technical values (IDs, currency, JetBrains Mono figures)
 * stay LTR/Western-numeral regardless of locale per the brief — that part is
 * not an open decision.
 */
export function formatLocaleNumber(value: number, _language: LanguageCode): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatLocaleDate(date: string | null, _language: LanguageCode): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
