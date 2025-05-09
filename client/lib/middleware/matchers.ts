// lib/middleware/matchers.ts
export const publicPaths = ['/', '/login', '/register', '/activate', '/test'];

export const allowedPaths = ['/dashboard/*', '/profile', '/settings'];


// export function matchesPath(pathname: string, patterns: string[]): boolean {
//   return patterns.some((pattern) => {
//     const regex = new RegExp(`^${pattern.replace(/:path\*/, '.*')}$`);
//     return regex.test(pathname);
//   });
// }

export function matchesPath(pathname: string, patterns: string[]): boolean {
    return patterns.some((pattern) => {
      const regex = new RegExp(`^${pattern.replace(/:path\*/, '.*').replace(/\*/g, '.*')}$`);
      return regex.test(pathname);
    });
  }
  