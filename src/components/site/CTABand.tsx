import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

interface CTABandLink {
  label: string;
  to: string;
}

interface CTABandProps {
  heading: string;
  description: string;
  primaryCta: CTABandLink & { icon?: boolean };
  secondaryCtas?: CTABandLink[];
  /** Home's band spans the full Section width; every other current usage constrains it to
   * max-w-3xl mx-auto. Preserves each page's existing, already-shipped width — not a new
   * spacing decision. */
  fullWidth?: boolean;
}

/**
 * Shared "final CTA band" pattern — previously duplicated verbatim across Home, About,
 * SteelTrading, and SupplierNetwork (ETA Website Phase 3.1 consolidation).
 *
 * Radius intentionally left at rounded-3xl (24px): Components.md's approved 12–16px range
 * is scoped to Cards, and a full-width promotional band is not a card. No Approved Blueprint
 * doc defines a band-specific radius, so the existing, already-consistent rounded-3xl is
 * preserved here rather than silently changed to rounded-xl. Flagged as Open Decision
 * Required in docs/delivery/SESSION-HANDOFF-WEBSITE-PHASE3-1.md for Blueprint to ratify.
 */
export function CTABand({ heading, description, primaryCta, secondaryCtas = [], fullWidth = false }: CTABandProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 px-8 py-12 text-center ${
        fullWidth ? "" : "max-w-3xl mx-auto"
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-white">{heading}</h2>
      <p className="mt-2 text-body text-surface-300">{description}</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button to={primaryCta.to} variant="cta" size="cta">
          {primaryCta.label}
          {primaryCta.icon && <ArrowRight size={16} />}
        </Button>
        {secondaryCtas.map((cta) => (
          <Button key={cta.label} to={cta.to} variant="cta-outline" size="cta">
            {cta.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
