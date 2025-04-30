// hooks/useResendActivationForm.ts
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ResendActivationSchema, resendActivationSchema } from '@/lib/schemas/auth';
import { resendActivationCode } from '@/lib/api/auth'; // Import funkcji API
import { toast } from 'sonner';

/**
 * Hook do zarządzania formularzem ponownego wysyłania kodu aktywacyjnego.
 * Obsługuje stan formularza, walidację, wywołanie API ponownego wysyłania
 * oraz stan ładowania.
 *
 * @param csrfToken - Token CSRF wymagany do wysłania żądania API.
 * @param onSuccess - Opcjonalna funkcja wywoływana po pomyślnym wysłaniu kodu.
 * @returns Obiekt zawierający instancję formularza, stan ładowania, flagę wyłączenia formularza i handler onSubmit.
 */
export function useResendActivationForm(csrfToken: string | null, onSuccess?: () => void) {
  const [isResending, setIsResending] = useState(false);
  
  const form = useForm<ResendActivationSchema>({
    resolver: zodResolver(resendActivationSchema),
    defaultValues: { email: '' }, // Domyślna wartość email może być pusta lub pre-uzupełniona jeśli dostępna (np. z URL lub contextu)
    mode: 'onChange',
  });

  /**
   * Handler wysyłania formularza ponownego wysyłania.
   * Wywołuje API ponownego wysyłania i obsługuje sukces/błąd.
   * @param data - Dane formularza (adres e-mail).
   */
  const onSubmit = form.handleSubmit(async (data) => {
    if (!csrfToken) {
      toast.error('Brak tokenu CSRF. Spróbuj odświeżyć stronę.');
      return;
    }

    setIsResending(true);
    try {
      // Wywołanie funkcji API do ponownego wysłania kodu
      await resendActivationCode(data.email, csrfToken);
      toast.success('Nowy kod aktywacyjny został wysłany.');
      form.reset(); // Resetowanie formularza po sukcesie
      onSuccess?.(); // Wywołanie opcjonalnego callbacka
    } catch (err: any) {
      // Wyświetl błąd z API lub ogólny komunikat
      toast.error(err.message || 'Wystąpił błąd podczas wysyłania kodu.');
    } finally {
      setIsResending(false);
    }
  });

  // Określa, czy formularz ponownego wysyłania powinien być wyłączony
  const isDisabled = isResending || !csrfToken; // Dodano sprawdzenie tokenu CSRF

  return {
    form, // Instancja react-hook-form
    isResending, // Czy trwa wysyłanie
    isDisabled, // Czy formularz jest wyłączony
    onSubmit, // Handler wysyłania
    // formState i inne metody form są dostępne poprzez 'form'
  };
}