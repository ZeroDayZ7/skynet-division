/**
 * Hook do zarządzania stanem i wysyłaniem formularza aktywacji konta.
 * @module hooks/useActivateForm
 */

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCsrfToken } from '@/hooks/useCsrfToken';
import { useActivate } from './useActivate';
import { activateSchema, resendActivationSchema, ActivateSchema, ResendActivationSchema } from '@/lib/schemas/auth';

interface ActivateFormState {
  form: ReturnType<typeof useForm<ActivateSchema>>;
  resendForm: ReturnType<typeof useForm<ResendActivationSchema>>;
  isActivating: boolean;
  isResending: boolean;
  isLoading: boolean;
  isFormDisabled: boolean;
  isResendDisabled: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onResendSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  refreshCsrfToken: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

/**
 * Zarządza formularzem aktywacji z walidacją, CSRF i ponownym wysyłaniem kodu.
 * @returns Stan formularza i obsługa zdarzeń.
 */
export function useActivateForm(): ActivateFormState {
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError, refreshToken } = useCsrfToken();
  const { activate, resendCode, isActivating, isResending } = useActivate();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ActivateSchema>({
    resolver: zodResolver(activateSchema),
    defaultValues: {
      activationToken: '',
    },
    mode: 'onChange',
  });

  const resendForm = useForm<ResendActivationSchema>({
    resolver: zodResolver(resendActivationSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (csrfError) {
      toast.error(`Błąd zabezpieczeń: ${csrfError}. Proszę odświeżyć stronę.`);
    }
  }, [csrfError]);

  const onSubmit = async (data: ActivateSchema) => {
    if (!csrfToken || csrfError) {
      toast.error('Brak tokenu CSRF lub błąd zabezpieczeń. Proszę odświeżyć stronę.');
      return;
    }

    try {
      await activate(data, csrfToken);
      toast.success('Konto aktywowane pomyślnie!');
      form.reset();
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Aktywacja nie powiodła się. Spróbuj ponownie.');
    }
  };

  const onResendSubmit = async (data: ResendActivationSchema) => {
    try {
      await resendCode(data);
      toast.info('Nowy kod aktywacyjny został wygenerowany i zapisany w bazie danych.');
      resendForm.reset();
    } catch (err: any) {
      toast.error(err.message || 'Nie udało się wygenerować nowego kodu. Spróbuj ponownie.');
    }
  };

  const isFormDisabled = isActivating || isCsrfLoading || !csrfToken || !!csrfError;
  const isResendDisabled = isResending || isActivating || isCsrfLoading || !!csrfError;

  return {
    form,
    resendForm,
    isActivating,
    isResending,
    isLoading: isCsrfLoading,
    isFormDisabled,
    isResendDisabled,
    onSubmit: form.handleSubmit(onSubmit),
    onResendSubmit: resendForm.handleSubmit(onResendSubmit),
    refreshCsrfToken: refreshToken,
    inputRef,
  };
}