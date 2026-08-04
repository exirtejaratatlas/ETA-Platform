interface ProgressProps {
  value: number;
  max?: number;
  tone?: "copper" | "info" | "success" | "warning" | "error" | "neutral";
  size?: "sm" | "md";
  showLabel?: boolean;
}

const toneClasses = {
  copper: "bg-copper-500",
  info: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  neutral: "bg-surface-400",
};

export function Progress({ value, max = 100, tone = "copper", size = "md", showLabel = false }: ProgressProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      <div className={`w-full ${size === "sm" ? "h-1.5" : "h-2"} rounded-full bg-surface-200 overflow-hidden`}>
        <div
          className={`h-full rounded-full ${toneClasses[tone]} transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && <span className="text-xs text-surface-500 mt-1 block">{Math.round(pct)}%</span>}
    </div>
  );
}
