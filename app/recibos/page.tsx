import Link from "next/link";
import { clsx } from "clsx";
import { count, desc, eq, sql } from "drizzle-orm";
import { Plus, ReceiptText, TriangleAlert } from "lucide-react";
import { db } from "@/lib/db/client";
import { receipts, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/dal";
import { RecibosHeader } from "@/components/receipts/recibos-header";
import { ReceiptList } from "@/components/receipts/receipt-list";
import { formatCurrencyKz } from "@/lib/format";
import { RECEIPTS_PAGE_SIZE } from "@/lib/pagination";

export const metadata = { title: "Os meus recibos" };

export default async function RecibosPage() {
  const user = await getCurrentUser();

  const [stats, firstPage] = await Promise.all([
    db
      .select({
        total: count(),
        vendas: sql<string>`coalesce(sum(case when ${receipts.type} = 'venda' then ${receipts.amount} else 0 end), 0)`,
        compras: sql<string>`coalesce(sum(case when ${receipts.type} = 'compra' then ${receipts.amount} else 0 end), 0)`,
      })
      .from(receipts)
      .where(eq(receipts.companyId, user.companyId)),
    db
      .select({
        id: receipts.id,
        imageUrl: receipts.imageUrl,
        amount: receipts.amount,
        receiptDate: receipts.receiptDate,
        note: receipts.note,
        createdAt: receipts.createdAt,
        type: receipts.type,
        paymentMethod: receipts.paymentMethod,
        uploaderId: users.id,
        uploaderName: users.name,
      })
      .from(receipts)
      .innerJoin(users, eq(users.id, receipts.userId))
      .where(eq(receipts.companyId, user.companyId))
      .orderBy(desc(receipts.createdAt), desc(receipts.id))
      .limit(RECEIPTS_PAGE_SIZE),
  ]);

  const totalCount = stats[0]?.total ?? 0;
  const vendas = parseFloat(stats[0]?.vendas ?? "0");
  const compras = parseFloat(stats[0]?.compras ?? "0");
  const saldo = vendas - compras;
  const canUpload = user.companyStatus === "aprovado";

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="shrink-0 border-b border-border/60">
        <RecibosHeader
          name={user.name}
          companyName={user.companyName}
          status={user.companyStatus}
        />

        {totalCount > 0 && (
          <div className="grid grid-cols-3 gap-2.5 px-5 pb-4">
            <div className="rounded-2xl border border-success/30 bg-success/10 p-3">
              <p className="text-[11.5px] text-success/80">Vendas</p>
              <p className="mt-0.5 truncate text-[15px] font-semibold text-success">
                {formatCurrencyKz(vendas)}
              </p>
            </div>
            <div className="rounded-2xl border border-danger/30 bg-danger/10 p-3">
              <p className="text-[11.5px] text-danger/80">Compras</p>
              <p className="mt-0.5 truncate text-[15px] font-semibold text-danger">
                {formatCurrencyKz(compras)}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-3">
              <p className="text-[11.5px] text-muted-foreground">Saldo</p>
              <p
                className={clsx(
                  "mt-0.5 truncate text-[15px] font-semibold",
                  saldo >= 0 ? "text-success" : "text-danger",
                )}
              >
                {formatCurrencyKz(saldo)}
              </p>
            </div>
          </div>
        )}
      </div>

      <main className="flex-1 overflow-y-auto px-5 pb-32 pt-5">
        {user.companyStatus === "pendente" && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-[13.5px] leading-relaxed text-foreground animate-fade-up">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <p>
              A empresa está pendente de aprovação. Assim que for aprovada por
              um administrador, todos os membros poderão enviar recibos.
            </p>
          </div>
        )}

        {user.companyStatus === "rejeitado" && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-[13.5px] leading-relaxed text-foreground animate-fade-up">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
            <p>
              O registo da empresa não foi aprovado. Contacte o administrador
              para mais informações.
            </p>
          </div>
        )}

        {totalCount === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border py-16 text-center animate-fade-up">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-muted-foreground">
              <ReceiptText className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">Ainda sem recibos</p>
              <p className="mt-1 max-w-[220px] text-[13.5px] text-muted-foreground">
                Toque no botão abaixo para enviar o primeiro recibo da
                empresa.
              </p>
            </div>
          </div>
        ) : (
          <ReceiptList
            initialReceipts={firstPage}
            currentUserId={user.id}
            totalCount={totalCount}
          />
        )}
      </main>

      {canUpload && (
        <Link
          href="/recibos/novo"
          aria-label="Enviar novo recibo"
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] right-6 z-30 flex h-16 w-16 animate-glow-pulse items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-2 text-primary-foreground shadow-xl shadow-primary/30 transition-transform active:scale-90"
        >
          <Plus className="h-7 w-7" strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}
