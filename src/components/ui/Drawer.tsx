import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-xl",
};

export function Drawer({ open, onClose, title, children, size = "md" }: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handler);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handler);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="absolute inset-0 bg-surface-950/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Anchored to the logical end (right in LTR, left in RTL) so it opens from the
          correct side automatically when document dir flips -- no ltr:/rtl: overrides needed. */}
      <div
        className={`relative h-full w-full ${sizeClasses[size]} bg-white shadow-elevated animate-fade-in overflow-hidden flex flex-col`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 shrink-0">
            <h2 className="text-base font-semibold text-surface-900">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1 text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto px-6 py-5 flex-1">{children}</div>
      </div>
    </div>
  );
}
