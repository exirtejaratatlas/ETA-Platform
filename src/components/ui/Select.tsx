import { type SelectHTMLAttributes, useId } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
}

export function Select({
  label,
  options,
  placeholder,
  error,
  helperText,
  className = "",
  id,
  required,
  ...props
}: SelectProps) {
  const autoId = useId();
  const selectId = id || autoId;
  const helperId = `${selectId}-helper`;

  const stateClasses = error
    ? "border-error focus:border-error focus:ring-error/20"
    : "border-surface-300 focus:border-copper-500 focus:ring-copper-500/20";

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-surface-700 mb-1.5">
          {label}
          {required && <span className="text-error ms-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error || helperText ? helperId : undefined}
          className={`w-full h-9 appearance-none rounded-lg border bg-white ps-3 pe-9 text-sm text-surface-900 transition-all duration-150 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${stateClasses} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-surface-400"
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
