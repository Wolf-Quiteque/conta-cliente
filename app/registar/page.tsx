"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthFormState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/input";

const initialState: AuthFormState = undefined;

export default function RegistarPage() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-12">
      <div className="aurora-bg" />
      <div className="relative z-10 w-full max-w-md animate-fade-up">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-2 text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/30">
            N
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Registar empresa
          </h1>
          <p className="mt-1.5 text-[15px] text-muted-foreground">
            Crie a conta da sua empresa e comece a enviar recibos
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-5 rounded-3xl border border-border bg-surface/80 p-6 shadow-xl shadow-black/5 backdrop-blur-xl"
        >
          <div className="space-y-4">
            <p className="text-[12.5px] font-medium uppercase tracking-wide text-muted-foreground">
              Dados da empresa
            </p>
            <div>
              <Label htmlFor="companyName">Nome da empresa</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Ex: Nawabus"
                required
              />
              <FieldError>{state?.errors?.companyName?.[0]}</FieldError>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="nif">NIF</Label>
                <Input id="nif" name="nif" type="text" required />
                <FieldError>{state?.errors?.nif?.[0]}</FieldError>
              </div>
              <div>
                <Label htmlFor="contact">Contacto</Label>
                <Input id="contact" name="contact" type="tel" required />
                <FieldError>{state?.errors?.contact?.[0]}</FieldError>
              </div>
            </div>
            <div>
              <Label htmlFor="address">Morada</Label>
              <Input id="address" name="address" type="text" required />
              <FieldError>{state?.errors?.address?.[0]}</FieldError>
            </div>
          </div>

          <div className="space-y-4 border-t border-border pt-4">
            <p className="text-[12.5px] font-medium uppercase tracking-wide text-muted-foreground">
              Os seus dados
            </p>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="O seu nome"
                required
              />
              <FieldError>{state?.errors?.name?.[0]}</FieldError>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                required
              />
              <FieldError>{state?.errors?.email?.[0]}</FieldError>
            </div>
            <div>
              <Label htmlFor="password">Palavra-passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
                required
              />
              <FieldError>{state?.errors?.password?.[0]}</FieldError>
            </div>
          </div>

          {state?.message && (
            <p className="rounded-xl bg-danger/10 px-3 py-2 text-[13px] text-danger">
              {state.message}
            </p>
          )}
          <Button type="submit" fullWidth size="lg" loading={pending}>
            Criar empresa
          </Button>
          <p className="text-center text-[12.5px] leading-relaxed text-muted-foreground">
            Ficará como administrador da empresa. Após o registo, a conta fica
            pendente de aprovação antes de poder enviar recibos.
          </p>
        </form>

        <p className="mt-6 text-center text-[14px] text-muted-foreground">
          Já tem conta?{" "}
          <Link href="/entrar" className="font-medium text-primary">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
