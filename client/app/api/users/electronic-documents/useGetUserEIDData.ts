'use server'
import { fetchClient } from '@/lib/fetchClient';
import { cookies } from 'next/headers';
import { fetchCsrfToken } from '@/lib/csrf';
// Interfejs odpowiedzi z backendu

interface BackendResponseEID {
  success: boolean;
  data: UserDataEID;
}
export interface UserDataEID {
  user: {
    first_name: string;
    second_name: string;
    last_name: string;
    pesel: string;
    birth_date: string;
    birth_place: string;
  };
  document_number: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  photo?: string | null;
}
// Pobieranie danych usżytkownika = PASSPORT
export const useGetUserEIDData = async (): Promise<UserDataEID | null> => {
  const cookieStore = await cookies();
  const SESSION_KEY = cookieStore.get("SESSION_KEY")?.value || "";

  const csrfToken = await fetchCsrfToken(SESSION_KEY);

  const cookiesHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  const response = await fetchClient<BackendResponseEID>('/api/users/user-eid', {
    method: 'POST',
    cookies: cookiesHeader,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
  });

  return response.data;
};
