/**
 * Hook for managing login form state and submission.
 * @module hooks/useLoginForm
 */

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCsrfToken } from '@/hooks/useCsrfToken';
import { useLogin } from './useLogin';
import { useAuth } from '@/context/AuthContext';
import { loginSchema, LoginSchema } from '@/lib/schemas/auth';

interface LoginFormState {
  form: ReturnType<typeof useForm<LoginSchema>>;
  isSubmitting: boolean;
  isLoading: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  csrfTokenReady: boolean;
}

/**
 * Manages login form with validation, CSRF, and API integration.
 * @returns Form state and handlers.
 */
export function useLoginForm(): LoginFormState {
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError, refreshToken } = useCsrfToken();
  const { login: loginApi } = useLogin();
  const { login: loginContext } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NODE_ENV === 'development' ? 'yovasec567@fincainc.com' : '',
      password: process.env.NODE_ENV === 'development' ? 'Zaq1@wsx' : '',
    },
  });

  useEffect(() => {
    if (csrfError) {
      toast.error(`Brak tokenu CSRF lub błąd bezpieczeństwa.`, {
        description: 'Odśwież stronę, lub spróbuj później',
        duration: 7000
      });
    }
  }, [csrfError]);

  // toast.error(`${data.message}`, {
  //   description: "Zaloguj się ponownie",
  //   duration: 5000,
  //   position: "top-center", // Toast pojawi się w prawym górnym rogu
  //   richColors: true,
  //   icon: "❌", // Można dodać ikonę
  // });

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit = async (data: LoginSchema) => {
    if (!csrfToken || csrfError) {
      toast.error('Brak tokenu CSRF lub błąd bezpieczeństwa. Odśwież stronę.');
      return;
    }

    try {
      const { user } = await loginApi(data, csrfToken);
      // console.log(`user: ${JSON.stringify(user)}`);
      loginContext(user);
      toast.success('Zalogowano pomyślnie');
      router.replace('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Logowanie nie powiodło się. Spróbuj ponownie.');
    }
  };

  return {
    form,
    isSubmitting: form.formState.isSubmitting || isCsrfLoading,
    isLoading: isCsrfLoading,
    showPassword,
    toggleShowPassword,
    onSubmit: form.handleSubmit(onSubmit),
    csrfTokenReady: !!csrfToken && !csrfError,
  };
}