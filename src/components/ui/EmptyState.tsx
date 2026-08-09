import { type ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-100 text-surface-400 mb-4">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-surface-700">{title}</p>
      {description && <p className="mt-1 text-sm text-surface-400 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
