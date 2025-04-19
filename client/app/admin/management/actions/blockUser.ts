'use server';

import { cookies } from 'next/headers';
import { fetchCsrfToken } from '@/lib/csrf';
import { redirect } from 'next/navigation'; // Do przekierowania na stronę logowania

export async function blockUser(userId: string) {
  try {
    console.log(`[blockUser] Rozpoczynanie blokady dla userId: ${userId}`);
    const cookieStore = await cookies();
    const cookiesHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
    const SESSION_KEY = cookieStore.get("SESSION_KEY")?.value || "";
    const csrfToken = await fetchCsrfToken(SESSION_KEY);
    const cookiesSession = `SESSION_KEY=${SESSION_KEY}`;
    console.log(SESSION_KEY);

    const response = await fetch(`http://localhost:3001/api/admin/users/${userId}/block`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', 
        'X-CSRF-Token': csrfToken, // Dodajemy token CSRF do nagłówków
        // 'Cookie': cookiesHeader, // Dodajemy ciasteczka do nagłówków
        'Cookie': cookiesSession, // Dodajemy ciasteczka do nagłówków
      },
      credentials: 'include', // Dla pewności, że ciasteczka są wysyłane
    });

    console.log(`[blockUser] Status odpowiedzi: ${response.status}, OK: ${response.ok}`);
    
    // Jeśli status to 401 Unauthorized
    if (response.status === 401) {
      console.log(`[blockUser] Użytkownik nieautoryzowany, usuwam ciasteczka i przekierowuję`);
      
      // Usuwamy ciasteczka
      const cookieStore = await cookies();
      cookieStore.delete("JWT_COOKIE");  // Usunięcie JWT_COOKIE
      cookieStore.delete("SESSION_KEY"); // Usunięcie SESSION_KEY
       // Przekierowanie do strony 401 Unauthorized
      // Przekierowanie na stronę logowania (lub stronę główną)
      // Możesz zmienić na '/login' lub inną stronę
      redirect('/login?error=unauthorized');
      // setTimeout(() => {
      //   redirect('/login'); // Możesz zmienić czas na inny (w milisekundach)
      // }, 4000);  // Czas w milisekundach (np. 3000 = 3 sekundy)//Można również użyć redirect('/') jeśli chcesz przekierować na stronę główną
      return;
    }

    if (!response.ok) {
      const errorText = await response.json();
      console.error(`[blockUser] Błąd odpowiedzi serwera: ${response.status}, treść: ${errorText}`);
      throw new Error(`Błąd blokowania użytkownika: ${response.status} ${errorText.message}`);
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
