import { Link } from "react-router-dom";
import { Building2, Globe2, HandCoins, Clock, Network, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "../../components/site/SiteUI";
import { CTABand } from "../../components/site/CTABand";

// Public positioning content — verbatim from already-verified sources (Services.tsx "Supplier Network",
// About.tsx "Six reasons buyers keep the file with us"). This page is distinct from the internal
// MOD-1 Supplier Intelligence module (src/pages/suppliers/) — see CR-001 in
// ETA-Blueprint/13-DECISIONS/DECISIONS.md: this is public supplier-network/positioning messaging,
// not the internal supplier database/dashboard.
const positioning = [
  { icon: Building2, title: "Tehran & U.A.E. Offices", description: "A head office in Tehran and a second office in the United Arab Emirates — practical options on sourcing route, settlement, and logistics." },
  { icon: Globe2, title: "Iran & China Sourcing Markets", description: "Positioned on both sides of the region's main supply corridor." },
  { icon: HandCoins, title: "Letter of Credit (LC) & Cash", description: "The payment instrument is agreed at quotation stage, with the commercial consequences explained openly." },
  { icon: Clock, title: "10 Days – 3 Month Delivery Window", description: "Declared per order, depending on grade, origin, and channel — confirmed before you commit." },
];

export default function SupplierNetwork() {
  return (
    <div>
      <section className="bg-surface-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center animate-fade-in-up">
          <p className="text-caption font-semibold uppercase text-copper-400 mb-3">Supplier Network</p>
          <h1 className="text-h2 sm:text-h1 font-semibold text-white">
            Positioned on both sides of the supply corridor
          </h1>
          <p className="mt-5 text-body-lg text-surface-300">
            Sourcing and settlement options that fit the order, not the other way around.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="How ETA Is Positioned" title="One enquiry, options on both sides of the corridor" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 animate-fade-in-up">
          {positioning.map((item) => (
            <div key={item.title} className="rounded-xl border border-surface-200 p-6 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
                <item.icon size={20} />
              </div>
              <h3 className="text-component-title sm:text-h4 font-semibold text-surface-900">{item.title}</h3>
              <p className="mt-1.5 text-body-sm text-surface-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-50">
        <div className="rounded-xl border border-surface-200 bg-white p-8 max-w-3xl mx-auto text-center shadow-soft">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4 mx-auto">
            <Network size={20} />
          </div>
          <h3 className="text-component-title sm:text-h4 font-semibold text-surface-900">A structured network, not a cold list</h3>
          <p className="mt-2 text-body-sm text-surface-500">
            Every mill and manufacturer in ETA's network is reviewed against the same specification discipline
            described in <Link to="/about" className="text-copper-600 font-medium hover:text-copper-700">About ETA</Link>{" "}
            — before a supplier reaches your quotation, not after.
          </p>
        </div>
      </Section>

      {/* Vision framing only — explicitly not a claimed operating capability today,
          mirrors the same "Available Now" vs. vision distinction already used on the Platform page. */}
      <Section>
        <div className="rounded-xl border border-dashed border-surface-300 p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper-50 text-copper-600 shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-component-title sm:text-h4 font-semibold text-surface-900">Software-assisted supplier intelligence — direction, not a built feature today</p>
              <p className="mt-1.5 text-body-sm text-surface-500">
                ETA's long-term direction is a structured, continuously maintained record of supplier
                qualification and relationship history, described on the{" "}
                <Link to="/platform" className="text-copper-600 font-medium hover:text-copper-700">ETA Platform</Link> page.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface-900">
        <CTABand
          heading="Sourcing an order?"
          description="Tell us the specification — we'll tell you which side of the corridor it comes from."
          primaryCta={{ label: "Request a Quote", to: "/contact", icon: true }}
        />
      </Section>
    </div>
  );
}
