// hooks/useCsrfToken.ts
'use client';

import { useState, useEffect } from 'react';
import { fetchCsrfToken } from '@/lib/csrf'; // Importujemy funkcję z zrefaktoryzowanego pliku lib

// Hook do pobierania tokenu CSRF i zarządzania jego stanem.
// Zwraca token, stan ładowania oraz ewentualny błąd.
export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Dodano stan ładowania
  const [error, setError] = useState<string | null>(null); // Dodano stan błędu

  useEffect(() => {
    const loadToken = async () => {
      setIsLoading(true); // Ustaw ładowanie na true przed rozpoczęciem
      setError(null); // Wyczyść poprzednie błędy

      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (err: any) {
        console.error("useCsrfToken napotkał błąd:", err); // Loguj błąd
        setError(err.message || 'Nieznany błąd podczas ładowania tokenu zabezpieczającego.'); // Ustaw komunikat błędu
        setCsrfToken(null); // Upewnij się, że token jest null w przypadku błędu
      } finally {
        setIsLoading(false); // Zawsze ustaw ładowanie na false
      }
    };

    loadToken(); // Wywołaj funkcję pobierającą token

    // Pusta tablica zależności oznacza, że efekt uruchomi się tylko raz po pierwszym renderowaniu komponentu.
  }, []);

  // Zwracamy obiekt zawierający wszystkie stany
  return { csrfToken, isLoading, error };
}