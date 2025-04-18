import { Session } from "./types/session.types";
// lib/session-cache.ts
type CachedSession = {
    data: Session;
    expiresAt: number;
  };
  
  const sessionCache = new Map<string, CachedSession>();
  
  export async function cacheSession(key: string, session: Session, ttlSeconds = 60) {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    sessionCache.set(key, { data: session, expiresAt });
  }
  
  export async function getCachedSession(key: string): Promise<Session | null> {
    const cached = sessionCache.get(key);
    if (!cached) return null;
    if (cached.expiresAt < Date.now()) {
      sessionCache.delete(key);
      return null;
    }
    return cached.data;
  }
  
  export async function clearCachedSession(key: string) {
    sessionCache.delete(key);
  }
  