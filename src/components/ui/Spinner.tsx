interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-surface-200 border-t-copper-500 ${sizeClasses[size]} ${className}`} />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-surface-50">
      <Spinner size="lg" />
    </div>
  );
}
