// app/login/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { loginUser } from '@/services/auth.service';
import { useAuth } from '@/context/auth-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

// Schema Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres e-mail' }),
  password: z.string().min(6, { message: 'Hasło musi mieć min. 6 znaków' }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NODE_ENV === 'development' ? 'yovasec567@fincainc.com' : '',
      password: process.env.NODE_ENV === 'development' ? 'Zaq1@wsx' : '',
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await loginUser(values.email, values.password);
      if (!response.isAuthenticated) {
        throw new Error(response.message || 'Błąd logowania');
      }
      login(response.user);
      toast.success('Zalogowano pomyślnie');
      router.replace('/dashboard');
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Wystąpił problem z logowaniem');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="Wprowadź e-mail"
                  autoComplete="username"
                  disabled={isLoading}
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
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" />
              Logowanie...
            </>
          ) : (
            'Zaloguj się'
          )}
        </Button>
      </form>
    </Form>
  );
}