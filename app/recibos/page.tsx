import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { Plus, ReceiptText, TriangleAlert } from "lucide-react";
import { db } from "@/lib/db/client";
import { receipts, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/dal";
import { RecibosHeader } from "@/components/receipts/recibos-header";
import { ReceiptCard } from "@/components/receipts/receipt-card";
import { formatCurrencyKz } from "@/lib/format";

export const metadata = { title: "Os meus recibos" };

export default async function RecibosPage() {
  const user = await getCurrentUser();

  const companyReceipts = await db
    .select({
      id: receipts.id,
      imageUrl: receipts.imageUrl,
      amount: receipts.amount,
      receiptDate: receipts.receiptDate,
      note: receipts.note,
      createdAt: receipts.createdAt,
      uploaderId: users.id,
      uploaderName: users.name,
    })
    .from(receipts)
    .innerJoin(users, eq(users.id, receipts.userId))
    .where(eq(receipts.companyId, user.companyId))
    .orderBy(desc(receipts.createdAt));

  const canUpload = user.companyStatus === "aprovado";
  const total = companyReceipts.reduce(
    (sum, r) => sum + (r.amount ? parseFloat(r.amount) : 0),
    0,
  );

  return (
    <div className="relative flex min-h-dvh flex-col pb-32">
      <RecibosHeader
        name={user.name}
        companyName={user.companyName}
        status={user.companyStatus}
      />

      <main className="flex-1 px-5 pt-5">
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

        {companyReceipts.length > 0 && (
          <div className="mb-5 rounded-2xl border border-border bg-surface p-4 animate-fade-up">
            <p className="text-[13px] text-muted-foreground">Total enviado</p>
            <p className="mt-0.5 text-2xl font-semibold tracking-tight">
              {formatCurrencyKz(total)}
            </p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {companyReceipts.length}{" "}
              {companyReceipts.length === 1 ? "recibo" : "recibos"}
            </p>
          </div>
        )}

        {companyReceipts.length === 0 ? (
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
          <ul className="space-y-2.5">
            {companyReceipts.map((receipt) => (
              <li key={receipt.id}>
                <ReceiptCard
                  receipt={{
                    ...receipt,
                    uploaderName:
                      receipt.uploaderId === user.id
                        ? undefined
                        : receipt.uploaderName,
                  }}
                />
              </li>
            ))}
          </ul>
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
