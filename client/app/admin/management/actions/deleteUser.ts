// app/user-management/actions/deleteUser.ts
'use server';

import { cookies } from 'next/headers';

export async function deleteUser(userId: string) {
  try {
    console.log(`[deleteUser] Rozpoczynanie usuwania dla userId: ${userId}`);
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    console.log(`[deleteUser] Wysłanie żądania z ciasteczkami: ${cookiesHeader}`);
    const response = await fetch(`http://localhost:3001/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookiesHeader,
      },
      credentials: 'include', // Dla pewności, że ciasteczka są wysyłane
    });

    console.log(`[deleteUser] Status odpowiedzi: ${response.status}, OK: ${response.ok}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[deleteUser] Błąd odpowiedzi serwera: ${response.status}, treść: ${errorText}`);
      throw new Error(`Błąd usuwania użytkownika: ${response.status} ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType?.includes('application/json')) {
      console.error(`[deleteUser] Oczekiwano JSON, otrzymano Content-Type: ${contentType}`);
      throw new Error('Nieprawidłowy format odpowiedzi serwera');
    }

    const result = await response.json();
    console.log(`[deleteUser] Użytkownik usunięty: userId=${userId}, odpowiedź: ${JSON.stringify(result)}`);
    return result; // Zwracamy odpowiedź, np. { message: 'Użytkownik został usunięty' }
  } catch (error) {
    console.error(`[deleteUser] Błąd podczas usuwania:`, error);
    throw error;
  }
}