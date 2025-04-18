// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/session/checkSession";
import { cookies } from "next/headers";
import { Session } from "./lib/session/types/session.types";
import { cacheSession, getCachedSession, clearCachedSession } from "@/lib/session/session-cache";
console.log(`Start Middleware`);
// Publiczne trasy — nie wymagają sesji
const publicPaths = ["/", "/login", "/register"];

// Role i dostęp do ścieżek
const roleBasedAccess = {
  admin: ["/admin/:path*"],
  user: ["/dashboard/:path*", "/profile/:path*", "/electronic-documents/:path*"],
};

// Sprawdza czy ścieżka pasuje do wzorca z :path*
const matchesPath = (pathname: string, patterns: string[]): boolean => {
  return patterns.some((pattern) => {
    const regex = new RegExp(`^${pattern.replace(/:path\*/, ".*")}$`);
    return regex.test(pathname);
  });
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Publiczne ścieżki
  if (publicPaths.includes(pathname) || matchesPath(pathname, publicPaths)) {
    return NextResponse.next();
  }

  // 2. Sprawdź ciasteczko
  const cookieStore = await cookies();

  // const cookiesHeader = cookieStore
  // .getAll()
  // .map((cookie) => `${cookie.name}=${cookie.value}`)
  // .join('; ');

  // console.log(`cookiesHeader: ${cookiesHeader}`);

  const cookieName = process.env.SESSION_COOKIE_NAME?.toString() || "SESSION_KEY";
  const getSessionCookie = cookieStore.get(cookieName);
  const sessionKey = getSessionCookie ? `${getSessionCookie.value}` : "";
  console.log(`getSessionCookie: ${JSON.stringify(getSessionCookie,  null, 2)}`);
  console.log(`sessionCookie: ${sessionKey}`); 

  // if (!cookieHeader) {
  //   const loginUrl = new URL("/login", request.url);
  //   loginUrl.searchParams.set("redirect", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  try {
    // 3. Pobierz sesję z cache lub backendu
    const session = await checkSession(sessionKey);
    console.log(`session: ${JSON.stringify(session, null, 2)}`);

    // let session: Session | null = await getCachedSession(sessionCookie.value);

    // if (!session) {
    //   session = await checkSession(sessionCookie.value);

    //   if (session.isAuthenticated && session.user) {
    //     await cacheSession(sessionCookie.value, session); // Cache'uj sesję np. na 60s
    //   }
    // }

    // if (!session.isAuthenticated || !session.user) {
    //   await clearCachedSession(sessionCookie.value);
    //   const loginUrl = new URL("/login", request.url);
    //   loginUrl.searchParams.set("redirect", pathname);
    //   return NextResponse.redirect(loginUrl);
    // }

    // 4. dorzuć nagłówek z rolą i id/em
    if (!session.isAuthenticated || !session.user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }


    // if (!matchesPath(pathname, allowedPaths)) {
    //   return NextResponse.redirect(new URL("/unauthorized", request.url));
    // }

  //   5. Przekaż dane użytkownika do nagłówka
    const response = NextResponse.next();
    response.headers.set("x-user", JSON.stringify(session.user));
    return response;
  } catch (error) {
    console.error("Błąd w middleware:", error);
    // await clearCachedSession(sessionKey.value);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}
// console.log(`Koniec Middleware`);
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // omija statyczne pliki
  ],
};
