import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-[200px] dark:bg-zinc-900" />
        <Skeleton className="h-10 w-[120px] dark:bg-zinc-900" />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full dark:bg-zinc-900" />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <Skeleton className="h-[300px] w-full dark:bg-zinc-900" />
        </div>
        {/* Table */}
        <div className="lg:col-span-1">
          <Skeleton className="h-10 w-full mb-4 dark:bg-zinc-900" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full mb-2 dark:bg-zinc-900" />
          ))}
        </div>
      </div>
    </div>
  );
}
