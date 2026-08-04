import { Link } from "react-router-dom";
import {
  ArrowRight, LayoutDashboard, Users, ShoppingBag, Package, Globe, Sparkles,
  Factory, FileText, BookOpen, BarChart3, Network, Workflow, LineChart, Bot, Inbox,
} from "lucide-react";
import { Section, SectionHeading } from "../../components/site/SiteUI";

// Vision pillars — grounded in ETA-Blueprint 01-BUSINESS/{Mission,Vision,Value Proposition}.md.
// Framed explicitly as direction, not a claimed operating capability today — see "Available Now" below.
const visionPillars = [
  { icon: Network, title: "Supplier Intelligence", description: "A structured, continuously maintained record of supplier qualification, classification, and relationship history." },
  { icon: Workflow, title: "Procurement Workflow", description: "Centralized RFQ, quotation, and purchase-order tracking in place of spreadsheets and email threads." },
  { icon: LineChart, title: "Data-Driven Sourcing", description: "Sourcing and commercial decisions informed by supplier performance history and procurement records." },
  { icon: Bot, title: "AI-Assisted Decision Support", description: "AI that assists procurement and engineering judgment rather than replacing it — the long-term direction, not a built feature today." },
];

const liveModules = [
  { icon: LayoutDashboard, title: "Dashboard", description: "Unified view of pipeline, purchase orders, suppliers, and AI task activity.", href: "/dashboard" },
  { icon: Users, title: "CRM", description: "Companies, contacts, and sales pipeline management.", href: "/crm/companies" },
  { icon: Inbox, title: "Customer Inquiries", description: "First MVP workflow for customer requests moving toward a formal RFQ.", href: "/crm/inquiries" },
  { icon: ShoppingBag, title: "Procurement", description: "Purchase order tracking with line-item detail.", href: "/procurement/orders" },
  { icon: Package, title: "Supplier Intelligence", description: "Supplier master data, qualification, classification, and relationship history.", href: "/suppliers" },
  { icon: Globe, title: "Supplier Portal", description: "Supplier onboarding pipeline and quote tracking.", href: "/supplier-portal" },
  { icon: Sparkles, title: "AI Platform", description: "AI model registry and task activity monitoring.", href: "/ai-platform" },
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
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-copper-400 mb-3">ETA Platform</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            One enterprise ecosystem for industrial procurement
          </h1>
          <p className="mt-5 text-lg text-surface-300">
            CRM, Procurement, Supplier Portal, Manufacturer Portal, AI Assistant, Dashboard, Analytics,
            Document Intelligence, and Knowledge Base — integrated into a single platform.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-copper-500 px-5 h-11 text-sm font-semibold text-white hover:bg-copper-600 transition-colors"
          >
            Open Platform Preview <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Why We're Building This" title="Turning 12+ years of sourcing discipline into software" description="ETA's trading business runs today on specification review, verified channels, and declared terms. The platform is where that discipline becomes structured, searchable, and — over time — assisted by AI." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visionPillars.map((item) => (
            <div key={item.title} className="rounded-2xl border border-surface-200 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
                <item.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-surface-900">{item.title}</h3>
              <p className="mt-1.5 text-sm text-surface-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-50">
        <SectionHeading eyebrow="Available Now" title="Live in the current build" description="Sprint 1 — MOD-1 Supplier Intelligence, running on mock data pending backend integration." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liveModules.map((mod) => (
            <Link
              key={mod.title}
              to={mod.href}
              className="group rounded-2xl border border-surface-200 p-6 hover:border-copper-300 hover:shadow-soft transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
                <mod.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-surface-900">{mod.title}</h3>
              <p className="mt-1.5 text-sm text-surface-500">{mod.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-copper-600 group-hover:text-copper-700">
                Open module <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Coming Next" title="Planned platform modules" description="Not yet built — sequenced after Supplier Intelligence per the current sprint plan." />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {upcomingModules.map((mod) => (
            <div key={mod.title} className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-surface-300 p-5 text-center">
              <mod.icon size={20} className="text-surface-400" />
              <span className="text-xs font-medium text-surface-500">{mod.title}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
