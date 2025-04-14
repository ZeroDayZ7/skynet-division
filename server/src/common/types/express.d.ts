import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?:{
        id: number;
      }
      _validatedData?: unknown;
      csrfToken?: any;
    }
  }
}