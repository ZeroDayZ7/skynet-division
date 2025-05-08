// lib/middleware/matchers.ts
export const publicPaths = ['/', '/login', '/register', '/activate', '/test'];

export function matchesPath(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    const regex = new RegExp(`^${pattern.replace(/:path\*/, '.*')}$`);
    return regex.test(pathname);
  });
}
