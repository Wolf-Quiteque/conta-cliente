import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/80 px-4 pb-4 pt-[calc(env(safe-area-inset-top)+1.25rem)] backdrop-blur-xl">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </header>

      <div className="space-y-4 px-5 pb-10 pt-2">
        <Skeleton className="h-4 w-48 self-center" />
        <Skeleton className="h-[92px] rounded-3xl" />
        <Skeleton className="h-[92px] rounded-3xl" />
      </div>
    </div>
  );
}
