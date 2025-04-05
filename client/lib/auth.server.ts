// lib/auth.server.ts
"use server";

import { loginUser } from "@/services/auth.service";

export async function serverLogin(email: string, password: string) {
  try {
    const data = await loginUser(email, password);
    if (!data.isAuthenticated) {
      return { success: false, error: "Nieprawidłowe dane logowania" };
    }
    return { success: data.isAuthenticated, user: data.user, token: data.token };
  } catch (err: any) {
    return { success: false, error: err.message || "Wystąpił problem z logowaniem" };
  }
}
