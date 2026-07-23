import { z } from "zod";

export const signupSchema = z.object({
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
