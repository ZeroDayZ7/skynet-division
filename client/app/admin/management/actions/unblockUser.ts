// app/user-management/actions/unblockUser.ts
'use server';

import { cookies } from 'next/headers';

export async function unblockUser(userId: string) {
  try {
    console.log(`[unblockUser] Rozpoczynanie odblokowania dla userId: ${userId}`);
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    console.log(`[unblockUser] Wysłanie żądania z ciasteczkami: ${cookiesHeader}`);
    const response = await fetch(`http://localhost:3001/api/admin/users/${userId}/unblock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookiesHeader,
      },
      credentials: 'include',
    });

    console.log(`[unblockUser] Status odpowiedzi: ${response.status}, OK: ${response.ok}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[unblockUser] Błąd odpowiedzi serwera: ${response.status}, treść: ${errorText}`);
      throw new Error(`Błąd odblokowania użytkownika: ${response.status} ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType?.includes('application/json')) {
      console.error(`[unblockUser] Oczekiwano JSON, otrzymano Content-Type: ${contentType}`);
      throw new Error('Nieprawidłowy format odpowiedzi serwera');
    }

    const result = await response.json();
    console.log(`[unblockUser] Użytkownik odblokowany: userId=${userId}, odpowiedź: ${JSON.stringify(result)}`);
    return result; // Zwracamy odpowiedź, np. { message: 'Użytkownik został odblokowany' }
  } catch (error) {
    console.error(`[unblockUser] Błąd podczas odblokowania:`, error);
    throw error;
  }
}