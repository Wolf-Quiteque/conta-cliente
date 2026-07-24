import Link from "next/link";
import { Users } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { StatusBadge, type UserStatus } from "@/components/ui/status-badge";
import { LogoutButton } from "@/components/ui/logout-button";

export function RecibosHeader({
  name,
  companyName,
  status,
}: {
  name: string;
  companyName: string;
  status: UserStatus;
}) {
  return (
    <header className="bg-background px-5 pb-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] text-muted-foreground">
            {companyName}
          </p>
          <h1 className="truncate text-xl font-semibold tracking-tight">
            Olá, {name.split(" ")[0]}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={status} />
          <Link
            href="/equipa"
            aria-label="Equipa"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground active:scale-95"
          >
            <Users className="h-4 w-4" strokeWidth={2} />
          </Link>
          <form action={logout}>
            <LogoutButton />
          </form>
        </div>
      </div>
    </header>
  );
}
