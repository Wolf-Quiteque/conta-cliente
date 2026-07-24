import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-dvh pb-16">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/80 px-4 pb-4 pt-[calc(env(safe-area-inset-top)+1.25rem)] backdrop-blur-xl">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
      </header>

      <main className="space-y-6 px-5 pt-5">
        <ul className="space-y-2.5">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </li>
          ))}
        </ul>
        <Skeleton className="h-72 rounded-3xl" />
      </main>
    </div>
  );
}
