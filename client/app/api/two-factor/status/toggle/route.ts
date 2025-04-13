// app/api/two-factor/toggle/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const csrfToken = cookieStore.get('csrf');

    if (!csrfToken || !csrfToken.value) {
      return NextResponse.json(
        { message: 'CSRF token is required' },
        { status: 403 }
      );
    }

    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');

    const { enable } = await request.json();

    if (typeof enable !== 'boolean') {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.EXPRESS_API_URL}/api/two-factor/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken.value,
        Cookie: cookieHeader,
      },
      credentials: 'include',
      body: JSON.stringify({ enable }),
    });

    if (!response.ok) {
      throw new Error(`Express error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('two-factor toggle error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}