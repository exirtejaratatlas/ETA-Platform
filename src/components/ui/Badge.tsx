import { type ReactNode } from "react";

type Tone = "neutral" | "copper" | "info" | "success" | "warning" | "error";

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-100 text-surface-600",
  copper: "bg-copper-50 text-copper-700",
  info: "bg-info/10 text-info-dark",
  success: "bg-success/10 text-success-dark",
  warning: "bg-warning/10 text-warning-dark",
  error: "bg-error/10 text-error-dark",
};

const dotColors: Record<Tone, string> = {
  neutral: "bg-surface-400",
  copper: "bg-copper-500",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
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
