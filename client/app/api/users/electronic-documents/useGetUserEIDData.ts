import { cookies } from 'next/headers';
import { fetchCsrfToken } from "@/lib/csrf";

interface BackendResponseEID {
  success: boolean;
  message: string;
  data?: UserDataEID;  // Może być undefined, jeśli success === false
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

// Pobieranie danych użytkownika = ELEKTRONICZNY DOWÓD
export const useGetUserEIDData = async (): Promise<UserDataEID | null> => {
  const cookieStore = await cookies();
  const cookiesHeader = cookieStore
  .getAll()
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join('; ');

  const SESSION_KEY = cookieStore.get('SESSION_KEY')?.value || ''; // 3. pobierz token CSRF z ciasteczek
  console.log(`TokenCSRF z ciasteczek: ${SESSION_KEY}`); // 4. loguj token CSRF z ciasteczek

  const csrfToken = await fetchCsrfToken(SESSION_KEY); // 1. pobierz CSRF token
  // console.log(`TokenCSRF: ${csrfToken}`); // 2. loguj token CSRF

  
  
 
  try {
    const response = await fetch('http://localhost:3001/api/users/user-eid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        cookies: cookiesHeader,
      },
      body: JSON.stringify({}),  // Jeśli trzeba przesłać dane w body
      credentials: 'include',  // Używamy ciasteczek w żądaniu
    });

    if (response.status === 401) {
      throw new Error("Brak autoryzacji.");
    }
    
    if (!response.ok) {
      throw new Error("Nie udało się pobrać danych użytkownika");
    }

    const data: BackendResponseEID = await response.json();
    console.log('useGetUserEIDData', data);

    // Obsługa odpowiedzi, jeśli success === false
    if (!data.success) {
      throw new Error(data.message || 'Nie udało się pobrać danych użytkownika');
    }

    return data.data || null;  // Jeśli success === true, zwróć dane użytkownika
  } catch (error: any) {
    // Obsługuje wszystkie błędy (np. problemy z siecią, błędy w odpowiedzi API)
    throw new Error(error.message || 'Wystąpił błąd podczas pobierania danych');
  }
};
