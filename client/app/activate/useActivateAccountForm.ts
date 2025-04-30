// hooks/useActivateAccountForm.ts
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { activateAccount } from '@/lib/api/auth'; // Import tylko aktywacji
import { ActivateSchema, activateSchema } from '@/lib/schemas/auth'; // Import tylko schematu aktywacji

/**
 * Hook do zarządzania formularzem aktywacji konta.
 * Obsługuje stan formularza, walidację oraz wywołanie API aktywacji.
 *
 * @param csrfToken - Token CSRF wymagany do wysłania żądania API.
 * @returns Obiekt zawierający instancję formularza, stan ładowania, flagę wyłączenia formularza i handler onSubmit.
 */
export function useActivateAccountForm(csrfToken: string | null) {
  const [isActivating, setIsActivating] = useState(false);
  const router = useRouter();

  const form = useForm<ActivateSchema>({
    resolver: zodResolver(activateSchema),
    defaultValues: { activationToken: '' },
    mode: 'onSubmit',
  });

  /**
   * Handler wysyłania formularza aktywacji.
   * Wywołuje API aktywacji i obsługuje sukces/błąd.
   * @param data - Dane formularza (token aktywacyjny).
   */
  const onSubmit = form.handleSubmit(async (data) => {
    if (!csrfToken) {
      toast.error('Brak tokenu zabezpieczającego. Spróbuj odświeżyć stronę.');
      return;
    }

    setIsActivating(true);
    try {
      await activateAccount(data.activationToken, csrfToken);
      toast.success('Konto aktywowane pomyślnie!');
      form.reset();
      // Przekieruj użytkownika po udanej aktywacji
      router.push('/login'); // Przykład przekierowania na stronę logowania
    } catch (err: any) {
      // Wyświetl błąd z API lub ogólny komunikat
      toast.error(err.message || 'Wystąpił błąd podczas aktywacji konta.');
    } finally {
      setIsActivating(false);
    }
  });

  // Określa, czy formularz powinien być wyłączony (podczas ładowania lub braku tokenu)
  const isFormDisabled = isActivating || !csrfToken;

  return {
    form,
    isActivating,
    isFormDisabled,
    onSubmit,
  };
}