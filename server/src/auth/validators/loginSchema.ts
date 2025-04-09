import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Niepoprawny adres email")
    .max(100, "Email za długi")
    .trim(),
  password: z
    .string()
    .min(6, "Hasło za krótkie")
    .max(100, "Hasło za długie")
    .regex(/^[^\s]+$/, "Hasło nie może zawierać spacji"),
});

export type LoginInput = z.infer<typeof loginSchema>;