import { LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { StatusBadge, type UserStatus } from "@/components/ui/status-badge";

export function RecibosHeader({
  name,
  status,
}: {
  name: string;
  status: UserStatus;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 px-5 pb-4 pt-[calc(env(safe-area-inset-top)+1.25rem)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] text-muted-foreground">Olá,</p>
          <h1 className="truncate text-xl font-semibold tracking-tight">
            {name.split(" ")[0]}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={status} />
          <form action={logout}>
            <button
              type="submit"
              aria-label="Sair"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-danger/40 hover:text-danger active:scale-95"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
