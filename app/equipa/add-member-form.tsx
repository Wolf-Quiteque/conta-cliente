"use client";

import { useActionState, useState } from "react";
import { addMember, type MemberFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/input";

const initialState: MemberFormState = undefined;

export function AddMemberForm() {
  const [state, formAction, pending] = useActionState(addMember, initialState);
  const [formKey, setFormKey] = useState(0);
  const [lastState, setLastState] = useState(state);

  if (state !== lastState) {
    setLastState(state);
    if (state?.success) {
      setFormKey((key) => key + 1);
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 animate-fade-up">
      <p className="mb-4 text-[15px] font-semibold tracking-tight">
        Adicionar membro
      </p>
      <form key={formKey} action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            placeholder="Nome do membro"
            required
            disabled={pending}
          />
          <FieldError>{state?.errors?.name?.[0]}</FieldError>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="membro@exemplo.com"
            required
            disabled={pending}
          />
          <FieldError>{state?.errors?.email?.[0]}</FieldError>
        </div>
        <div>
          <Label htmlFor="password">Palavra-passe inicial</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            required
            disabled={pending}
          />
          <FieldError>{state?.errors?.password?.[0]}</FieldError>
        </div>
        <div>
          <Label htmlFor="companyRole">Função</Label>
          <select
            id="companyRole"
            name="companyRole"
            defaultValue="gestor"
            disabled={pending}
            className="h-13 w-full rounded-2xl border border-border bg-surface px-4 text-[16px] text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
          >
            <option value="gestor">Gestor — só pode enviar recibos</option>
            <option value="admin">Admin — também pode adicionar membros</option>
          </select>
          <FieldError>{state?.errors?.companyRole?.[0]}</FieldError>
        </div>
        {state?.message && (
          <p className="rounded-xl bg-danger/10 px-3 py-2 text-[13px] text-danger">
            {state.message}
          </p>
        )}
        {state?.success && (
          <p className="rounded-xl bg-success/10 px-3 py-2 text-[13px] text-success">
            Membro adicionado com sucesso.
          </p>
        )}
        <Button type="submit" fullWidth loading={pending}>
          Adicionar membro
        </Button>
      </form>
    </div>
  );
}
