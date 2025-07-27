import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:4000/api/csrf-token', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Nie udało się pobrać tokenu CSRF');
    }
    const data = await response.json();
    return NextResponse.json({ csrfToken: data.csrfToken });
  } catch (error: any) {
    console.error('[CSRF Token] Błąd:', error);
    return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 });
  }
}