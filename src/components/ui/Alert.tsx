import { type ReactNode } from "react";
import { CheckCircle2, TriangleAlert, XCircle, Info, X } from "lucide-react";

type Tone = "success" | "warning" | "error" | "info";

interface AlertProps {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const toneConfig: Record<Tone, { classes: string; icon: typeof CheckCircle2 }> = {
  success: { classes: "bg-success/10 border-success/20 text-success-dark", icon: CheckCircle2 },
  warning: { classes: "bg-warning/10 border-warning/20 text-warning-dark", icon: TriangleAlert },
  error: { classes: "bg-error/10 border-error/20 text-error-dark", icon: XCircle },
  info: { classes: "bg-info/10 border-info/20 text-info-dark", icon: Info },
};

export function Alert({ tone = "info", title, children, dismissible = false, onDismiss, className = "" }: AlertProps) {
  const { classes, icon: Icon } = toneConfig[tone];

  return (
    <div role="alert" className={`flex gap-3 rounded-lg border p-4 text-sm ${classes} ${className}`}>
      <Icon size={18} className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium mb-0.5">{title}</p>}
        <div className="text-surface-700">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded p-0.5 hover:bg-surface-950/5 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
