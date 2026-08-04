import { type ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${light ? "text-copper-300" : "text-copper-600"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${light ? "text-white" : "text-surface-900"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-base ${light ? "text-surface-300" : "text-surface-500"}`}>{description}</p>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">{children}</div>
    </section>
  );
}

export function Pillar({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-soft">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-copper-50 text-copper-600 mb-4">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-surface-900">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-surface-500">{description}</p>}
    </div>
  );
}

export function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border border-surface-200 bg-surface-50 px-3 py-1.5 text-sm font-medium text-surface-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
