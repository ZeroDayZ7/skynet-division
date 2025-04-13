// app/api/users/pin-status/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    // Odczyt ciasteczka csrf
    const csrfToken = cookieStore.get('csrf');

    console.log(`sessionCookie: ${JSON.stringify(csrfToken)}`);

    // Walidacja tokenu CSRF
    if (!csrfToken || !csrfToken.value) {
      return NextResponse.json(
        { message: 'CSRF token is required' },
        { status: 403 }
      );
    }

    // Odczyt wszystkich ciasteczek do nagłówka Cookie
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');

    console.log(`cookieHeader: ${cookieHeader}`);

    const response = await fetch(`${process.env.EXPRESS_API_URL}/api/users/pin-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken.value, // Używamy wartości tokenu
        Cookie: cookieHeader, // Dołączamy wszystkie ciasteczka
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Express error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('pin-status error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}