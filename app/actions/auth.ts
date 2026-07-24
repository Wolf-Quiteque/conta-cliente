"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { companies, users } from "@/lib/db/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { loginSchema, signupSchema } from "@/lib/validation";

export type AuthFormState =
  | {
      errors?: {
        companyName?: string[];
        nif?: string[];
        address?: string[];
        contact?: string[];
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function signup(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = signupSchema.safeParse({
    companyName: formData.get("companyName"),
    nif: formData.get("nif"),
    address: formData.get("address"),
    contact: formData.get("contact"),
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { companyName, nif, address, contact, name, email, password } =
    validated.data;

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    return { errors: { email: ["Já existe uma conta com este email."] } };
  }

  const [company] = await db
    .insert(companies)
    .values({
      name: companyName,
      nif,
      address,
      contact,
      status: "pendente",
    })
    .returning({ id: companies.id });

  if (!company) {
    return { message: "Ocorreu um erro ao criar a empresa. Tente novamente." };
  }

  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash,
      role: "cliente",
      companyId: company.id,
      companyRole: "admin",
      isOwner: true,
    })
    .returning({ id: users.id, role: users.role });

  if (!user) {
    return { message: "Ocorreu um erro ao criar a sua conta. Tente novamente." };
  }

  await createSession({ userId: user.id, role: user.role });
  redirect("/recibos");
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (
    !user ||
    user.role !== "cliente" ||
    !(await verifyPassword(password, user.passwordHash))
  ) {
    return { message: "Email ou palavra-passe incorretos." };
  }

  await createSession({ userId: user.id, role: user.role });
  redirect("/recibos");
}

export async function logout() {
  await deleteSession();
  redirect("/entrar");
}
