import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/services/auth.service";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Logowanie ścieżki
  console.log(`Middleware dla ścieżki: ${pathname}`);

  // Pomijamy middleware dla stron publicznych, np. /login
  const publicPaths = ["/login", "/"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  console.log(`CIASTECZKO ISTNIEJE`);
  // Pobieranie wszystkich ciasteczek
  const cookies = request.cookies;

  // Logowanie wszystkich ciasteczek
  console.log(`Wszystkie ciasteczka: ${JSON.stringify(cookies), null, 2}`);

  // Sprawdzamy, czy ciasteczko SESSION_KEY istnieje
  const sessionCookie = request.cookies.get('SESSION_KEY');
  if (!sessionCookie) {
    console.log(`CIASTECZKO NIE ISTNIEJE`);
    // Jeśli ciasteczko nie istnieje, przekierowujemy na stronę logowania
    return NextResponse.redirect(new URL("/login", request.url));
  }else{
   
  }


  try {
    // Sprawdzamy sesję na backendzie (jeśli ciasteczko istnieje)
    const sessionData = await checkSession();
    console.log(`SESSION: ${JSON.stringify(sessionData)}`);

    if (!sessionData.isAuthenticated) {
      // Jeśli użytkownik nie jest zalogowany, przekierowujemy na /login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Jeśli użytkownik jest zalogowany, kontynuujemy
    const response = NextResponse.next();
    console.log(`RESPONSE: ${response}`);
    return response;
  } catch (error) {
    console.error("Middleware session check error:", error);
    // W przypadku błędu przekierowujemy na /login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Definiujemy, dla jakich ścieżek middleware ma działać
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Chronione trasy
};
