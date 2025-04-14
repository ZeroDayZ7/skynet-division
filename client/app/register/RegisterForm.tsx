'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

// Schema Zod
const registerSchema = z
  .object({
    firstName: z.string().min(2, { message: 'Imię musi mieć co najmniej 2 znaki' }),
    lastName: z.string().min(2, { message: 'Nazwisko musi mieć co najmniej 2 znaki' }),
    email: z.string().email({ message: 'Nieprawidłowy adres e-mail' }),
    password: z.string().min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' }),
    confirmPassword: z.string().min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' }),
    idNumber: z.string().min(9, { message: 'Numer dowodu musi mieć co najmniej 9 znaków' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
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

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: process.env.NODE_ENV === 'development' ? 'Jan' : '',
      lastName: process.env.NODE_ENV === 'development' ? 'Kowalski' : '',
      email: process.env.NODE_ENV === 'development' ? 'jan@example.com' : '',
      password: process.env.NODE_ENV === 'development' ? 'Zaq1@wsx' : '',
      confirmPassword: process.env.NODE_ENV === 'development' ? 'Zaq1@wsx' : '',
      idNumber: process.env.NODE_ENV === 'development' ? 'ABC123456' : '',
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    if (isLoading || !csrfToken) return;
    setIsLoading(true);
    console.log(`csrfToken: ${csrfToken}`);
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          idNumber: values.idNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd podczas rejestracji');
      }

      toast.success('Wniosek o rejestrację złożony. Oczekuj na weryfikację.', {
        duration: 5000,
      });
      form.reset();
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
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="firstName">Imię</FormLabel>
              <FormControl>
                <Input
                  id="firstName"
                  placeholder="Wprowadź imię"
                  disabled={isLoading || !csrfToken}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="lastName">Nazwisko</FormLabel>
              <FormControl>
                <Input
                  id="lastName"
                  placeholder="Wprowadź nazwisko"
                  disabled={isLoading || !csrfToken}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="idNumber">Numer dowodu osobistego</FormLabel>
              <FormControl>
                <Input
                  id="idNumber"
                  placeholder="Wprowadź numer dowodu"
                  disabled={isLoading || !csrfToken}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading || !csrfToken}>
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