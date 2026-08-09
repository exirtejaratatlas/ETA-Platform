import {
  Factory, Flame, Beaker, Wrench,
} from "lucide-react";
import { Section, SectionHeading, ChipList } from "../../components/site/SiteUI";

// Verified sectors only — Exir Tejarat Atlas Corporate Catalogue (Edition 2026), "Company Record":
// "Sectors Served: Oil · Gas · Petrochemical · Steel · Metals trading". See docs/delivery/CONTENT-SOURCE-MAP.md.
const industries = [
  {
    icon: Flame,
    title: "Oil & Gas",
    intro: "Supporting upstream, midstream, and downstream operations through:",
    items: ["Rotating Equipment", "Static Equipment", "Flow Control", "Instrumentation", "Control & Automation"],
  },
  {
    icon: Beaker,
    title: "Petrochemical",
    intro: "Supplying process plants and turnaround projects with:",
    items: ["Pumps & Compressors", "Storage Tanks & Pressure Vessels", "Control Valves", "Process Chemicals & Catalysts"],
  },
  {
    icon: Factory,
    title: "Steel",
    intro: "Sourcing sheet and coil, and equipment for steel mills, through:",
    items: ["Galvanized, Oiled & Black Sheet", "Tin-Coated, Galvalume/Aluzinc & Stainless Grades", "Rolling Mill & Process Equipment"],
  },
  {
    icon: Wrench,
    title: "Industrial Equipment",
    intro: "Our core equipment supply line, covering:",
    items: ["Rotating Equipment", "Static Equipment", "Flow Control & Instrumentation", "Control & Automation", "Handling & Process Media"],
  },
];

export default function Industries() {
  return (
    <div>
      <section className="bg-surface-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center animate-fade-in-up">
          <p className="text-caption font-semibold uppercase text-copper-400 mb-3">Industries</p>
          <h1 className="text-h2 sm:text-h1 font-semibold text-white">
            Mission-critical industries we serve
          </h1>
          <p className="mt-5 text-body-lg text-surface-300">
            ETA delivers procurement, engineering, and sourcing solutions for mission-critical industries
            where reliability, technical accuracy, and supplier quality are essential.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 animate-fade-in-up">
          {industries.map((ind) => (
            <div key={ind.title} className="rounded-xl border border-surface-200 p-6 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
                <ind.icon size={20} />
              </div>
              <h3 className="text-component-title sm:text-h4 font-semibold text-surface-900">{ind.title}</h3>
              <p className="mt-2 text-body-sm text-surface-500">{ind.intro}</p>
              {ind.items.length > 0 && (
                <div className="mt-3">
                  <ChipList items={ind.items} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-50">
        <SectionHeading eyebrow="Future Expansion" title="A growing industrial footprint" align="center" />
        <p className="mt-4 max-w-2xl mx-auto text-center text-surface-600">
          ETA continues expanding its expertise into emerging industrial sectors while strengthening its
          position as an AI-powered enterprise procurement ecosystem serving regional and international
          markets.
        </p>
      </Section>
    </div>
  );
}
