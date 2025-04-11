import { JwtPayload } from 'jsonwebtoken';

// User role types
export type UserRole = 'admin' | 'user' | 'editor' | 'moderator';

// Decoded token structure
export interface DecodedToken extends JwtPayload {
  sub: string; // Encrypted user ID
  rol?: UserRole; // User role
  usr?: string; // Email/username
}

// User object structure attached to request
export interface AuthenticatedUser {
  id: number;
  role?: string;
  email?: string;
}

// API response interface
export interface ApiResponse {
  success: boolean;
  code: string;
  message: string;
  [key: string]: any; // For additional fields
}

// Auth error response type
export interface IAuthErrorResponse {
  success: false;
  message: string;
  code: 'AUTH_ERROR' | 'SERVER_ERROR' | 'FORBIDDEN' | 'UNAUTHORIZED';
  isLoggedIn: false;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}