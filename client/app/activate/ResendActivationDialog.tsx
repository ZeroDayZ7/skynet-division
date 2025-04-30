// app/activate/components/ResendActivationDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
// Importujemy dedykowany hook do ponownego wysyłania
import { useResendActivationForm } from './useResendActivationForm';
import { useForm } from 'react-hook-form'; // Potrzebne tylko do typu propów, jeśli tak zdecydujemy

/**
 * Propsy dla komponentu dialogu ponownego wysyłania kodu aktywacyjnego.
 */
interface ResendActivationDialogProps {
  /** Określa, czy dialog jest otwarty. */
  open: boolean;
  /** Funkcja wywoływana przy zmianie stanu otwarcia dialogu. */
  onOpenChange: (open: boolean) => void;
  /** Token CSRF wymagany do wywołania API. */
  csrfToken: string | null;
}

/**
 * Komponent renderujący dialog do ponownego wysyłania kodu aktywacyjnego.
 * Zawiera formularz na adres e-mail i wykorzystuje hook useResendActivationForm do logiki.
 * @param props - Propsy komponentu.
 * @returns Element JSX reprezentujący dialog.
 */
export default function ResendActivationDialog({
  open,
  onOpenChange,
  csrfToken,
}: ResendActivationDialogProps) {
  // Używamy dedykowanego hooka do zarządzania logiką formularza ponownego wysyłania
  const {
    form, // Instancja react-hook-form z hooka
    isResending, // Stan ładowania z hooka
    isDisabled, // Stan wyłączenia z hooka (uwzględnia isResending i csrfToken)
    onSubmit, // Handler wysyłania z hooka
  } = useResendActivationForm(csrfToken, () => {
      // Callback onSuccess do zamknięcia dialogu po sukcesie
      onOpenChange(false);
      // Tutaj można dodać toast.success, ale jest już w hooku, więc to opcjonalne
    });

  // Efekt do zamknięcia dialogu, jeśli hook zgłosi sukces wysłania (np. przez isSubmitSuccessful)
  // Możemy polegać na callbacku onSuccess przekazanym do hooka, ale można też tak:
   useEffect(() => {
     // Sprawdź, czy hook zakończył wysyłanie i czy formularz hooka zgłasza sukces
     // Uwaga: stan isSubmitSuccessful w react-hook-form resetuje się przy reset()
     // Najprościej polegać na onSuccess callback przekazanym do useResendActivationForm
     if (!isResending && form.formState.isSubmitSuccessful) {
        // onOpenChange(false); // Zamykamy dialog jeśli formularz został pomyślnie wysłany
     }
   }, [isResending, form.formState.isSubmitSuccessful, onOpenChange]); // Dodano isResending do zależności

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Ponowne wysłanie kodu</DialogTitle>
          <DialogDescription>
            Wpisz adres e-mail, aby otrzymać nowy kod aktywacyjny.
          </DialogDescription>
        </DialogHeader>
        {/* Formularz zarządzany przez hook useResendActivationForm */}
        <Form {...form}>
          {/* onSubmit z hooka */}
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Wprowadź adres e-mail"
                      autoComplete="email"
                      // Używamy stanu wyłączenia z hooka
                      disabled={isDisabled}
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
              // Używamy stanu wyłączenia i walidacji formularza z hooka
              disabled={isDisabled || !form.formState.isValid}
            >
              {/* Tekst przycisku zależny od stanu ładowania */}
              {isResending ? 'Wysyłanie...' : 'Wyślij kod'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}