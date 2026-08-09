import { Link } from "react-router-dom";
import { Layers, ShieldCheck, TrendingUp, Store } from "lucide-react";
import { Section, SectionHeading, ChipList } from "../../components/site/SiteUI";
import { CTABand } from "../../components/site/CTABand";

// Business Line 02 content — verbatim from already-verified sources.
// See docs/delivery/CONTENT-SOURCE-MAP.md (S8 p.4 "Business Line 02") and
// src/pages/site/About.tsx / Services.tsx, which already carry this content.
const grades = [
  "Galvanized Sheet", "Oiled & Black Sheet", "Tin-Coated Sheet",
  "Galvalume / Aluzinc", "Stainless Steel Sheet",
];

const channels = [
  { icon: TrendingUp, title: "Commodity Exchange Channel", description: "Sheet and coil sourced through the commodity exchange, suited to standard tonnage and grades." },
  { icon: Store, title: "Open Market Channel", description: "Open-market sourcing for orders that fall outside standard exchange terms." },
];

export default function SteelTrading() {
  return (
    <div>
      <section className="bg-surface-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center animate-fade-in-up">
          <p className="text-caption font-semibold uppercase text-copper-400 mb-3">
            Steel Sheet Trading — Business Line 02
          </p>
          <h1 className="text-h2 sm:text-h1 font-semibold text-white">
            Sheet and coil in the grade a production line calls for
          </h1>
          <p className="mt-5 text-body-lg text-surface-300">
            Sourced from Iranian and Chinese mills, in the coating, grade, and tolerance the order requires.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading eyebrow="Grades & Coatings" title="What we trade" />
            <p className="mt-4 text-surface-600">
              Sheet and coil in the coating, grade, and tolerance a production line calls for, sourced from
              Iranian and Chinese mills.
            </p>
            <div className="mt-6">
              <ChipList items={grades} />
            </div>
          </div>
          <div className="rounded-xl border border-surface-200 bg-surface-50 p-6 shadow-soft">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
              <Layers size={20} />
            </div>
            <h3 className="text-component-title sm:text-h4 font-semibold text-surface-900">Two channels, one enquiry</h3>
            <p className="mt-2 text-body-sm text-surface-500">
              We buy steel through both the commodity exchange and the open market, so tonnage doesn't dictate
              whether we can help. You send one enquiry, not two.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface-50">
        <SectionHeading eyebrow="Sourcing Channels" title="Two distinct channels" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto animate-fade-in-up">
          {channels.map((ch) => (
            <div key={ch.title} className="rounded-xl border border-surface-200 bg-white p-6 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
                <ch.icon size={20} />
              </div>
              <h3 className="text-component-title sm:text-h4 font-semibold text-surface-900">{ch.title}</h3>
              <p className="mt-1.5 text-body-sm text-surface-500">{ch.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-xl border border-surface-200 p-8 max-w-3xl mx-auto text-center shadow-soft">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4 mx-auto">
            <ShieldCheck size={20} />
          </div>
          <h3 className="text-component-title sm:text-h4 font-semibold text-surface-900">Two desks that stay separate</h3>
          <p className="mt-2 text-body-sm text-surface-500">
            Equipment and steel are quoted by different people against different disciplines. Nothing is sold
            to you by someone learning the product on your order — see{" "}
            <Link to="/about" className="text-copper-600 font-medium hover:text-copper-700">About ETA</Link>{" "}
            for the full commercial discipline behind both desks.
          </p>
        </div>
      </Section>

      <Section className="bg-surface-900">
        <CTABand
          heading="Send us the specification."
          description="Grade, coating, tolerance, and tonnage — we'll come back with a channel and a price."
          primaryCta={{ label: "Request a Quote", to: "/contact", icon: true }}
        />
      </Section>
    </div>
  );
}
