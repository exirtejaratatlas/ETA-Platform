import { useState, type FormEvent } from "react";
import { CircleCheck as CheckCircle2, MapPin, Phone } from "lucide-react";
import { Section, SectionHeading } from "../../components/site/SiteUI";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

const interests = [
  "Industrial Procurement",
  "Engineering Support",
  "Global Sourcing",
  "Supplier Intelligence",
  "ETA Platform / Software",
  "Other",
];

const offices = [
  {
    label: "Tehran — Head Office",
    address: "Dastgardi Street, Building 70, Unit 5, Tehran, Islamic Republic of Iran",
    phone: "+98 912 733 8131",
  },
  {
    label: "United Arab Emirates",
    address: "No. 104, Al Makhazan Stores, Investment Park 2, United Arab Emirates",
    phone: "+971 444 58 394",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No CRM/email backend wired yet (Sprint 1 scope) — UI-only acknowledgment for now.
    setSubmitted(true);
  }

  return (
    <div>
      <section className="bg-surface-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-copper-400 mb-3">Contact</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Exir Tejarat Atlas</h1>
          <p className="mt-4 text-lg text-surface-300">
            Industrial Procurement &middot; Engineering &middot; Artificial Intelligence
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Get in Touch" title="Request a quote, or start a conversation" />
            <p className="mt-4 text-surface-600">
              Tell us about your procurement, engineering, or sourcing need. Our team responds to every
              inquiry with technical accuracy and commercial transparency.
            </p>
            <div className="mt-8 space-y-3">
              {["Request a Quote", "Contact Sales", "Book a Meeting"].map((label) => (
                <div key={label} className="flex items-center gap-2 text-sm text-surface-700">
                  <CheckCircle2 size={16} className="text-copper-500" />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-5 border-t border-surface-200 pt-6">
              {offices.map((office) => (
                <div key={office.label}>
                  <p className="text-sm font-semibold text-surface-900">{office.label}</p>
                  <div className="mt-1.5 flex items-start gap-2 text-sm text-surface-600">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-surface-400" />
                    <span>{office.address}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-surface-600">
                    <Phone size={14} className="shrink-0 text-surface-400" />
                    <span>{office.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-surface-200 bg-surface-50 p-10 text-center">
                <CheckCircle2 size={32} className="mx-auto text-success mb-3" />
                <h3 className="text-lg font-semibold text-surface-900">Thank you</h3>
                <p className="mt-2 text-sm text-surface-500">
                  We've received your message. Our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-surface-200 p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" name="name" required placeholder="Jane Doe" />
                  <Input label="Company" name="company" required placeholder="Your organization" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Email" name="email" type="email" required placeholder="you@company.com" />
                  <Input label="Phone" name="phone" type="tel" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">Area of Interest</label>
                  <select
                    name="interest"
                    className="w-full h-9 rounded-lg border border-surface-300 bg-white px-3 text-sm text-surface-900 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 focus:outline-none"
                  >
                    {interests.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your procurement or engineering need..."
                    className="w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 placeholder:text-surface-400 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 focus:outline-none"
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
