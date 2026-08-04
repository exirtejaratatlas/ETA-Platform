import { type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  tone?: "copper" | "info" | "neutral" | "success" | "warning";
}

const toneClasses = {
  copper: "bg-copper-50 text-copper-600",
  info: "bg-blue-50 text-blue-600",
  neutral: "bg-surface-100 text-surface-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
};

export function StatCard({ label, value, icon, trend, tone = "copper" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-soft transition-all duration-200 hover:shadow-card hover:border-surface-300 animate-fade-in-up">
      <div className="flex items-center justify-between mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend.positive ? "text-green-600" : "text-red-600"}`}>
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-surface-900 tracking-tight">{value}</p>
      <p className="text-sm text-surface-500 mt-0.5">{label}</p>
    </div>
  );
}
