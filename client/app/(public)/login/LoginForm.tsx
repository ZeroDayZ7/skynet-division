// LoginForm.tsx
'use client';

import { UseFormReturn } from 'react-hook-form'; // Importuj typy react-hook-form
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { LoginSchema } from '@/lib/schemas/auth';
import { useTranslations } from 'next-intl';

interface LoginFormProps {
  form: UseFormReturn<LoginSchema>; // Przyjmij całą instancję form
  isLoading: boolean;
  isSubmitting: boolean;
  showPassword?: boolean; // Opcjonalne, jeśli logika jest w hooku
  toggleShowPassword?: () => void; // Opcjonalne
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>; // Handler z hooka
  csrfTokenReady: boolean; // Informacja o gotowości tokenu
}

export function LoginForm({ 
  form,
  isLoading,
  isSubmitting,
  showPassword,
  toggleShowPassword,
  onSubmit,
  csrfTokenReady
}: LoginFormProps) {

const t = useTranslations('LoginPage');

  const isDisabled = isSubmitting;

  return (
    <Form {...form}>
      {' '}
      {/* Unpack the full form instance */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">{t('email')}</FormLabel>
              <FormControl>
                <Input {...field} id="email" disabled={isDisabled} autoComplete="username" placeholder="email@example.com" />
              </FormControl>
              <FormMessage /> {/* Validation errors for this field */}
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">{t('password')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} id="password" type={showPassword ? 'text' : 'password'} disabled={isDisabled} autoComplete="current-password" placeholder="******" />
                  {/* Password toggle button */}
                  {toggleShowPassword && (
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed"
                      disabled={isDisabled}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage /> {/* Validation errors for this field */}
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isDisabled || !csrfTokenReady}>
          {isSubmitting ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
              {t('loggingIn')}...
            </>
          ) : csrfTokenReady ? (
            t('login')
          ) : (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
              {t('loading')}...
            </>
          )}
        </Button>
        {/* CSRF token not ready message */}
        {!csrfTokenReady && !isLoading && <p className="text-muted-foreground text-center text-xs">{t('csrfError')}</p>}
      </form>
    </Form>
  );
}
