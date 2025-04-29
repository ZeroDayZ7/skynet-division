'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { ResendActivationSchema } from '@/lib/schemas/auth';
import { useForm } from 'react-hook-form';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resendForm: ReturnType<typeof useForm<ResendActivationSchema>>;
  isResending: boolean;
  isResendDisabled: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function ResendActivationDialog({
  open,
  onOpenChange,
  resendForm,
  isResending,
  isResendDisabled,
  onSubmit,
}: Props) {
  useEffect(() => {
    if (resendForm.formState.isSubmitSuccessful) {
      onOpenChange(false);
    }
  }, [resendForm.formState.isSubmitSuccessful, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Ponowne wysłanie kodu</DialogTitle>
          <DialogDescription>
            Wpisz adres e-mail, aby otrzymać nowy kod aktywacyjny.
          </DialogDescription>
        </DialogHeader>
        <Form {...resendForm}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={resendForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
  );
}
