import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      validatedData?: any;
      csrfToken?: any;
    }
  }
}