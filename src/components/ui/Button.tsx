import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-copper-600 text-white hover:bg-copper-700 active:bg-copper-800 shadow-soft",
  secondary:
    "bg-surface-100 text-surface-700 hover:bg-surface-200 active:bg-surface-300",
  ghost:
    "text-surface-600 hover:bg-surface-100 active:bg-surface-200",
  danger:
    "bg-error text-white hover:bg-error-dark active:bg-error-dark",
  outline:
    "border border-surface-300 text-surface-700 hover:bg-surface-50 active:bg-surface-100",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-base gap-2",
  icon: "h-9 w-9 p-0",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
