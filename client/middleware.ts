import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { publicPaths, matchesPath, allowedPaths } from '@/lib/middleware/matchers';
import { isAuthenticated } from '@/lib/middleware/auth-middleware';
// import { logMiddlewareRequest, logMiddlewareResponse } from '@/lib/middleware/logger-middleware';
// const i18nMiddleware = createMiddleware({
//   locales: ['pl', 'en'],
//   defaultLocale: 'pl',
// });
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`pathname: ${pathname}`)
    // Pomiń statyczne zasoby i inne wykluczone ścieżki
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    // pathname.startsWith('/icon.png') ||
    pathname.startsWith('/.well-known/') ||
    pathname.startsWith('/static/')
  ) {
    return NextResponse.next();
  }
  const isAuth = await isAuthenticated(request);
  console.log(`isAuth: ${isAuth}`);
 // Jeśli użytkownik jest zalogowany, przekieruj z publicznych ścieżek na dashboard
  if (isAuth && (publicPaths.includes(pathname) || matchesPath(pathname, publicPaths))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  // Jeśli użytkownik nie jest zalogowany i próbuje wejść na stronę niepubliczną
  if (!isAuth && !publicPaths.includes(pathname) && !matchesPath(pathname, publicPaths)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname); // zachowaj redirect po zalogowaniu
    return NextResponse.redirect(loginUrl);
  }
// Jeśli użytkownik jest zalogowany, ale ścieżka nie jest dozwolona, zwróć 404
  // if (isAuth && !allowedPaths.includes(pathname) && !matchesPath(pathname, allowedPaths)) {
  //   return NextResponse.rewrite(new URL('/404', request.url));
  // }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|icon.png|images/|.well-known/|static/).*)',
  ],
};