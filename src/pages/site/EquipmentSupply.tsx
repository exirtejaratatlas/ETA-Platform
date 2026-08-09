import { Link } from "react-router-dom";
import {
  ArrowRight, Wrench, Factory, Gauge, Cpu, Package, Truck,
  ClipboardCheck, MessageSquare, FileCheck, Send, ClipboardList, FileText,
  ShieldCheck, HandCoins, Award, Handshake,
} from "lucide-react";
import { Section, SectionHeading, ChipList } from "../../components/site/SiteUI";

// Business Line 01 content — verbatim from already-verified sources.
// See docs/delivery/CONTENT-SOURCE-MAP.md (S8 p.3 "Business Line 01") and
// src/pages/site/About.tsx / Services.tsx, which already carry this content.
const categories = [
  { icon: Factory, title: "Rotating Equipment", description: "Pumps, compressors, motors, and gearboxes for process plants." },
  { icon: Package, title: "Static Equipment", description: "Storage tanks, pressure vessels, and process media handling." },
  { icon: Gauge, title: "Flow Control", description: "Control valves and flow-management components." },
  { icon: Cpu, title: "Control & Automation", description: "Automation systems for process and plant control." },
  { icon: Wrench, title: "Instrumentation", description: "Field and process instrumentation for plant measurement." },
  { icon: Truck, title: "Handling & Process Media", description: "Handling equipment and process media for plant operations." },
];

// Same six-stage process already published on the Services page — reused, not duplicated content.
const process = [
  { icon: MessageSquare, title: "Enquiry & Scope Review" },
  { icon: ClipboardCheck, title: "Technical Clarification" },
  { icon: FileText, title: "Quotation & Commercial Terms" },
  { icon: FileCheck, title: "Order Confirmation" },
  { icon: ClipboardList, title: "Procurement Tracking" },
  { icon: Send, title: "Documentation & Delivery" },
];

const commitment = [
  { icon: ShieldCheck, title: "Specification Integrity" },
  { icon: HandCoins, title: "Payment Terms That Fit the Order" },
  { icon: Award, title: "Declared Lead Times" },
  { icon: Handshake, title: "Long-Term Partnership" },
];

export default function EquipmentSupply() {
  return (
    <div>
      <section className="bg-surface-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center animate-fade-in-up">
          <p className="text-caption font-semibold uppercase text-copper-400 mb-3">
            Industrial Equipment Supply — Business Line 01
          </p>
          <h1 className="text-h2 sm:text-h1 font-semibold text-white">
            From rotating machinery to the final control element
          </h1>
          <p className="mt-5 text-body-lg text-surface-300">
            Equipment sourced for refineries, gas plants, petrochemical units, and steel mills —
            reviewed against tags, materials, and datasheets before we quote.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Equipment Categories" title="What we supply" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-surface-200 p-6 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
                <cat.icon size={20} />
              </div>
              <h3 className="text-component-title sm:text-h4 font-semibold text-surface-900">{cat.title}</h3>
              <p className="mt-1.5 text-body-sm text-surface-500">{cat.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-50">
        <SectionHeading eyebrow="How We Work" title="One process, every equipment order" align="center" />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {process.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-copper-600 border border-surface-200 relative">
                <step.icon size={20} />
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-surface-900 text-[10px] font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <p className="text-caption font-medium text-surface-700">{step.title}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Specification Handled Properly" title="Reviewed before we quote, not after" />
        <p className="mt-4 max-w-2xl text-surface-600">
          Equipment enquiries are reviewed against tags, materials and datasheets before we quote. Ambiguity is
          raised before pricing, not after — the same commercial discipline described in{" "}
          <Link to="/about" className="text-copper-600 font-medium hover:text-copper-700">About ETA</Link>.
        </p>
        <div className="mt-6">
          <ChipList items={["Rotating Equipment", "Static Equipment", "Flow Control", "Control & Automation", "Instrumentation", "Handling & Process Media"]} />
        </div>
      </Section>

      <Section className="bg-surface-900">
        <SectionHeading light eyebrow="Our Commitment" title="Every equipment order is delivered with four principles" align="center" />
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {commitment.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-copper-400">
                <item.icon size={20} />
              </div>
              <p className="text-component-title sm:text-h4 font-semibold text-white">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-copper-600 px-5 h-11 text-body-sm font-semibold text-white hover:bg-copper-700 transition-colors">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </div>
  );
}
