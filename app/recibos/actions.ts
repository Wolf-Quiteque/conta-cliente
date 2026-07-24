"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { companies, receipts, users } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/dal";
import { RECEIPTS_PAGE_SIZE } from "@/lib/pagination";

export async function loadMoreReceipts(offset: number) {
  const session = await verifySession();

  const [row] = await db
    .select({ companyId: users.companyId })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!row?.companyId) return [];

  return db
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
    .where(eq(receipts.companyId, row.companyId))
    .orderBy(desc(receipts.createdAt), desc(receipts.id))
    .limit(RECEIPTS_PAGE_SIZE)
    .offset(Math.max(0, offset));
}

export type CreateReceiptInput = {
  imageUrl: string;
  imagePathname: string;
  type: "venda" | "compra";
  paymentMethod: "dinheiro" | "banco";
  amount: string | null;
  date: string | null;
  note: string | null;
};

export async function createReceipt(input: CreateReceiptInput) {
  const session = await verifySession();

  if (input.type !== "venda" && input.type !== "compra") {
    throw new Error("Tipo de recibo inválido.");
  }
  if (input.paymentMethod !== "dinheiro" && input.paymentMethod !== "banco") {
    throw new Error("Forma de pagamento inválida.");
  }

  const [row] = await db
    .select({ companyId: users.companyId, companyStatus: companies.status })
    .from(users)
    .innerJoin(companies, eq(companies.id, users.companyId))
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!row || row.companyStatus !== "aprovado") {
    throw new Error("A empresa ainda não foi aprovada para enviar recibos.");
  }

  await db.insert(receipts).values({
    userId: session.userId,
    companyId: row.companyId!,
    type: input.type,
    paymentMethod: input.paymentMethod,
    imageUrl: input.imageUrl,
    imagePathname: input.imagePathname,
    amount: input.amount,
    receiptDate: input.date,
    note: input.note,
  });

  revalidatePath("/recibos");
}
