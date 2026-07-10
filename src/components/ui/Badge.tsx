import { type ReactNode } from "react";

type Tone = "neutral" | "brand" | "success" | "warning" | "error" | "gold" | "teal";

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-100 text-surface-600",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  error: "bg-red-50 text-red-700",
  gold: "bg-gold-50 text-gold-700",
  teal: "bg-teal-50 text-teal-700",
};

const dotColors: Record<Tone, string> = {
  neutral: "bg-surface-400",
  brand: "bg-brand-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  gold: "bg-gold-500",
  teal: "bg-teal-500",
};

export function Badge({ tone = "neutral", children, className = "", dot = false }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors[tone]}`} />}
      {children}
    </span>
  );
}
