import {
  Factory, Wrench, Layers, Network, Truck,
  ShieldCheck, HandCoins, Award, Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, ChipList } from "../../components/site/SiteUI";

// ETA's actual current scope — Exir Tejarat Atlas Corporate Catalogue (Edition 2026).
// See docs/delivery/CONTENT-SOURCE-MAP.md. AI/software capability is described separately
// on the Platform page as vision, not listed here as an operating service.
const services = [
  {
    icon: Factory,
    title: "Industrial Procurement",
    description: "From enquiry and technical clarification through quotation, order confirmation, and tracked delivery — the same six-stage process for every order.",
    items: ["Enquiry & Scope Review", "Technical Clarification", "Quotation & Commercial Terms", "Order Confirmation", "Procurement Tracking", "Documentation & Delivery"],
  },
  {
    icon: Wrench,
    title: "Equipment Supply",
    description: "Business Line 01 — rotating, static, flow-control and instrumentation packages for process plants.",
    items: ["Rotating Equipment", "Static Equipment", "Flow Control", "Control & Automation", "Instrumentation", "Handling & Process Media"],
  },
  {
    icon: Layers,
    title: "Steel Trading",
    description: "Business Line 02 — sheet and coil sourced from Iranian and Chinese mills through two distinct channels.",
    items: ["Galvanized, Oiled & Black Sheet", "Tin-Coated, Galvalume/Aluzinc & Stainless Grades", "Commodity Exchange Channel", "Open Market Channel"],
  },
  {
    icon: Network,
    title: "Supplier Network",
    description: "Positioned on both sides of the region's main supply corridor, with sourcing and settlement options that fit the order.",
    items: ["Tehran & U.A.E. Offices", "Iran & China Sourcing Markets", "Letter of Credit (LC) & Cash", "10 Days – 3 Month Delivery Window"],
  },
  {
    icon: Truck,
    title: "Supply Chain Support",
    description: "Procurement, production and inspection tracked through to documented delivery.",
    items: ["Mill & Manufacturer Certification", "Origin & Shipping Documents", "Inspection Coordination", "Documentation & Logistics"],
  },
];

const commitment = [
  { icon: ShieldCheck, title: "Specification Integrity" },
  { icon: HandCoins, title: "Payment Terms That Fit the Order" },
  { icon: Award, title: "Declared Lead Times" },
  { icon: Handshake, title: "Long-Term Partnership" },
];

export default function Services() {
  return (
    <div>
      <section className="bg-surface-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-copper-400 mb-3">Services</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Engineering-driven procurement, end to end
          </h1>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {services.map((svc) => (
            <div key={svc.title} className="rounded-2xl border border-surface-200 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
                <svc.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-surface-900">{svc.title}</h3>
              <p className="mt-1.5 text-sm text-surface-500">{svc.description}</p>
              <div className="mt-4">
                <ChipList items={svc.items} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-900">
        <SectionHeading light eyebrow="Our Commitment" title="Every service is delivered with four principles" align="center" />
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {commitment.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-copper-400">
                <item.icon size={20} />
              </div>
              <p className="text-sm font-medium text-white">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper-400 hover:text-copper-300">
            Talk to our team <ArrowRight size={14} />
          </Link>
        </div>
      </Section>
    </div>
  );
}
