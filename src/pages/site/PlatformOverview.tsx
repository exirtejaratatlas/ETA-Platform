import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Factory, FileText, BookOpen, BarChart3, Network, Workflow, LineChart, Bot,
} from "lucide-react";
import { Section, SectionHeading } from "../../components/site/SiteUI";

// Vision pillars — grounded in ETA-Blueprint 01-BUSINESS/{Mission,Vision,Value Proposition}.md.
// Framed explicitly as direction, not a claimed operating capability today.
const visionPillars = [
  { icon: Network, title: "Supplier Intelligence", description: "A structured, continuously maintained record of supplier qualification, classification, and relationship history." },
  { icon: Workflow, title: "Procurement Workflow", description: "Centralized RFQ, quotation, and purchase-order tracking in place of spreadsheets and email threads." },
  { icon: LineChart, title: "Data-Driven Sourcing", description: "Sourcing and commercial decisions informed by supplier performance history and procurement records." },
  { icon: Bot, title: "AI-Assisted Decision Support", description: "AI that assists procurement and engineering judgment rather than replacing it — the long-term direction, not a built feature today." },
];

const upcomingModules = [
  { icon: Factory, title: "Manufacturer Portal" },
  { icon: FileText, title: "Document Intelligence" },
  { icon: BookOpen, title: "Enterprise Knowledge Base" },
  { icon: BarChart3, title: "Business Analytics" },
];

export default function PlatformOverview() {
  return (
    <div>
      <section className="bg-surface-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center animate-fade-in-up">
          <p className="text-caption font-semibold uppercase text-copper-400 mb-3">ETA Platform</p>
          <h1 className="text-h2 sm:text-h1 font-semibold text-white">
            One enterprise ecosystem for industrial procurement
          </h1>
          <p className="mt-5 text-body-lg text-surface-300">
            CRM, Procurement, Supplier Portal, Manufacturer Portal, AI Assistant, Dashboard, Analytics,
            Document Intelligence, and Knowledge Base — planned to come together as one platform.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 h-11 text-body-sm font-semibold text-white">
              <Sparkles size={16} />
              Platform Vision
            </span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-copper-600 px-5 h-11 text-body-sm font-semibold text-white hover:bg-copper-700 transition-colors"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Why We're Building This" title="Turning 12+ years of sourcing discipline into software" description="ETA's trading business runs today on specification review, verified channels, and declared terms. The platform is where that discipline becomes structured, searchable, and — over time — assisted by AI." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
          {visionPillars.map((item) => (
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
        <SectionHeading eyebrow="Coming Next" title="Planned platform modules" description="Not yet built — sequenced after Supplier Intelligence per the current sprint plan. ETA's internal systems are in early development on mock data and are not yet publicly available." />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in-up">
          {upcomingModules.map((mod) => (
            <div key={mod.title} className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-surface-300 p-5 text-center">
              <mod.icon size={20} className="text-surface-400" />
              <span className="text-caption font-medium text-surface-500">{mod.title}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
