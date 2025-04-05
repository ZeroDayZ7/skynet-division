import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/services/auth.service";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(`Middleware dla ścieżki: ${pathname}`);

  const publicPaths = ["/login", "/"];
  if (publicPaths.includes(pathname)) {
    console.log("Ścieżka publiczna, pomijam middleware");
    return NextResponse.next();
  }

  // Pobieramy wszystkie ciasteczka z żądania
  const sessionCookie = request.cookies.get("SESSION_KEY");
  // Wszystkie ciasteczka jako string
//   const cookieHeader = request.headers.get("cookie") || ""; 
  // Tylko ciasteczko SESSION_KEY
  const cookieHeader = sessionCookie ? `SESSION_KEY=${sessionCookie.value}` : "";
//   console.log(`Ciasteczko SESSION_KEY: ${sessionCookie?.value || "brak"}`);
//   console.log(`Wszystkie ciasteczka: ${cookieHeader}`);

  if (!sessionCookie) {
    console.log("CIASTECZKO NIE ISTNIEJE, przekierowuję na /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Przekazujemy ciasteczka do checkSession
    const sessionData = await checkSession({ cookies: cookieHeader });
    console.log(`Sesja z backendu: ${JSON.stringify(sessionData)}`);

    if (!sessionData.isAuthenticated) {
      console.log("Użytkownik nieautoryzowany, przekierowuję na /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Użytkownik autoryzowany, kontynuuję");
    const response = NextResponse.next();
    return response;
  } catch (error) {
    console.error("Błąd w middleware:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};