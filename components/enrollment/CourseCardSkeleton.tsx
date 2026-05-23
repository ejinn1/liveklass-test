import { Skeleton } from "@/components/common/Skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="grid min-h-64 w-full grid-rows-[auto_1fr_auto] rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="mt-4 h-6 w-4/5" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-11/12" />
      </div>

      <div className="mt-5 grid content-start gap-3">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/5" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}
