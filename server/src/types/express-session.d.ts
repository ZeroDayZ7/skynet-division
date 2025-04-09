// src/types/express-session.d.ts
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    csrfToken: string;
    role?: string;
    points: number;
    notifications?: number | null;
    
  }
}
