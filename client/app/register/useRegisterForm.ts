/**
 * Hook do zarządzania stanem i wysyłaniem formularza rejestracji.
 * @module hooks/useRegisterForm
 */

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCsrfToken } from '@/hooks/useCsrfToken';
import { useRegister } from './useRegister';
import { registerSchema, RegisterSchema } from '@/lib/schemas/auth';

interface RegisterFormState {
  form: ReturnType<typeof useForm<RegisterSchema>>;
  isSubmitting: boolean;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePasswordVisibility: (field: 'password' | 'confirmPassword') => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  csrfTokenReady: boolean;
  captchaPassed: boolean;
  setCaptchaPassed: (value: boolean) => void;
}

/**
 * Zarządza formularzem rejestracji z walidacją, CSRF, CAPTCHA i integracją z API.
 * @returns Stan formularza i obsługa zdarzeń.
 */
export function useRegisterForm(): RegisterFormState {
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError, refreshToken } = useCsrfToken();
  const { register: registerApi } = useRegister();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: process.env.NODE_ENV === 'development' ? '' : '',
      password: process.env.NODE_ENV === 'development' ? '' : '',
      confirmPassword: process.env.NODE_ENV === 'development' ? '' : '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (csrfError) {
      toast.error(`Błąd zabezpieczeń: ${csrfError}. Proszę odświeżyć stronę.`);
    }
  }, [csrfError]);

  const togglePasswordVisibility = useCallback((field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  }, []);

  const onSubmit = async (data: RegisterSchema) => {
    if (!csrfToken || csrfError) {
      toast.error('Brak tokenu CSRF lub błąd zabezpieczeń. Proszę odświeżyć stronę.');
      return;
    }
    if (!captchaPassed) {
      toast.warning('Proszę rozwiązać CAPTCHA.');
      return;
    }

    try {
      await registerApi({ email: data.email, password: data.password }, csrfToken);
      toast.success('Wniosek o rejestrację złożony pomyślnie', {
        description: 'Sprawdź e-mail.',
        icon: '✔',
      });
      form.reset();
      router.replace('/activate');
    } catch (err: any) {
      toast.error(err.message || 'Rejestracja nie powiodła się. Spróbuj ponownie.');
    }
  };

  return {
    form,
    isSubmitting: form.formState.isSubmitting || isCsrfLoading,
    isLoading: isCsrfLoading,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    onSubmit: form.handleSubmit(onSubmit),
    csrfTokenReady: !!csrfToken && !csrfError,
    captchaPassed,
    setCaptchaPassed,
  };
}