import { cn } from '@/lib/utils';
import { SkeletonCard } from '@/components/Skeleton/SkeletonCard';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton, SkeletonCard };
