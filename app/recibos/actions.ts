"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { companies, receipts, users } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/dal";

export type CreateReceiptInput = {
  imageUrl: string;
  imagePathname: string;
  amount: string | null;
  date: string | null;
  note: string | null;
};

export async function createReceipt(input: CreateReceiptInput) {
  const session = await verifySession();

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
    imageUrl: input.imageUrl,
    imagePathname: input.imagePathname,
    amount: input.amount,
    receiptDate: input.date,
    note: input.note,
  });

  revalidatePath("/recibos");
}
