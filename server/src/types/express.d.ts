import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?:{
        id: number;
      }
      validatedData?: any;
      csrfToken?: any;
    }
  }
}