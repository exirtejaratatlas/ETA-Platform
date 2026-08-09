import { type InputHTMLAttributes, type ReactNode, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
  success?: boolean;
  helperText?: string;
}

export function Input({
  label,
  icon,
  error,
  success = false,
  helperText,
  className = "",
  id,
  required,
  ...props
}: InputProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const helperId = `${inputId}-helper`;

  const stateClasses = error
    ? "border-error focus:border-error focus:ring-error/20"
    : success
    ? "border-success focus:border-success focus:ring-success/20"
    : "border-surface-300 focus:border-copper-500 focus:ring-copper-500/20";

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-surface-700 mb-1.5">
          {label}
          {required && <span className="text-error ms-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute start-3 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error || helperText ? helperId : undefined}
          className={`w-full h-9 rounded-lg border bg-white px-3 ${icon ? "ps-9" : ""} text-sm text-surface-900 placeholder:text-surface-400 transition-all duration-150 focus:ring-2 focus:outline-none ${stateClasses} ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p id={helperId} className="mt-1 text-xs text-error">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1 text-xs text-surface-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
