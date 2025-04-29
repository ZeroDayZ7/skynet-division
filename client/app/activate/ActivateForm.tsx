/**
 * Komponent formularza aktywacji konta z walidacją i obsługą ponownego wysyłania kodu.
 * @module components/auth/ActivateForm
 */

'use client';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ActivateSchema, ResendActivationSchema } from '@/lib/schemas/auth';

interface ActivateFormProps {
  form: UseFormReturn<ActivateSchema>;
  resendForm: UseFormReturn<ResendActivationSchema>;
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
 * Renderuje formularz aktywacji z polem kodu i opcją ponownego wysyłania kodu.
 * @param props - Stan formularza i obsługa zdarzeń.
 * @returns Element JSX.
 */
export default function ActivateForm({
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
  inputRef,
}: ActivateFormProps) {
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        {isLoading && <div className="text-center text-sm text-gray-500">Ładowanie...</div>}
        {!isFormDisabled && !isLoading && (
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="activationToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="activationToken" className="sr-only">
                    Kod aktywacyjny
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      ref={inputRef}
                      id="activationToken"
                      placeholder="Kod aktywacyjny"
                      maxLength={6}
                      disabled={isFormDisabled}
                      className="text-center tracking-widest text-xl"
                      inputMode="numeric"
                      pattern="\d{6}"
                      autoComplete="one-time-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isFormDisabled || !form.formState.isValid}
              className="w-full"
            >
              {isActivating ? 'Aktywowanie...' : 'Aktywuj konto'}
            </Button>
          </form>
        )}
      </Form>

      <p className="text-center text-xs text-gray-500">
        Nie otrzymałeś kodu?{' '}
        <span
          className={`underline cursor-pointer text-primary ${
            isResendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary/80'
          }`}
          onClick={isResendDisabled ? undefined : () => setIsResendDialogOpen(true)}
        >
          {isResending ? 'Wysyłanie...' : 'Wyślij ponownie'}
        </span>
      </p>

      <Dialog open={isResendDialogOpen} onOpenChange={setIsResendDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Ponowne wysłanie kodu</DialogTitle>
            <DialogDescription>
              Wpisz adres e-mail, aby otrzymać nowy kod aktywacyjny.
            </DialogDescription>
          </DialogHeader>
          <Form {...resendForm}>
            <form onSubmit={onResendSubmit} className="space-y-4">
              <FormField
                control={resendForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Adres e-mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="Wprowadź adres e-mail"
                        autoComplete="email"
                        disabled={isResendDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isResendDisabled || !resendForm.formState.isValid}
                className="w-full"
              >
                {isResending ? 'Wysyłanie...' : 'Wyślij kod'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}