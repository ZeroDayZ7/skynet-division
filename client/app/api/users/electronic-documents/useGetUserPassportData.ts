import { fetchClient } from '@/lib/fetchClient';
import { cookies } from 'next/headers';
// Interfejs odpowiedzi z backendu

interface BackendResponsePassport {
  success: boolean;
  data: UserDataPassport;
}
export interface UserDataPassport {
  user: {
    first_name: string;
    second_name: string;
    last_name: string;
    pesel: string;
    birth_date: string;
    birth_place: string;
  };
  passport_number: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  photo?: string | null;
}
// Pobieranie danych usżytkownika = PASSPORT
export const useGetUserPassportData = async (): Promise<UserDataPassport | null> => {
  const cookieStore = await cookies();
  const cookiesHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  const response = await fetchClient<BackendResponsePassport>('/api/users/user-passport', {
    method: 'POST',
    cookies: cookiesHeader,
    csrf: true,
  });

  return response.data;
};
