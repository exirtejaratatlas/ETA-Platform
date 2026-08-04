import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Globe2, Network, Cpu, Sparkles, MapPin, Building2 } from "lucide-react";
import { Section, SectionHeading, ChipList } from "../../components/site/SiteUI";

// Verified sectors only — see docs/delivery/CONTENT-SOURCE-MAP.md
const industries = ["Oil & Gas", "Petrochemical", "Steel", "Industrial Equipment"];

const coreServices = [
  "Industrial Procurement", "Equipment Supply", "Steel Trading",
  "Supplier Network", "Supply Chain Support",
];

const expertise = [
  { icon: Wrench, title: "Engineering Expertise" },
  { icon: Globe2, title: "Global Procurement" },
  { icon: Network, title: "Supplier Intelligence" },
  { icon: Cpu, title: "Enterprise Software" },
  { icon: Sparkles, title: "Artificial Intelligence" },
];

// "Six reasons buyers keep the file with us" — Exir Tejarat Atlas Corporate Catalogue (Edition 2026), p.5.
const capability = [
  { title: "Two channels, one enquiry", description: "We buy steel through both the commodity exchange and the open market, so tonnage doesn't dictate whether we can help. You send one enquiry, not two." },
  { title: "Positioned on both sides of the corridor", description: "A head office in Tehran and a second office in the United Arab Emirates give practical options on sourcing route, settlement, and logistics." },
  { title: "Specification handled properly", description: "Equipment enquiries are reviewed against tags, materials and datasheets before we quote. Ambiguity is raised before pricing, not after." },
  { title: "Payment terms that fit the order", description: "We work on letter of credit and on cash. The instrument is agreed at quotation stage, with the commercial consequences explained openly." },
  { title: "Lead times we will state in writing", description: "Our delivery window runs from 10 days to 3 months depending on grade, origin and channel. We confirm which end of that range applies before you commit." },
  { title: "Two desks that stay separate", description: "Equipment and steel are quoted by different people against different disciplines. Nothing is sold to you by someone learning the product on your order." },
];

