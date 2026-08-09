import type { Translations } from "./types";

/**
 * Placeholder only — no Persian translation has been authored or approved.
 * Every value below is a literal placeholder marker, not a translation.
 *
 * Per ETA-DESIGN-SYSTEM.md §8 "Track B" and CONTENT-SOURCE-MAP.md's
 * "Task 5 (RTL) note": Persian copy must be sourced from the approved
 * `Exir-Tejarat-Atlas-Catalogue-FA.pdf` (source S9), mapped string-by-string.
 * That mapping has not been done. Do not fill these in without that source.
 */
const OPEN_DECISION = "Open Decision Required";

export const fa: Translations = {
  nav: {
    about: OPEN_DECISION,
    industries: OPEN_DECISION,
    services: OPEN_DECISION,
    platform: OPEN_DECISION,
    contact: OPEN_DECISION,
    platformPreview: OPEN_DECISION,
    requestQuote: OPEN_DECISION,
  },
  footer: {
    companyHeading: OPEN_DECISION,
    platformHeading: OPEN_DECISION,
    officesHeading: OPEN_DECISION,
    tagline: OPEN_DECISION,
    rights: OPEN_DECISION,
  },
  common: {
    learnMore: OPEN_DECISION,
    contactSales: OPEN_DECISION,
    bookMeeting: OPEN_DECISION,
  },
};
