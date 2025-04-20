'use server';
import { cookies } from 'next/headers';
import { fetchCsrfToken } from '@/lib/csrf';

export interface UserPermissions {
  role: string;
  permissions: string[];
}

export async function getUserPermissions(): Promise<UserPermissions | null> {
  try {
     const cookieStore = await cookies();
        const SESSION_KEY = cookieStore.get('SESSION_KEY')?.value || '';
        const csrfToken = await fetchCsrfToken(SESSION_KEY);
        // const cookiesSession = `SESSION_KEY=${SESSION_KEY}`;
        const cookiesHeader = cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join('; ');

    const res = await fetch(`${process.env.EXPRESS_API_URL}/api/user/permissions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRF-Token': csrfToken,
        // Cookie: cookiesHeader,
      },
      cache: 'no-store', // ważne w przypadku SSR, żeby fetch był świeży
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (!json?.data || !json.success) {
      return null;
    }

    return json.data as UserPermissions;
  } catch (error) {
    console.error('Błąd podczas pobierania uprawnień użytkownika:', error);
    return null;
  }
}
