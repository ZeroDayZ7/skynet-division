import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { fetchCsrfToken } from '@/lib/csrf';
import { activateAccount, resendActivationCode } from '@/lib/api/auth';
import { ActivateSchema, ResendActivationSchema, activateSchema, resendActivationSchema } from '@/lib/schemas/auth';

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
  refreshCsrfToken: () => Promise<void>;
  onResendSuccess?: () => void; // Nowy callback dla sukcesu ponownego wysyłania
}

/**
 * Zarządza formularzem aktywacji i ponownym wysyłaniem kodu.
 * @returns Stan formularza i obsługa zdarzeń.
 */
export function useActivateForm({ onResendSuccess }: { onResendSuccess?: () => void } = {}): ActivateFormState {
  const [isActivating, setIsActivating] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<ActivateSchema>({
    resolver: zodResolver(activateSchema),
    defaultValues: { activationToken: '' },
    mode: 'onChange',
  });

  const resendForm = useForm<ResendActivationSchema>({
    resolver: zodResolver(resendActivationSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  // Pobieranie CSRF tokenu przy pierwszym renderze
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (err) {
        toast.error('Błąd pobierania tokenu zabezpieczającego.');
      } finally {
        setIsLoading(false);
      }
    };
    getCsrfToken();
  }, []);

  const refreshCsrfToken = async () => {
    try {
      setIsLoading(true);
      const token = await fetchCsrfToken();
      setCsrfToken(token);
      toast.success('Token zabezpieczający odświeżony.');
    } catch (err) {
      toast.error('Błąd odświeżania tokenu zabezpieczającego.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    if (!csrfToken) {
      toast.error('Brak tokenu zabezpieczającego.');
      return;
    }

    setIsActivating(true);
    try {
      await activateAccount(data.activationToken, csrfToken);
      toast.success('Konto aktywowane pomyślnie!');
      form.reset();
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Błąd aktywacji konta.');
    } finally {
      setIsActivating(false);
    }
  });

  const onResendSubmit = resendForm.handleSubmit(async (data) => {
    if (!csrfToken) {
      toast.error('Brak tokenu zabezpieczającego.');
      return;
    }
    
    setIsResending(true);
    try {
      await resendActivationCode(data.email, csrfToken);
      toast.success('Nowy kod aktywacyjny został wysłany.');
      resendForm.reset();
      onResendSuccess?.(); 
    } catch (err: any) {
      toast.error(err.message || 'Błąd wysyłania kodu.');
    } finally {
      setIsResending(false);
    }
  });

  const isFormDisabled = isActivating || isLoading || !csrfToken;
  const isResendDisabled = isResending || isActivating || isLoading;

  return {
    form,
    resendForm,
    isActivating,
    isResending,
    isLoading,
    isFormDisabled,
    isResendDisabled,
    onSubmit,
    onResendSubmit,
    refreshCsrfToken,
  };
}