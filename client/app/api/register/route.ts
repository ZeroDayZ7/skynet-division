import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const csrfToken = request.headers.get('X-CSRF-Token');
    console.log(`csrfToken: ${csrfToken}`);

    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken || '',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Błąd podczas rejestracji' },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json());
  } catch (error: any) {
    console.error('[Register API] Błąd:', error);
    return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 });
  }
}