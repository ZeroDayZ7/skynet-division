// Stałe konfiguracyjne
export const publicPaths = ['/', '/login', '/register', '/activate'];
export const allowedPaths = ['/dashboard/:path*', '/profile', '/settings'];
export const excludedPaths = ['/_next/', '/images/', '/favicon.ico', '/.well-known/', '/static/'];

// Cache dla wyrażen regularnych
const regexCache = new Map<string, RegExp>();

export function matchesPath(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    // Użyj cache dla wyrażen regularnych
    if (!regexCache.has(pattern)) {
      const regex = new RegExp(`^${pattern.replace(/:path\*/, '.*').replace(/\*/g, '.*')}$`);
      regexCache.set(pattern, regex);
    }
    return regexCache.get(pattern)!.test(pathname);
  });
}