import { cn } from '@/lib/utils';

interface AlgoBadgeProps {
  label: string;
  className?: string;
}

export default function AlgoBadge({ label, className }: AlgoBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-teal-100 text-teal-800 border border-teal-200',
        className
      )}
    >
      {label}
    </span>
  );
}
