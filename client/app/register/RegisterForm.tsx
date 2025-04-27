'use client';

import { useState } from 'react';
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

// Schemat walidacji Zod
const registerSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres e-mail' }),
  password: z.string().min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' }),
  confirmPassword: z.string().min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła nie są identyczne',
  path: ['confirmPassword'],
});

type RegisterSchema = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  csrfToken: string | null;
}

export default function RegisterForm({ csrfToken }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: process.env.NODE_ENV === 'development' ? '' : '',
      password: process.env.NODE_ENV === 'development' ? '' : '',
      confirmPassword: process.env.NODE_ENV === 'development' ? '' : '',
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    if (isLoading || !csrfToken) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd podczas rejestracji');
      }

      toast.success('Wniosek o rejestrację złożony. Sprawdź E-mail.', { duration: 5000 });
      form.reset();
      router.push('/activate');
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Wystąpił problem z rejestracją');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Wprowadź e-mail"
                  autoComplete="username"
                  disabled={isLoading || !csrfToken}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hasło */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="password">Hasło</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Wprowadź hasło"
                    autoComplete="new-password"
                    disabled={isLoading || !csrfToken}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading || !csrfToken}
                    aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Potwierdzenie hasła */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="confirmPassword">Potwierdź hasło</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Potwierdź hasło"
                    autoComplete="new-password"
                    disabled={isLoading || !csrfToken}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading || !csrfToken}
                    aria-label={showConfirmPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Własny Captcha - tymczasowo placeholder */}
        <div className="text-sm text-gray-600">
          {/* TODO: Tutaj wstawimy nasz własny CAPTCHA np. przesuń suwak, prosty quiz lub obrazek do przeciągnięcia */}
          {/* (Tu będzie nasz własny captcha 🚀) */}
          <Captcha onSuccess={() => setCaptchaPassed(true)} />
        </div>

        {/* Przycisk */}
        <Button type="submit" className="w-full" disabled={isLoading || !csrfToken || !captchaPassed}>
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" />
              Wysyłanie wniosku...
            </>
          ) : (
            'Złóż wniosek o rejestrację'
          )}
        </Button>
      </form>
    </Form>
  );
}
