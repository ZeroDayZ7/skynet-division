'use server';

import { cookies } from 'next/headers';
import { fetchCsrfToken } from '@/lib/csrf';
import { Permissions } from '@/context/permissions/types';

export async function fetchUserPermissions(userId: string): Promise<Permissions | null> {
  try {
    const cookieStore = await cookies();
    const SESSION_KEY = cookieStore.get('SESSION_KEY')?.value || '';
    const csrfToken = await fetchCsrfToken(SESSION_KEY);
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const response = await fetch(`${process.env.EXPRESS_API_URL}/api/users/permissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        Cookie: cookiesHeader,
      },
      body: JSON.stringify({ userId }),
      cache: 'no-store',
    });

    const data = await response.json();
    console.log('Pobrano uprawnienia użytkownika:', data);

    if (!response.ok || !data.success) {
      return null;
    }

    return data.permissions as Permissions;
  } catch (error) {
    console.error('Błąd podczas pobierania uprawnień użytkownika:', error);
    return null;
  }
}