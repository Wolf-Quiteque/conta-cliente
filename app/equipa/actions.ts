"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { verifySession } from "@/lib/auth/dal";
import { hashPassword } from "@/lib/auth/password";
import { memberSchema } from "@/lib/validation";

export type MemberFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        companyRole?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export async function addMember(
  _prevState: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  const session = await verifySession();

  const [actingUser] = await db
    .select({ companyId: users.companyId, companyRole: users.companyRole })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!actingUser?.companyId || actingUser.companyRole !== "admin") {
    return { message: "Não tem permissão para adicionar membros." };
  }

  const validated = memberSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    companyRole: formData.get("companyRole"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, password, companyRole } = validated.data;

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    return { errors: { email: ["Já existe uma conta com este email."] } };
  }

  const passwordHash = await hashPassword(password);

  await db.insert(users).values({
    name,
    email,
    passwordHash,
    role: "cliente",
    companyId: actingUser.companyId,
    companyRole,
    isOwner: false,
  });

  revalidatePath("/equipa");
  return { success: true };
}
