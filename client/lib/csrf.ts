// lib/csrf.ts

// Funkcja pomocnicza do bezpiecznego pobierania tokenu CSRF z backendu.
// Wymaga, aby backend udostępniał endpoint, który dla zalogowanej sesji
// zwraca token CSRF. Przeglądarka automatycznie wysyła ciasteczka sesji
// dzięki opcji `credentials: 'include'`.
export async function fetchCsrfToken(): Promise<string> {
  // Użyj zmiennej środowiskowej do przechowywania adresu URL endpointu CSRF.
  // Upewnij się, że zmienna jest dostępna po stronie klienta (np. z prefiksem NEXT_PUBLIC_ w Next.js).
  const CSRF_TOKEN_URL = process.env.NEXT_PUBLIC_BACKEND_CSRF_URL || 'http://localhost:3001/api/csrf-token';

  try {
    const response = await fetch(CSRF_TOKEN_URL, {
      method: 'GET',
      // Kluczowe dla wysyłania ciasteczek sesji (w tym odpowiedzialnych za sesję, z którą token jest powiązany)
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // Nie wysyłamy ręcznie ciasteczek. Przeglądarka zrobi to automatycznie.
      },
      // Dodatkowe opcje, np. cache: 'no-store' jeśli chcesz zawsze świeży token
      cache: 'no-store',
    });

    // Obsługa odpowiedzi, która nie jest OK (np. 401, 403, 500)
    if (!response.ok) {
      let errorMessage = `Błąd HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody && errorBody.message) {
          errorMessage += ` - ${errorBody.message}`;
        }
      } catch (jsonError) {
        // Ignorujemy błędy parsowania JSON, jeśli odpowiedź nie była JSONem z błędem
      }
      console.error('Błąd podczas pobierania tokenu CSRF:', errorMessage);
      throw new Error(`Nie udało się pobrać tokenu zabezpieczającego. ${errorMessage}`);
    }

    const data = await response.json();

    // Walidacja formatu odpowiedzi
    if (!data || typeof data.csrfToken !== 'string') {
        console.error('Nieprawidłowy format odpowiedzi z backendu dla CSRF:', data);
        throw new Error('Otrzymano nieprawidłowe dane tokenu zabezpieczającego z serwera.');
    }

    // Usunięto console.log() - logowanie tylko błędów
    // console.log('Pobrany token CSRF:', data.csrfToken); // Można zostawić podczas developmentu

    return data.csrfToken;

  } catch (error: any) {
    // Obsługa błędów sieciowych lub innych nie-HTTP
    console.error('Błąd sieci lub parsowania podczas pobierania tokenu CSRF:', error);
    throw new Error(`Problem z komunikacją z serwerem podczas pobierania tokenu zabezpieczającego: ${error.message}`);
  }
}

// Możesz tutaj dodać inne funkcje API, np. do aktywacji, ponownego wysyłania itp.,
// lub stworzyć dla nich osobne pliki w folderze lib/api/auth.ts
// Przykład strukturyzacji:
// lib/api/auth.ts
/*
import { fetchCsrfToken } from '@/lib/csrf'; // Jeśli potrzebujesz CSRF w innych zapytaniach

export async function activateAccount(activationToken: string, csrfToken: string): Promise<void> {
    const ACTIVATE_URL = process.env.NEXT_PUBLIC_BACKEND_ACTIVATE_URL || 'http://localhost:3001/api/auth/activate';

    const response = await fetch(ACTIVATE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken, // Użycie pobranego tokenu
        },
        credentials: 'include',
        body: JSON.stringify({ activationToken }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: 'Nieznany błąd serwera' }));
        throw new Error(errorBody.message || 'Aktywacja konta nie powiodła się.');
    }
    // Brak zwracanej wartości lub zwrócenie danych sukcesu, jeśli backend coś zwraca
}

export async function resendActivationCode(email: string): Promise<void> {
    // Zakładamy, że endpoint ponownego wysyłania nie wymaga CSRF, ale może wymagać danych użytkownika (np. email)
    // Jeśli wymaga CSRF, pobierz go najpierw.
    const RESEND_URL = process.env.NEXT_PUBLIC_BACKEND_RESEND_URL || 'http://localhost:3001/api/auth/resend-activation';

     const response = await fetch(RESEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include', // Może być potrzebne, jeśli backend wymaga sesji
        body: JSON.stringify({ email }), // lub inny identyfikator użytkownika
     });

     if (!response.ok) {
         const errorBody = await response.json().catch(() => ({ message: 'Nieznany błąd serwera' }));
         throw new Error(errorBody.message || 'Nie udało się wysłać kodu ponownie.');
     }
     // Brak zwracanej wartości lub zwrócenie danych sukcesu
}
*/