export default function About() {
  return (
    <div>
      <section className="bg-surface-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-copper-400 mb-3">About ETA</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Exir Tejarat Atlas (ETA)
          </h1>
          <p className="mt-5 text-lg text-surface-300">
            An industrial procurement, engineering, and technology company specializing in supplying
            equipment, materials, and intelligent procurement solutions for heavy industries.
          </p>
        </div>
      </section>

      {/* Company Background */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4 text-surface-600">
            <SectionHeading eyebrow="Company Background" title="A supply partner measured by specification, not by promises" />
            <p>
              Exir Tejarat Atlas is an industrial sourcing and supply company serving the oil, gas,
              petrochemical, and steel sectors. We exist to close the distance between a plant's technical
              requirement and the manufacturer who can meet it — accurately, on declared terms, and within a
              lead time we are willing to put in writing.
            </p>
            <p>
              We operate as two separate desks under one company: an equipment desk handling rotating,
              static, flow-control, and instrumentation packages for process plants, and a steel desk trading
              sheet and coil through both the commodity exchange and the open market. The two lines share our
              commercial discipline and our offices — but never a specification.
            </p>
            <p>
              With a head office in Tehran and a second office in the United Arab Emirates, we are positioned
              on both sides of the region's main supply corridor — giving clients practical flexibility in
              sourcing, payment instrument, and routing.
            </p>
          </div>
          <div className="rounded-2xl border border-surface-200 bg-surface-50 p-6 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper-50 text-copper-600 shrink-0">
                <Building2 size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-surface-900">Tehran — Head Office</p>
                <p className="text-xs text-surface-500 mt-0.5">Dastgardi Street, Building 70, Unit 5</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper-50 text-copper-600 shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-surface-900">United Arab Emirates</p>
                <p className="text-xs text-surface-500 mt-0.5">No. 104, Al Makhazan Stores, Investment Park 2</p>
              </div>
            </div>
            {expertise.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper-50 text-copper-600 shrink-0">
                  <item.icon size={16} />
                </div>
                <span className="text-sm font-medium text-surface-800">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience — company-level track record. No individual founder biography is published; see
          docs/delivery/CONTENT-SOURCE-MAP.md for why. */}
      <Section className="bg-surface-50">
        <SectionHeading eyebrow="Experience" title="12+ years behind every quotation" />
        <div className="mt-6 max-w-3xl space-y-4 text-surface-600">
          <p>
            Exir Tejarat Atlas draws on more than 12 years of experience in industrial supply and
            international trading. That experience shows up as a working discipline, not a slogan: every
            equipment enquiry is checked against tags, materials, and datasheets before we quote, and every
            steel order is priced against a channel — commodity exchange or open market — chosen for its
            tonnage and timing.
          </p>
          <p>
            We are candid about what we are: a sourcing house, not a manufacturer. Our value is in knowing
            which mill or maker to approach, what to verify before an order is placed, and what documentation
            has to travel with the goods. Where we cannot supply, we say so early.
          </p>
        </div>
      </Section>

      {/* Industrial Expertise */}
      <Section>
        <SectionHeading eyebrow="Industrial Expertise" title="Two business lines, one commercial discipline" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-surface-200 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-copper-600 mb-2">Business Line 01</p>
            <h3 className="text-lg font-semibold text-surface-900">Industrial Equipment</h3>
            <p className="mt-2 text-sm text-surface-500">
              From rotating machinery to the final control element, sourced for refineries, gas plants,
              petrochemical units, and steel mills.
            </p>
            <div className="mt-4">
              <ChipList items={["Rotating Equipment", "Static Equipment", "Flow Control", "Control & Automation", "Instrumentation", "Handling & Process Media"]} />
            </div>
          </div>
          <div className="rounded-2xl border border-surface-200 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-copper-600 mb-2">Business Line 02</p>
            <h3 className="text-lg font-semibold text-surface-900">Steel Sheet</h3>
            <p className="mt-2 text-sm text-surface-500">
              Sheet and coil in the coating, grade, and tolerance a production line calls for, sourced from
              Iranian and Chinese mills.
            </p>
            <div className="mt-4">
              <ChipList items={["Galvanized Sheet", "Oiled & Black Sheet", "Tin-Coated Sheet", "Galvalume / Aluzinc", "Stainless Steel Sheet"]} />
            </div>
          </div>
        </div>
      </Section>

      {/* Engineering & Commercial Capability */}
      <Section className="bg-surface-50">
        <SectionHeading eyebrow="Engineering & Commercial Capability" title="Six reasons buyers keep the file with us" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capability.map((item) => (
            <div key={item.title} className="rounded-2xl border border-surface-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-surface-900">{item.title}</h3>
              <p className="mt-2 text-sm text-surface-500">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-surface-900 px-8 py-8 text-center max-w-3xl mx-auto">
          <p className="text-lg text-white">
            "We would rather lose an enquiry than win it on a specification we cannot honour.{" "}
            <span className="text-copper-400 font-medium">That is the whole basis of the relationship.</span>"
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-surface-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-copper-600 mb-2">Mission</p>
            <p className="text-lg text-surface-800">
              Helping industrial organizations procure faster, smarter, and with greater confidence through
              engineering expertise, enterprise knowledge, and intelligent automation.
            </p>
          </div>
          <div className="rounded-2xl border border-surface-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-copper-600 mb-2">Vision</p>
            <p className="text-lg text-surface-800">
              To become the leading AI-native Enterprise Procurement Ecosystem connecting industrial
              organizations, suppliers, manufacturers, engineering knowledge, and artificial intelligence.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading eyebrow="Industries We Serve" title="Mission-critical sectors" />
            <div className="mt-5">
              <ChipList items={industries} />
            </div>
            <Link to="/industries" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-copper-600 hover:text-copper-700">
              View industries in detail <ArrowRight size={14} />
            </Link>
          </div>
          <div>
            <SectionHeading eyebrow="Core Services" title="What ETA delivers" />
            <div className="mt-5">
              <ChipList items={coreServices} />
            </div>
            <Link to="/services" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-copper-600 hover:text-copper-700">
              View services in detail <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-surface-900">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-white">Send us the specification.</h2>
          <p className="mt-2 text-surface-300">We will come back with questions, then with a price.</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center rounded-lg bg-copper-500 px-5 h-11 text-sm font-semibold text-white hover:bg-copper-600 transition-colors">
              Request a Quote
            </Link>
            <Link to="/contact" className="inline-flex items-center rounded-lg border border-white/20 px-5 h-11 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
