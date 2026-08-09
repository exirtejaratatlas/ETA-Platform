import { Link } from "react-router-dom";
import {
  ArrowRight,
  Factory,
  Wrench,
  Globe2,
  Sparkles,
  ShieldCheck,
  Network,
  BookOpen,
  Handshake,
  Cpu,
  LayoutDashboard,
  Users,
  Package,
  Bot,
  BarChart3,
  FileText,
} from "lucide-react";
import { Section, SectionHeading, Pillar, ChipList } from "../../components/site/SiteUI";
import { CTABand } from "../../components/site/CTABand";

const whatWeDo = [
  { icon: Factory, title: "Industrial Procurement", description: "Complete procurement management for industrial organizations." },
  { icon: Wrench, title: "Engineering Support", description: "Technical evaluation and equipment selection." },
  { icon: Globe2, title: "Global Sourcing", description: "Reliable manufacturers and suppliers worldwide." },
  { icon: Sparkles, title: "AI Procurement Platform", description: "Enterprise software designed for intelligent procurement." },
];

const industries = ["Oil & Gas", "Petrochemical", "Steel", "Industrial Equipment"];

const credentials = [
  { value: "12+ Years", label: "Industrial supply & trading experience" },
  { value: "2", label: "Independent business lines" },
  { value: "2", label: "Offices — Tehran & U.A.E." },
  { value: "10 days – 3 mo", label: "Declared delivery window" },
];

const platformModules = [
  { icon: Users, label: "CRM" },
  { icon: Package, label: "Procurement" },
  { icon: Network, label: "Supplier Portal" },
  { icon: Factory, label: "Manufacturer Portal" },
  { icon: Bot, label: "AI Assistant" },
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BarChart3, label: "Analytics" },
  { icon: FileText, label: "Document Intelligence" },
  { icon: BookOpen, label: "Knowledge Base" },
];

const whyEta = [
  { icon: Wrench, title: "Engineering Driven" },
  { icon: Cpu, title: "AI Native" },
  { icon: ShieldCheck, title: "Enterprise Ready" },
  { icon: Globe2, title: "Trusted Global Network" },
  { icon: BookOpen, title: "Knowledge Based" },
  { icon: Handshake, title: "Long-Term Partnership" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-display-sm sm:text-display lg:text-display-lg font-semibold text-white">
              Engineering Intelligence.
              <br />
              Enterprise Procurement.
              <br />
              <span className="text-copper-400">Powered by AI.</span>
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-surface-300">
              ETA transforms industrial procurement by combining engineering expertise, global sourcing,
              supplier intelligence, and artificial intelligence into one enterprise ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-copper-600 px-5 h-11 text-body-sm font-semibold text-white hover:bg-copper-700 transition-colors shadow-glow-copper"
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link
                to="/platform"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 h-11 text-body-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Platform Vision
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {credentials.map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-semibold text-copper-400 sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-body-sm text-surface-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About ETA */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading eyebrow="About ETA" title="A supply partner measured by specification, not by promises" />
            <p className="mt-4 text-surface-600">
              Exir Tejarat Atlas draws on more than 12 years of experience in industrial supply and
              international trading, operating two independent desks — industrial equipment and steel sheet —
              from offices in Tehran and the United Arab Emirates.
            </p>
            <p className="mt-3 text-surface-600">
              We are a sourcing house, not a manufacturer: our value is knowing which mill or maker to
              approach, what to verify before an order is placed, and what documentation has to travel with
              the goods.
            </p>
            <Link to="/about" className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-semibold text-copper-600 hover:text-copper-700">
              Learn about ETA <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-xl border border-surface-200 bg-surface-50 p-6 shadow-soft">
            <p className="text-caption font-semibold uppercase text-surface-500 mb-3">Our expertise combines</p>
            <ChipList items={["Engineering", "Procurement", "Global Sourcing", "Enterprise Software", "Artificial Intelligence"]} />
          </div>
        </div>
      </Section>

      {/* What We Do */}
      <Section className="bg-surface-50">
        <SectionHeading eyebrow="What We Do" title="Four capabilities, one procurement ecosystem" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
          {whatWeDo.map((item) => (
            <Pillar key={item.title} icon={<item.icon size={20} />} title={item.title} description={item.description} />
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section>
        <SectionHeading eyebrow="Industries" title="We proudly serve" />
        <div className="mt-6">
          <ChipList items={industries} />
        </div>
        <Link to="/industries" className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-semibold text-copper-600 hover:text-copper-700">
          View industries in detail <ArrowRight size={16} />
        </Link>
      </Section>

      {/* Platform Vision — future-vision framing per D4 (ETA-Blueprint/13-DECISIONS/
          ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md): no present-tense claims
          about live platform capability. */}
      <Section className="bg-surface-900">
        <SectionHeading light eyebrow="Platform Vision" title="The ETA Platform we're building" description="CRM, Procurement, Supplier Portal, Manufacturer Portal, AI Assistant, Dashboard, Analytics, Document Intelligence, and Knowledge Base — planned to come together as one platform." />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {platformModules.map((mod) => (
            <div key={mod.label} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <mod.icon size={20} className="text-copper-400" />
              <span className="text-caption font-medium text-surface-200">{mod.label}</span>
            </div>
          ))}
        </div>
        <Link to="/platform" className="mt-8 inline-flex items-center gap-1.5 text-body-sm font-semibold text-copper-400 hover:text-copper-300">
          See the Platform Vision <ArrowRight size={16} />
        </Link>
      </Section>

      {/* Why ETA */}
      <Section>
        <SectionHeading eyebrow="Why ETA" title="Built for industrial-grade trust" align="center" />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {whyEta.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper-50 text-copper-600">
                <item.icon size={20} />
              </div>
              <p className="text-component-title sm:text-h4 font-semibold text-surface-800">{item.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-surface-50">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 animate-fade-in-up">
          <div className="rounded-xl border border-surface-200 bg-white p-8 shadow-soft">
            <p className="text-caption font-semibold uppercase text-copper-400 mb-2">Mission</p>
            <p className="text-body-lg text-surface-800">
              Helping industrial organizations procure faster, smarter, and with greater confidence.
            </p>
          </div>
          <div className="rounded-xl border border-surface-200 bg-white p-8 shadow-soft">
            <p className="text-caption font-semibold uppercase text-copper-400 mb-2">Vision</p>
            <p className="text-body-lg text-surface-800">
              To become the leading AI-native Enterprise Procurement Ecosystem across the Middle East.
            </p>
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-surface-900">
        <CTABand
          fullWidth
          heading="Exir Tejarat Atlas"
          description="Industrial Procurement · Engineering · Artificial Intelligence"
          primaryCta={{ label: "Request a Quote", to: "/contact" }}
          secondaryCtas={[
            { label: "Contact Sales", to: "/contact" },
            { label: "Book a Meeting", to: "/contact" },
          ]}
        />
      </Section>
    </div>
  );
}
