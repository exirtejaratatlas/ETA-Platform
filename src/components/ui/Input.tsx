import { type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export function Input({ label, icon, error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-surface-700 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full h-9 rounded-lg border border-surface-300 bg-white px-3 ${icon ? "pl-9" : ""} text-sm text-surface-900 placeholder:text-surface-400 transition-all duration-150 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 focus:outline-none ${error ? "border-error" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
