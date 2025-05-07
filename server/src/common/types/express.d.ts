import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
      _validatedData?: unknown; // Zachowujemy unknown, ale typujemy w middleware
      csrfToken?: string; // Zmieniamy any na string dla CSRF
    }
  }
}