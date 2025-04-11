import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { LoginInput } from "#ro/auth/validators/loginSchema";

export const validateRequest = (schema: ZodSchema<LoginInput>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      req.validatedData = validatedData;
      next();
    } catch (error: any) {
      const firstError = error.errors?.[0]?.message || "Nieprawidłowe dane wejściowe";
      res.status(400).json({
        isAuthenticated: false,
        message: firstError,
      });
    }
  };