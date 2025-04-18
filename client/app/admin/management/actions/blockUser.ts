// app/user-management/actions/blockUser.ts
'use server';

import { cookies } from 'next/headers';

export async function blockUser(userId: string) {
  try {
    console.log(`[blockUser] Rozpoczynanie blokady dla userId: ${userId}`);
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    console.log(`[blockUser] Wysłanie żądania z ciasteczkami: ${cookiesHeader}`);
    const response = await fetch(`http://localhost:3001/api/admin/users/${userId}/block`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookiesHeader,
      },
      credentials: 'include', // Dla pewności, że ciasteczka są wysyłane
    });

    console.log(`[blockUser] Status odpowiedzi: ${response.status}, OK: ${response.ok}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[blockUser] Błąd odpowiedzi serwera: ${response.status}, treść: ${errorText}`);
      throw new Error(`Błąd blokowania użytkownika: ${response.status} ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType?.includes('application/json')) {
      console.error(`[blockUser] Oczekiwano JSON, otrzymano Content-Type: ${contentType}`);
      throw new Error('Nieprawidłowy format odpowiedzi serwera');
    }

    const result = await response.json();
    console.log(`[blockUser] Użytkownik zablokowany: userId=${userId}, odpowiedź: ${JSON.stringify(result)}`);
    return result; // Zwracamy odpowiedź, np. { message: 'Użytkownik został zablokowany' }
  } catch (error) {
    console.error(`[blockUser] Błąd podczas blokowania:`, error);
    throw error;
  }
}