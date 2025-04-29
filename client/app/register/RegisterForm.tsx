/**
 * Komponent formularza rejestracji z walidacją, CSRF i wsparciem dla CAPTCHA.
 * @module components/auth/RegisterForm
 */

'use client';

import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import Captcha from '@/components/Captcha/Captcha';
import { RegisterSchema } from '@/lib/schemas/auth';

interface RegisterFormProps {
  form: UseFormReturn<RegisterSchema>;
  isLoading: boolean;
  isSubmitting: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePasswordVisibility: (field: 'password' | 'confirmPassword') => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  csrfTokenReady: boolean;
  captchaPassed: boolean;
  setCaptchaPassed: (value: boolean) => void;
  className?: string;
}

export default function RegisterForm({
  form,
  isLoading,
  isSubmitting,
  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  onSubmit,
  csrfTokenReady,
  captchaPassed,
  setCaptchaPassed,
  className = '',
}: RegisterFormProps) {
  const isFormDisabled = isSubmitting || isLoading;
  // Dodajemy captchaPassed do warunków blokujących pola
  const areInputsDisabled = isFormDisabled || !captchaPassed;
  const isSubmitDisabled = isFormDisabled || !csrfTokenReady || !captchaPassed || !form.formState.isValid;

  return (
    <div className={className}>
      <Form {...form}>
        {isLoading && (
          <div className="text-center text-sm text-muted-foreground mb-4">Ładowanie zabezpieczeń...</div>
        )}
        {!csrfTokenReady && !isLoading && (
          <div className="text-center text-sm text-destructive mb-4">
            Błąd zabezpieczeń: Brak tokenu CSRF.
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className={`space-y-4 ${!captchaPassed ? 'opacity-50' : ''}`}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Adres E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Wprowadź adres e-mail"
                      autoComplete="username"
                      maxLength={100}
                      disabled={areInputsDisabled}
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
                  <FormLabel htmlFor="password">Hasło</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Wprowadź hasło"
                        autoComplete="new-password"
                        disabled={areInputsDisabled}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('password')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        disabled={areInputsDisabled}
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
                  <FormLabel htmlFor="confirmPassword">Potwierdź hasło</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Potwierdź hasło"
                        autoComplete="new-password"
                        disabled={areInputsDisabled}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        disabled={areInputsDisabled}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Captcha onSuccess={() => setCaptchaPassed(true)} disabled={isFormDisabled} />
          
          {!captchaPassed && (
            <div className="text-center text-sm text-muted-foreground">
              Proszę rozwiązać CAPTCHA, aby odblokować formularz.
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full"
          >
            {isSubmitting || isLoading ? (
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