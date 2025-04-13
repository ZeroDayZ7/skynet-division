// components/SetPinForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const pinSchema = z
  .object({
    pin: z.string().length(4, 'Kod PIN musi mieć dokładnie 4 cyfry').regex(/^\d{4}$/, 'Kod PIN musi składać się z cyfr'),
    confirmPin: z.string().length(4, 'Kod PIN musi mieć dokładnie 4 cyfry').regex(/^\d{4}$/, 'Kod PIN musi składać się z cyfr'),
    password: z.string().min(1, 'Hasło jest wymagane'),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: 'Kody PIN nie są identyczne',
    path: ['confirmPin'],
  });

type PinFormData = z.infer<typeof pinSchema>;

interface SetPinFormProps {
  error: string;
  isLoading: boolean;
  onSubmit: (data: PinFormData) => void;
  onCancel: () => void;
}

export function SetPinForm({ error, isLoading, onSubmit, onCancel }: SetPinFormProps) {
  const form = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: process.env.NODE_ENV === 'development' ? '1234' : '',
      confirmPin: process.env.NODE_ENV === 'development' ? '1234' : '',
      password: process.env.NODE_ENV === 'development' ? 'Zaq1@wsx' : '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="setpinform" className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Nowy kod PIN (4 cyfry)</FormLabel>
              <FormControl>
                <InputOTP {...field} maxLength={4}>
                  <InputOTPGroup className="justify-center">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Potwierdź kod PIN</FormLabel>
              <FormControl>
                <InputOTP {...field} maxLength={4}>
                  <InputOTPGroup className="justify-center">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel htmlFor="password">Aktualne hasło</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  {...field}
                  disabled={isLoading}
                  className="w-full max-w-xs"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="min-h-[20px]">
          {error && <p className="text-destructive text-center text-sm font-medium">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel} type="button" disabled={isLoading}>
            Anuluj
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
          </Button>
        </div>
      </form>
    </Form>
  );
}