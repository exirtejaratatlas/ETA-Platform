interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  tone?: "brand" | "gold" | "teal" | "neutral";
}

const sizeClasses = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

const toneClasses = {
  brand: "bg-brand-50 text-brand-700",
  gold: "bg-gold-50 text-gold-700",
  teal: "bg-teal-50 text-teal-700",
  neutral: "bg-surface-100 text-surface-600",
};

export function Avatar({ initials, size = "md", tone = "brand" }: AvatarProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium ${sizeClasses[size]} ${toneClasses[tone]}`}
    >
      {initials}
    </span>
  );
}
