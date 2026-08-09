import type { Translations } from "./types";

/**
 * Source: existing approved copy already live in SiteHeader.tsx / SiteFooter.tsx
 * (traced in docs/delivery/CONTENT-SOURCE-MAP.md). No new English strings invented —
 * this file only re-expresses already-approved chrome copy as translation keys.
 */
export const en: Translations = {
  nav: {
    about: "About",
    industries: "Industries",
    services: "Services",
    platform: "ETA Platform",
    contact: "Contact",
    platformPreview: "Platform Preview",
    requestQuote: "Request a Quote",
  },
  footer: {
    companyHeading: "Company",
    platformHeading: "ETA Platform",
    officesHeading: "Offices",
    tagline: "Industrial Procurement · Engineering · Artificial Intelligence",
    rights: "All Rights Reserved.",
  },
  common: {
    learnMore: "Learn more",
    contactSales: "Contact Sales",
    bookMeeting: "Book a Meeting",
  },
};
