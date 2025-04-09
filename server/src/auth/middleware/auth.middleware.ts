// auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { jwtConfig } from "#auth/config/jwt.config";
import { decryptId } from "#auth/utils/crypto.utils";
import { getCsrfTokenFromRequest, getJwtTokenFromRequest, decodeAuthToken } from "#/auth/utils/token.utils";
import { clearAuthCookie, clearCSRFCookie } from "#/auth/utils/cookie.utils";
import { createError } from "#errors/errorFactory";
import SystemLog from "#/utils/SystemLog";
import jwt from "jsonwebtoken";

const { TokenExpiredError, JsonWebTokenError } = jwt;

const handleLogout = (req: Request, res: Response, error: ReturnType<typeof createError>): void => {
  // Clear cookies
  clearAuthCookie(res);
  clearCSRFCookie(res);

  // Clear session data
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        SystemLog.error("Failed to destroy session during logout", {
          error: err.message,
        });
      }
    });
  }

  // Send error response
  res.status(401).json(error);
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Step 4: Check CSRF token from session
    const csrfToken = req.session.csrfToken;
    const csrfHeader = req.headers["x-csrf-token"] as string;

    if (csrfHeader === csrfToken) {
      SystemLog.info(`csrfHeader: ${csrfHeader}===${csrfToken}`);
    }

    if (!csrfToken || !csrfHeader || csrfToken !== csrfHeader) {
      SystemLog.warn("CSRF token validation failed", {
        action: "csrf_validation",
        ip: req.ip,
        path: req.path,
      });
      return handleLogout(req, res, createError("CSRF_TOKEN_INVALID"));
    }

    // const crsfToken = getCsrfTokenFromRequest(req);
    // if (!crsfToken) {
    //   SystemLog.warn('Missing CSRF token', { action: 'authentication', ip: req.ip, path: req.path });
    //   return handleLogout(req, res, createError('AUTH_TOKEN_MISSING'));
    // }

    const jwtToken = getJwtTokenFromRequest(req);
    if (jwtToken) {
      SystemLog.info("JWT token", {
        token: jwtToken,
        action: "authentication",
        ip: req.ip,
        path: req.path,
      });
    }

    if (!jwtToken) {
      SystemLog.warn("Missing JWT token", { action: "authentication", ip: req.ip, path: req.path });
      return handleLogout(req, res, createError("AUTH_TOKEN_MISSING"));
    }

    let decoded;
    try {
      decoded = decodeAuthToken(jwtToken);
      req.user = decoded;
      SystemLog.info(`decoded: ${JSON.stringify(decoded)}`);
      SystemLog.info(`req.user: ${JSON.stringify(req.user)}`);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        SystemLog.warn("JWT token expired", { action: "token_validation", ip: req.ip, path: req.path });
        return handleLogout(req, res, createError("AUTH_TOKEN_EXPIRED"));
      }
      if (error instanceof JsonWebTokenError) {
        SystemLog.warn("Invalid JWT token", { action: "token_validation", ip: req.ip, path: req.path });
        return handleLogout(req, res, createError("AUTH_TOKEN_INVALID"));
      }
      throw error; // Unexpected errors
    }

    // Step 3: Decrypt user ID from token
    // const userId = decryptId(decoded.sub);
    // if (!userId) {
    //   SystemLog.warn('Invalid or undecryptable user ID in token', {
    //     action: 'token_validation',
    //     jwtSubject: decoded.sub,
    //   });
    //   return handleLogout(req, res, createError('AUTH_TOKEN_INVALID'));
    // }

    // // Step 4: Check CSRF token from session
    // const csrfToken = req.session.csrfToken;
    // const csrfHeader = req.headers['x-csrf-token'] as string;
    // if (!csrfToken || !csrfHeader || csrfToken !== csrfHeader) {
    //   SystemLog.warn('CSRF token validation failed', {
    //     action: 'csrf_validation',
    //     userId,
    //     ip: req.ip,
    //     path: req.path,
    //   });
    //   return handleLogout(req, res, createError('CSRF_TOKEN_INVALID'));
    // }

    // Step 5: Attach user data to request

    SystemLog.info("User authenticated successfully", {
      action: "authentication",
      path: req.path,
    });

    next();
  } catch (error) {
    SystemLog.error("Authentication middleware error", {
      error: error instanceof Error ? error.message : "Unknown error",
      ip: req.ip,
      path: req.path,
    });
    return handleLogout(req, res, createError("AUTHENTICATION_FAILED"));
  }
};
