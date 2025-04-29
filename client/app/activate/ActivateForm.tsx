// components/ActivateForm.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input'; // Przykład importu z Shadcn UI
import { Button } from '@/components/ui/button'; // Przykład importu z Shadcn UI
import { toast } from 'sonner'; // Biblioteka do powiadomień
import { useRouter } from 'next/navigation'; // Hook do nawigacji
// Importujemy nasz customowy hook do pobierania tokenu CSRF
import { useCsrfToken } from '@/hooks/useCsrfToken';
// Importujemy (potencjalne) funkcje API
// import { activateAccount, resendActivationCode } from '@/lib/api/auth'; // Jeśli stworzyłeś lib/api/auth.ts
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'; // Przykład importu z Shadcn UI


// Adresy endpointów API (można przenieść do lib/api.ts lub użyć zmiennych środowiskowych tutaj)
const ACTIVATE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/auth/activate';
// const RESEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/auth/resend-activation';


export default function ActivateForm() {
  const [token, setToken] = useState(''); // Stan dla kodu aktywacyjnego wpisanego przez użytkownika
  const [isActivating, setIsActivating] = useState(false); // Stan ładowania dla procesu aktywacji
  const [isResending, setIsResending] = useState(false); // Stan ładowania dla procesu ponownego wysyłania

  // Używamy naszego customowego hooka do pobrania tokenu CSRF i jego stanów
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError } = useCsrfToken();

  const inputRef = useRef<HTMLInputElement>(null); // Ref do inputu dla autofocusu
  const router = useRouter(); // Instancja routera Next.js

  // Autofocus na input po załadowaniu komponentu
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Efekt reagujący na błąd ładowania CSRF
  useEffect(() => {
      if (csrfError) {
          // Wyświetl toast z błędem CSRF
          toast.error(`Błąd zabezpieczeń: ${csrfError}. Nie można aktywować konta.`);
          // Można tutaj dodać dalszą logikę, np. zablokować formularz na stałe
          // lub wyświetlić komunikat sugerujący odświeżenie strony.
      }
  }, [csrfError]); // Uruchom efekt, gdy zmieni się wartość csrfError


  // Funkcja obsługująca kliknięcie przycisku "Aktywuj konto"
  const handleActivate = async () => {
    // Walidacja kodu aktywacyjnego przed wysłaniem
    if (!token || token.length !== 6) {
      toast.warning('Proszę wprowadzić pełny 6-cyfrowy kod aktywacyjny (6 cyfr).');
      return; // Zakończ funkcję, jeśli walidacja nie przeszła
    }

    // Blokada, jeśli formularz już się aktywuje, CSRF się ładuje, CSRF jest null lub wystąpił błąd CSRF
    if (isActivating || isCsrfLoading || !csrfToken || csrfError) {
      console.warn('Aktywacja zablokowana: trwa ładowanie, brak tokenu CSRF lub błąd CSRF.');
      return;
    }

    setIsActivating(true); // Ustaw stan ładowania dla aktywacji

    try {
      // Właściwe wywołanie API aktywacji
      // Jeśli używasz funkcji z lib/api/auth.ts:
      // await activateAccount(token, csrfToken);

      // Jeśli robisz to bezpośrednio tutaj:
      const res = await fetch(`${ACTIVATE_URL}/api/auth/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Wysyłamy pobrany token CSRF w specjalnym nagłówku
          'X-CSRF-Token': csrfToken,
        },
        // Włączenie ciasteczek sesji, które są niezbędne do powiązania żądania z sesją użytkownika
        credentials: 'include',
        body: JSON.stringify({ activationToken: token }), // Wysyłamy wpisany kod
      });

      // Obsługa odpowiedzi z backendu
      if (!res.ok) {
        // Próba odczytania szczegółów błędu z odpowiedzi JSON
        const errorBody = await res.json().catch(() => ({ message: 'Nieznany błąd serwera podczas aktywacji.' }));
        // Rzucenie błędu z komunikatem z backendu lub ogólnym
        throw new Error(errorBody.message || 'Aktywacja konta nie powiodła się.');
      }

      // Sukces aktywacji
      toast.success('Konto zostało pomyślnie aktywowane!');
      // Przekierowanie użytkownika na stronę logowania
      router.push('/login');

    } catch (err: any) {
      // Obsługa błędów (sieci, błędu rzuconego wyżej)
      console.error('Błąd podczas aktywacji konta:', err); // Loguj błąd
      toast.error(err.message || 'Wystąpił nieoczekiwany błąd podczas aktywacji. Spróbuj ponownie.');
    } finally {
      // Zawsze wyłącz stan ładowania aktywacji, niezależnie od wyniku
      setIsActivating(false);
    }
  };

  // Funkcja obsługująca kliknięcie linku "Wyślij ponownie"
  // Wymaga implementacji endpointu na backendzie.
  const handleResendCode = async () => {
    // Blokada, jeśli już wysyłamy kod, lub formularz jest globalnie zablokowany
     if (isResending || isActivating || isCsrfLoading || csrfError) {
        console.warn('Ponowne wysyłanie kodu zablokowane: trwa inna operacja lub błąd CSRF.');
        return;
     }

     setIsResending(true); // Ustaw stan ładowania dla ponownego wysyłania

     try {
        // TODO: Tutaj powinno nastąpić wywołanie API do ponownego wysyłania kodu.
        // Prawdopodobnie backend będzie potrzebował informacji, dla którego użytkownika wysłać kod
        // (np. email, który był użyty do rejestracji - może być dostępny w sesji lub wymagany do podania).
        // Przykład wywołania (dostosuj do swojego API):
        // if (email) { // Jeśli mamy email użytkownika
        //    await resendActivationCode(email); // Jeśli używasz funkcji z lib/api/auth.ts
        // } else {
        //    // Możliwe, że backend odczyta użytkownika z sesji po credentials: 'include'
        //    const res = await fetch(RESEND_URL, { method: 'POST', credentials: 'include' });
        //    if (!res.ok) { throw new Error('Błąd HTTP...'); }
        // }

        // Symulacja sukcesu i opóźnienia dla przykładu:
        await new Promise(resolve => setTimeout(resolve, 1500)); // Symulacja opóźnienia sieci/backendu

        toast.info('Instrukcje ponownej aktywacji zostały wysłane na Twój adres e-mail (jeśli konto wymaga aktywacji).');
        console.log("TODO: Zaimplementować rzeczywiste wywołanie API do ponownego wysyłania kodu");

     } catch (err: any) {
        console.error('Błąd podczas ponownego wysyłania kodu:', err); // Loguj błąd
        toast.error(err.message || 'Nie udało się wysłać kodu ponownie. Spróbuj później.');
     } finally {
        setIsResending(false); // Zawsze wyłącz stan ładowania ponownego wysyłania
     }
  };


  // Określenie, czy cały formularz (input i przycisk) powinien być zablokowany
  const isFormDisabled = isActivating || isCsrfLoading || !csrfToken || !!csrfError;

  // Określenie, czy link "Wyślij ponownie" powinien być zablokowany
  const isResendDisabled = isResending || isActivating || isCsrfLoading || !!csrfError;


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Aktywuj konto</CardTitle>
          <CardDescription>Wpisz 6-cyfrowy kod aktywacyjny wysłany na Twój adres e-mail.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">

          {/* Komunikaty o stanie ładowania lub błędzie CSRF */}
          {isCsrfLoading && (
              <div className="text-center text-sm text-gray-500">Ładowanie zabezpieczeń...</div>
          )}
          {csrfError && (
              <div className="text-center text-sm text-red-500">{csrfError}. Spróbuj odświeżyć stronę.</div>
          )}

          {/* Formularz widoczny tylko jeśli CSRF został załadowany bez błędów */}
          {!isCsrfLoading && !csrfError && (
              <>
                  <Input
                      ref={inputRef}
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Kod aktywacyjny"
                      maxLength={6} // Ograniczenie do 6 znaków
                      disabled={isFormDisabled} // Blokowanie inputu
                      className="text-center tracking-widest text-xl" // Stylowanie inputu
                      inputMode="numeric" // Sugeruje klawiaturę numeryczną na urządzeniach mobilnych
                      pattern="\d{6}" // Opcjonalnie: pattern dla walidacji HTML5
                      autoComplete="one-time-code" // Sugeruje przeglądarce podpowiedź kodu SMS/email
                  />
                  <Button
                      onClick={handleActivate}
                      // Przycisk zablokowany jeśli: formularz zablokowany (aktywacja, CSRF),
                      // lub token ma niepoprawną długość
                      disabled={isFormDisabled || token.length !== 6}
                      className="w-full"
                  >
                      {isActivating ? 'Aktywowanie...' : 'Aktywuj konto'}
                  </Button>
                  <p className="text-center text-xs text-gray-500">
                      Nie otrzymałeś kodu?{' '}
                      <span
                          className={`underline cursor-pointer text-primary ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary/80'}`}
                          onClick={isResendDisabled ? undefined : handleResendCode} // Zablokuj kliknięcie, jeśli zablokowany
                      >
                          {isResending ? 'Wysyłanie...' : 'Wyślij ponownie'}
                      </span>
                  </p>
              </>
          )}
           {/* Możesz dodać loading spinner lub inny wskaźnik na czas ładowania CSRF */}
            {/* {isCsrfLoading && <div className="... loading spinner ..."></div>} */}
        </CardContent>
      </Card>
    </div>
  );
}