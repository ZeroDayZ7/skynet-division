// app/activate/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppBrand } from '@/components/auth/AppBrand'; // Zakładając, że to Twój komponent brandu
// Importujemy hook do zarządzania tokenem CSRF
import { useCsrfToken } from '@/hooks/useCsrfToken';
// Importujemy komponent formularza aktywacji (nie dynamicznie tutaj)
import ActivateForm from './ActivateForm';
import { Button } from '@/components/ui/button';

/**
 * Renderuje stronę aktywacji konta.
 * Strona zawiera kartę z tytułem, opisem i formularzem aktywacji.
 * Zarządza pobieraniem tokenu CSRF.
 * @returns Element JSX reprezentujący stronę aktywacji.
 */
export default function ActivatePage() {
  // Pobieramy token CSRF i stan ładowania/błędu przy użyciu dedykowanego hooka
  const { csrfToken, isLoading: isLoadingCsrf, error: csrfError, refreshToken } = useCsrfToken();

  // Możesz obsłużyć csrfError, np. wyświetlając komunikat błędu na stronie
  if (csrfError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-4 text-red-500">
        Błąd ładowania strony: {csrfError}. Proszę spróbować odświeżyć.
        {/* Możesz dodać przycisk odświeżania refreshToken */}
        <Button onClick={refreshToken} className="mt-4">Odśwież token</Button>
      </div>
    );
  }

  // Tutaj możesz dodać logikę dotyczącą wyłączenia linku ponownego wysyłania (np. timer)
  // Na razie pozostawiamy prostą flagę, którą można rozwinąć.
  const isResendLinkDisabled = false; // TODO: Zaimplementuj timer lub inną logikę wyłączenia

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-4">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col items-center space-y-2">
          {/* Komponent brandu aplikacji */}
          <AppBrand />
          <div className="mt-4 text-center">
            <CardTitle>Aktywuj konto</CardTitle>
            <CardDescription>Wpisz 6-cyfrowy kod wysłany na Twój e-mail.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* Przekazujemy token CSRF i stan ładowania CSRF do formularza aktywacji */}
          <ActivateForm
            csrfToken={csrfToken}
            isLoadingInitial={isLoadingCsrf}
            isResendLinkDisabled={isResendLinkDisabled}
            // Formularz aktywacji używa własnego hooka, więc nie przekazujemy mu już resendForm, onResendSubmit itp.
          />
        </CardContent>
      </Card>
    </div>
  );
}