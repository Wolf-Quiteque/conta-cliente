"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { receipts, users } from "@/lib/db/schema";
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

  const [user] = await db
    .select({ status: users.status })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user || user.status !== "aprovado") {
    throw new Error("A sua conta ainda não foi aprovada para enviar recibos.");
  }

  await db.insert(receipts).values({
    userId: session.userId,
    imageUrl: input.imageUrl,
    imagePathname: input.imagePathname,
    amount: input.amount,
    receiptDate: input.date,
    note: input.note,
  });

  revalidatePath("/recibos");
}
