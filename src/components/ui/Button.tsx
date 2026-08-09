import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "danger" | "outline" | "cta" | "cta-outline";
type Size = "sm" | "md" | "lg" | "icon" | "cta";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Renders as a react-router Link to this path instead of a native <button>. Same visual styling either way. */
  to?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-surface-900 text-white hover:bg-surface-800 active:bg-surface-950 shadow-soft",
  accent:
    "bg-copper-600 text-white hover:bg-copper-700 active:bg-copper-800 shadow-soft",
  secondary:
    "bg-surface-100 text-surface-700 hover:bg-surface-200 active:bg-surface-300",
  ghost:
    "text-surface-600 hover:bg-surface-100 active:bg-surface-200",
  danger:
    "bg-error text-white hover:bg-error-dark active:bg-error-dark",
  outline:
    "border border-surface-300 text-surface-700 hover:bg-surface-50 active:bg-surface-100",
  // Reuses the exact copper-500/600 combination already shipped on the site's CTA-band
  // primary buttons (Home/About/SteelTrading/SupplierNetwork) — named here so those call
  // sites share one definition instead of duplicating the classes. Not a new color value.
  cta: "bg-copper-500 text-white hover:bg-copper-600",
  // Reuses the exact white/10-border outline style already shipped on CTA-band secondary buttons.
  "cta-outline": "border border-white/20 text-white hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 font-medium",
  md: "h-9 px-4 text-sm gap-2 font-medium",
  lg: "h-11 px-6 text-base gap-2 font-medium",
  icon: "h-9 w-9 p-0 font-medium",
  // Matches the h-11/px-5/text-sm/font-semibold combination already shipped on CTA-band
  // buttons. Kept distinct from `lg` (h-11/px-6/text-base/font-medium, unused elsewhere
  // today) rather than redefining `lg` — this reuses existing output, it doesn't invent it.
  cta: "h-11 px-5 text-body-sm gap-2 font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  to,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg transition-all duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
