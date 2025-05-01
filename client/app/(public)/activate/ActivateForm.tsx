// app/activate/components/ActivateForm.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import dynamic from 'next/dynamic';
// Importujemy hook tylko do typu, jeśli potrzebne (lub usunąć jeśli nie używamy Form<Schema>)
// import { useForm } from 'react-hook-form';
// Importujemy schematy tylko do typu, jeśli potrzebne
// import { ActivateSchema, ResendActivationSchema } from '@/lib/schemas/auth';

// Importujemy nowy, dedykowany hook do formularza aktywacji
import { useActivateAccountForm } from './useActivateAccountForm';

// Dynamiczne ładowanie komponentu dialogu ponownego wysyłania
// Ten komponent zostanie załadowany tylko, gdy zmienna 'open' w ResendActivationDialog będzie true.
const DynamicResendActivationDialog = dynamic(
  () => import('./ResendActivationDialog'),
  {
    ssr: false, // Nie renderuj na serwerze, bo zawiera logikę kliencką (stan dialogu, hooki)
    loading: () => <div className="text-center text-sm text-gray-500">Ładowanie okna...</div>, // Stan ładowania podczas dynamicznego importu
  }
);

/**
 * Propsy dla komponentu formularza aktywacji.
 * Ten komponent skupia się na formularzu kodu aktywacyjnego
 * i zarządzaniu otwarciem dialogu ponownego wysyłania.
 */
interface ActivateFormProps {
  /** Token CSRF wymagany do wywołań API. */
  csrfToken: string | null;
  /** Czy trwa początkowe ładowanie danych (np. tokenu CSRF). */
  isLoadingInitial: boolean;
  /** Flaga określająca, czy przycisk ponownego wysyłania powinien być wyłączony (np. timer, globalny stan ładowania). */
  isResendLinkDisabled: boolean; // Teraz ten stan będzie przekazywany z góry lub zarządzany lokalnie jeśli prosty timer
}

/**
 * Komponent renderujący formularz aktywacji konta oraz link do ponownego wysłania kodu.
 * Wykorzystuje hook useActivateAccountForm do logiki głównego formularza.
 * Renderuje dynamicznie ładowany dialog ponownego wysyłania.
 *
 * @param props - Propsy komponentu.
 * @returns Element JSX reprezentujący formularze i link.
 */
export default function ActivateForm({
  csrfToken,
  isLoadingInitial,
  isResendLinkDisabled, // Przyjmujemy stan wyłączenia linku
}: ActivateFormProps) {
  // Zarządzamy stanem otwarcia dialogu ponownego wysyłania lokalnie
  const [dialogOpen, setDialogOpen] = useState(false);

  // Używamy dedykowanego hooka do zarządzania logiką formularza aktywacji
  const {
    form, // Instancja react-hook-form z hooka
    isActivating, // Stan ładowania aktywacji z hooka
    isFormDisabled, // Stan wyłączenia formularza z hooka (uwzględnia isActivating i csrfToken)
    onSubmit, // Handler wysyłania aktywacji z hooka
  } = useActivateAccountForm(csrfToken);

  // Flaga łącząca stan początkowego ładowania (np. CSRF) ze stanem formularza aktywacji
  const isPageLoading = isLoadingInitial || isActivating;

  return (
    <div className="flex flex-col space-y-4">
      {/* Komunikat ładowania początkowego (np. CSRF) */}
      {isLoadingInitial && <div className="text-center text-sm text-gray-500">Ładowanie danych...</div>}

      {/* Główny formularz aktywacji */}
      {!isLoadingInitial && (
        <Form {...form}>
          {/* onSubmit z hooka useActivateAccountForm */}
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="activationToken"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="activationToken"
                      placeholder="Kod aktywacyjny"
                      maxLength={6}
                      // Używamy stanu wyłączenia z hooka useActivateAccountForm
                      disabled={isFormDisabled}
                      className="text-center tracking-widest text-xl"
                      inputMode="numeric"
                      pattern="[0-9]{6}" // Upewniamy się, że input przyjmuje tylko cyfry
                      autoComplete="one-time-code" // Sugestia przeglądarki do kodów SMS/email
                      autoFocus={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              // Przycisk wyłączony gdy formularz jest wyłączony LUB gdy formularz nie jest poprawny
              disabled={isFormDisabled || !form.formState.isValid}
            >
              {/* Tekst przycisku zależny od stanu ładowania aktywacji */}
              {isActivating ? 'Aktywowanie...' : 'Aktywuj konto'}
            </Button>
          </form>
        </Form>
      )}

      {/* Link do ponownego wysłania kodu */}
      <p className="text-center text-xs text-gray-500">
        Nie otrzymałeś kodu?{' '}
        <span
          className={`underline cursor-pointer text-primary ${
            // Wyłączenie linku na podstawie przekazanej flagi lub stanu ładowania
            isResendLinkDisabled || isPageLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary/80'
          }`}
          // Wywołujemy otwarcie dialogu tylko jeśli link nie jest wyłączony
          onClick={isResendLinkDisabled || isPageLoading ? undefined : () => setDialogOpen(true)}
          // Opcjonalnie tekst przy ładowaniu/wysyłaniu ponownym - ale to jest w dialogu, więc tu lepiej po prostu wyłączyć
          // {isResending ? 'Wysyłanie...' : 'Wyślij ponownie'}
        >
          Wyślij ponownie
        </span>
      </p>

      {/* Dynamicznie ładowany komponent dialogu ponownego wysyłania */}
      {/* Renderowany tylko gdy dialogOpen jest true */}
      {dialogOpen && (
        <DynamicResendActivationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          csrfToken={csrfToken} // Przekazujemy token do dialogu
        />
      )}
    </div>
  );
}