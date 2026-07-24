import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative flex min-h-dvh flex-col pb-32">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 px-5 pb-4 pt-[calc(env(safe-area-inset-top)+1.25rem)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pt-5">
        <div className="mb-5 grid grid-cols-3 gap-2.5">
          <Skeleton className="h-[68px]" />
          <Skeleton className="h-[68px]" />
          <Skeleton className="h-[68px]" />
        </div>

        <ul className="space-y-2.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3"
            >
              <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
