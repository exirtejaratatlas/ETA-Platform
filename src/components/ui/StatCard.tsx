import { type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  tone?: "copper" | "info" | "neutral" | "success" | "warning";
  /** vs. a prior period, e.g. "vs. last quarter" -- Components.md KPI Components: Comparison. */
  comparison?: string;
  /** e.g. "Last 30 days" -- Components.md KPI Components: Time Period. */
  period?: string;
}

const toneClasses = {
  copper: "bg-copper-50 text-copper-600",
  info: "bg-info/10 text-info-dark",
  neutral: "bg-surface-100 text-surface-600",
  success: "bg-success/10 text-success-dark",
  warning: "bg-warning/10 text-warning-dark",
};

export function StatCard({ label, value, icon, trend, tone = "copper", comparison, period }: StatCardProps) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-5 shadow-soft transition-all duration-200 hover:shadow-card hover:border-surface-300 animate-fade-in-up">
      <div className="flex items-center justify-between mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend.positive ? "text-success-dark" : "text-error-dark"}`}>
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-surface-900 tracking-tight">{value}</p>
      <p className="text-sm text-surface-500 mt-0.5">{label}</p>
      {(comparison || period) && (
        <p className="text-xs text-surface-400 mt-1.5">
          {comparison}
          {comparison && period ? " · " : ""}
          {period}
        </p>
      )}
    </div>
  );
}
