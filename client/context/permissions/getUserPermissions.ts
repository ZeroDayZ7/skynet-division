'use server';
import { cookies } from 'next/headers';
import { fetchCsrfToken } from '@/lib/csrf';

export interface UserPermissions {
  role: string;
  permissions: Record<string, { enabled: boolean,  visible: boolean }>; // Zmieniamy na obiekt
}

export async function getUserPermissions(): Promise<UserPermissions | null> {
  try {
    const cookieStore = await cookies();
    const SESSION_KEY = cookieStore.get('SESSION_KEY')?.value || '';
    const csrfToken = await fetchCsrfToken(SESSION_KEY);
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const res = await fetch(`${process.env.EXPRESS_API_URL}/api/users/permissions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        Cookie: cookiesHeader,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (!json?.data || !json.success) {
      return null;
    }

    console.log('Pobrano uprawnienia użytkownika:', json.data);

    return json.data as UserPermissions; // Zwracamy dane w oczekiwanym formacie
  } catch (error) {
    console.error('Błąd podczas pobierania uprawnień użytkownika:', error);
    return null;
  }
}
