"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthFormState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/input";

const initialState: AuthFormState = undefined;

export default function EntrarPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-12">
      <div className="aurora-bg" />
      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-2 text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/30">
            N
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="mt-1.5 text-[15px] text-muted-foreground">
            Entre para enviar os seus recibos
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-3xl border border-border bg-surface/80 p-6 shadow-xl shadow-black/5 backdrop-blur-xl"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              required
              disabled={pending}
            />
            <FieldError>{state?.errors?.email?.[0]}</FieldError>
          </div>
          <div>
            <Label htmlFor="password">Palavra-passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              disabled={pending}
            />
            <FieldError>{state?.errors?.password?.[0]}</FieldError>
          </div>
          {state?.message && (
            <p className="rounded-xl bg-danger/10 px-3 py-2 text-[13px] text-danger">
              {state.message}
            </p>
          )}
          <Button type="submit" fullWidth size="lg" loading={pending}>
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-[14px] text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link href="/registar" className="font-medium text-primary">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}
