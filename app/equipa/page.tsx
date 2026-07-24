import Link from "next/link";
import { asc, desc, eq } from "drizzle-orm";
import { ChevronLeft, Crown } from "lucide-react";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/dal";
import { AddMemberForm } from "./add-member-form";

export const metadata = { title: "Equipa" };

export default async function EquipaPage() {
  const user = await getCurrentUser();

  const members = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      companyRole: users.companyRole,
      isOwner: users.isOwner,
    })
    .from(users)
    .where(eq(users.companyId, user.companyId))
    .orderBy(desc(users.isOwner), asc(users.name));

  return (
    <div className="min-h-dvh pb-16">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/80 px-4 pb-4 pt-[calc(env(safe-area-inset-top)+1.25rem)] backdrop-blur-xl">
        <Link
          href="/recibos"
          aria-label="Voltar"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-[17px] font-semibold tracking-tight">Equipa</h1>
          <p className="text-[12.5px] text-muted-foreground">
            {user.companyName}
          </p>
        </div>
      </header>

      <main className="space-y-6 px-5 pt-5">
        <ul className="space-y-2.5">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 animate-fade-up"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {member.name}
                  {member.id === user.id && (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      (você)
                    </span>
                  )}
                </p>
                <p className="truncate text-[13px] text-muted-foreground">
                  {member.email}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {member.isOwner && (
                  <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-accent">
                    <Crown className="h-3 w-3" />
                    Dono
                  </span>
                )}
                <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {member.companyRole === "admin" ? "Admin" : "Gestor"}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {user.companyRole === "admin" ? (
          <AddMemberForm />
        ) : (
          <p className="text-center text-[13px] text-muted-foreground">
            Apenas administradores da empresa podem adicionar novos membros.
          </p>
        )}
      </main>
    </div>
  );
}
