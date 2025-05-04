import { UserPermissions } from './types';
import { fetchClient } from '@/lib/fetchClient';

const URL = '/api/users/permissions';

export async function getUserPermissions(csrfToken: string): Promise<UserPermissions | null> {
  try {
    const data = await fetchClient(URL, {
      method: 'GET',
      headers: {
        'X-CSRF-Token': csrfToken,
      },
      cache: 'no-store',
    });

    console.log('Pobrano uprawnienia użytkownika:', data);

    if (!data || !data.permissions) {
      return null;
    }

    return { permissions: data.permissions };
  } catch (error) {
    console.error('Błąd podczas pobierania uprawnień użytkownika:', error);
    return null;
  }
}
