import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, TriangleAlert, XCircle, Info, X } from "lucide-react";

type Tone = "success" | "warning" | "error" | "info";

interface ToastItem {
  id: string;
  tone: Tone;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, tone?: Tone, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Toasts float over arbitrary page content, so the card stays a neutral white
// surface -- tone is carried by the icon color and a logical start-edge accent
// border (border-s-*) rather than a full background tint (unlike Alert, which
// sits inline in the page flow and can afford a tinted background).
const toneConfig: Record<Tone, { border: string; icon: typeof CheckCircle2; iconClass: string }> = {
  success: { border: "border-s-4 border-s-success", icon: CheckCircle2, iconClass: "text-success" },
  warning: { border: "border-s-4 border-s-warning", icon: TriangleAlert, iconClass: "text-warning" },
  error: { border: "border-s-4 border-s-error", icon: XCircle, iconClass: "text-error" },
  info: { border: "border-s-4 border-s-info", icon: Info, iconClass: "text-info" },
};

/**
 * Provides useToast() app-wide. Not mounted into main.tsx yet -- foundation
 * component only, per this pass's scope (no product-screen wiring).
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback(
    (message: string, tone: Tone = "info", durationMs = 4000) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, tone, message }]);
      timers.current[id] = setTimeout(() => dismiss(id), durationMs);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Logical inset-inline-end anchoring: renders bottom-right in LTR, bottom-left in
          RTL automatically via the `end-4` utility, no rtl: override needed. */}
      <div
        className="fixed bottom-4 end-4 z-[60] flex flex-col gap-2 w-full max-w-sm"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => {
          const { border, icon: Icon, iconClass } = toneConfig[toast.tone];
          return (
            <div
              key={toast.id}
              role="status"
              className={`flex items-start gap-3 rounded-lg border border-surface-200 p-3.5 text-sm shadow-elevated bg-white animate-fade-in-up ${border}`}
            >
              <Icon size={18} className={`shrink-0 mt-0.5 ${iconClass}`} />
              <p className="flex-1 min-w-0 text-surface-700">{toast.message}</p>
              <button
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss"
                className="shrink-0 rounded p-0.5 hover:bg-surface-950/5 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
