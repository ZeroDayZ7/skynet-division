// src/components/auth/RegisterForm.tsx
'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import Captcha from '@/components/Captcha/Captcha';

const SPECIAL_CHARS = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

const registerSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres e-mail' }),
  password: z.string()
    .min(8, { message: 'Hasło musi mieć co najmniej 8 znaków.' })
    .regex(/\d/, { message: 'Hasło musi zawierać co najmniej jedną cyfrę.' })
    .regex(/[A-Z]/, { message: 'Hasło musi zawierać co najmniej jedną dużą literę.' })
    .regex(SPECIAL_CHARS, { message: 'Hasło musi zawierać co najmniej jeden znak specjalny.' }),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła nie są identyczne.',
  path: ['confirmPassword'],
});

type RegisterSchema = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  csrfToken: string | null;
  isLoadingCsrf?: boolean;
  csrfError?: string | null;
  className?: string;
}

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const REGISTER_URL = `${BACKEND_BASE_URL}/api/auth/register`;

export default function RegisterForm({ 
  csrfToken, 
  isLoadingCsrf = false, 
  csrfError = null,
  className = ''
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: 'michal@mich.',
      password: 'Zaq1@wsx',
      confirmPassword: 'Zaq1@wsx',
    },
    mode: 'onTouched',
  });

  const isFormDisabled = isLoading || isLoadingCsrf || !csrfToken || !!csrfError;

  const onSubmit = useCallback(async (values: RegisterSchema) => {
    if (isFormDisabled || !captchaPassed) {
      if (!csrfToken || csrfError) {
        toast.error('Błąd zabezpieczeń formularza. Odśwież stronę.');
      } else if (!captchaPassed) {
        toast.warning('Proszę rozwiązać CAPTCHA.');
      }
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Rejestracja nie powiodła się.');
      }
      toast.success('Wniosek o rejestrację złożony pomyślnie', {
        description: 'Sprawdź e-mail.',
        // duration: 5000,
        // richColors: true,
        icon: '✔',
      });
      form.reset();
      router.push('/activate');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Wystąpił nieoczekiwany błąd.');
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [isFormDisabled, captchaPassed, csrfToken, csrfError, form, router]);

  const togglePasswordVisibility = useCallback((field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(prev => !prev);
    } else {
      setShowConfirmPassword(prev => !prev);
    }
  }, []);

  return (
    <div className={className}>
      <Form {...form}>
        {isLoadingCsrf && (
          <div className="text-center text-sm text-muted-foreground mb-4">
            Ładowanie zabezpieczeń...
          </div>
        )}
        
        {csrfError && (
          <div className="text-center text-sm text-destructive mb-4">
            Błąd zabezpieczeń: {csrfError}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='email'>Adres E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id='email'
                    type="email"
                    placeholder="Wprowadź adres e-mail"
                    autoComplete="username"
                    maxLength={100}
                    disabled={isFormDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='password'>Hasło</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Wprowadź hasło"
                      autoComplete="new-password"
                      disabled={isFormDisabled}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                      disabled={isFormDisabled}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='confirmPassword'>Potwierdź hasło</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Potwierdź hasło"
                      autoComplete="new-password"
                      disabled={isFormDisabled}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                      disabled={isFormDisabled}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Captcha 
            onSuccess={() => setCaptchaPassed(true)} 
            disabled={isFormDisabled}
          />

          <Button
            type="submit"
            disabled={isFormDisabled || !captchaPassed || !form.formState.isValid}
            className="w-full"
          >
            {isLoading ? (
              <>
                <FaSpinner className="mr-2 animate-spin" />
                Wysyłanie...
              </>
            ) : (
              'Zarejestruj się'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}