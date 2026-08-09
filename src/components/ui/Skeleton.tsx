/**
 * Shared shimmer primitive -- reuses the shimmer-bg/animate-shimmer utilities
 * already defined in tailwind.config.js. Preset shapes cover the common cases
 * (Card/StatCard/Table loading states) so each component doesn't hand-roll its
 * own shimmer bar, replacing DataTable's previous one-off implementation.
 */
import { type CSSProperties } from "react";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  return <div className={`shimmer-bg animate-shimmer rounded-md ${className}`} style={style} />;
}

export function SkeletonText({ lines = 1, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton key={i} className={`h-3.5 ${i === lines - 1 && lines > 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 36, className = "" }: { size?: number; className?: string }) {
  return <Skeleton className={`rounded-full shrink-0 ${className}`} style={{ width: size, height: size }} />;
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-surface-200 bg-white p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonAvatar size={40} />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonRows({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
