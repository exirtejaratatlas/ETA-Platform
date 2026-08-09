export type LanguageCode = "en" | "fa";
export type Direction = "ltr" | "rtl";

export const LANGUAGE_DIRECTION: Record<LanguageCode, Direction> = {
  en: "ltr",
  fa: "rtl",
};

/**
 * Site-chrome translation keys only (nav, footer, shared CTAs).
 * Per-page marketing body copy is a separate, later task — see
 * docs/delivery/RTL-READINESS-NOTE.md for scope rationale.
 */
export interface Translations {
  nav: {
    about: string;
    industries: string;
    services: string;
    platform: string;
    contact: string;
    platformPreview: string;
    requestQuote: string;
  };
  footer: {
    companyHeading: string;
    platformHeading: string;
    officesHeading: string;
    tagline: string;
    rights: string;
  };
  common: {
    learnMore: string;
    contactSales: string;
    bookMeeting: string;
  };
}
