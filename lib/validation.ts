import { z } from "zod";

export const signupSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),
  nif: z.string().trim().min(5, "Introduza um NIF válido."),
  address: z.string().trim().min(3, "Introduza a morada da empresa."),
  contact: z.string().trim().min(6, "Introduza um contacto válido."),
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().trim().toLowerCase().email("Introduza um email válido."),
  password: z
    .string()
    .min(6, "A palavra-passe deve ter pelo menos 6 caracteres."),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Introduza um email válido."),
  password: z.string().min(1, "Introduza a palavra-passe."),
});

export const memberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().trim().toLowerCase().email("Introduza um email válido."),
  password: z
    .string()
    .min(6, "A palavra-passe deve ter pelo menos 6 caracteres."),
  companyRole: z.enum(["admin", "gestor"]),
});
