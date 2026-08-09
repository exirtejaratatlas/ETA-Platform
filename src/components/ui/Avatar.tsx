interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  tone?: "copper" | "info" | "neutral";
}

const sizeClasses = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

const toneClasses = {
  copper: "bg-copper-50 text-copper-700",
  info: "bg-info/10 text-info-dark",
  neutral: "bg-surface-100 text-surface-600",
};

export function Avatar({ initials, size = "md", tone = "copper" }: AvatarProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium ${sizeClasses[size]} ${toneClasses[tone]}`}
    >
      {initials}
    </span>
  );
}
