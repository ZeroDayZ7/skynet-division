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
  // console.log(`pathname: ${pathname}`);


  // Obsługa next-intl
  // const intlResponse = i18nMiddleware(request);
  // if (intlResponse instanceof NextResponse) {
  //   return intlResponse;
  // }

  // if (publicPaths.includes(pathname) || matchesPath(pathname, publicPaths)) {
  //   return NextResponse.next();
  // }

  const isAuth = await isAuthenticated(request);

  if (isAuth && matchesPath(pathname, publicPaths)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  

  if (!isAuth) {
    // const loginUrl = new URL('/login', request.url);
    // loginUrl.searchParams.set('redirect', pathname);
    // return NextResponse.redirect(loginUrl);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if (isAuth && !allowedPaths.includes(pathname)) {
  //   const notFoundUrl = new URL('/404', request.url);
  //   return NextResponse.rewrite(notFoundUrl);
  // }
  

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
