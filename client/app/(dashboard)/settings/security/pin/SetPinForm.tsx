'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';

const pinSchema = z
  .object({
    pin: z.string().length(4, 'Kod PIN musi mieć dokładnie 4 cyfry').regex(/^\d{4}$/, 'Kod PIN musi składać się z cyfr'),
    confirmPin: z.string().length(4, 'Kod PIN musi mieć dokładnie 4 cyfry').regex(/^\d{4}$/, 'Kod PIN musi składać się z cyfr'),
    password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
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
  isPinSet: boolean;
}

export function SetPinForm({ error, isLoading, onSubmit, onCancel, isPinSet }: SetPinFormProps) {
  const form = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: process.env.NODE_ENV === 'development' ? '1234' : '',
      confirmPin: process.env.NODE_ENV === 'development' ? '1234' : '',
      password: process.env.NODE_ENV === 'development' ? 'Zaq1@wsx' : '',
    },
  });

  const [showPin, setShowPin] = useState(false);

  const handleCancel = () => {
    form.reset(); // Resetuj formularz
    onCancel();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="setpinform" className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>{isPinSet ? 'Nowy kod PIN' : 'Kod PIN (4 cyfry)'}</FormLabel>
              <FormControl>
                <InputOTP {...field} maxLength={4}>
                  <InputOTPGroup className="justify-center">
                    <InputOTPSlot index={0} mask={!showPin} />
                    <InputOTPSlot index={1} mask={!showPin} />
                    <InputOTPSlot index={2} mask={!showPin} />
                    <InputOTPSlot index={3} mask={!showPin} />
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
              <FormLabel>{isPinSet ? 'Potwierdź nowy kod PIN' : 'Potwierdź kod PIN'}</FormLabel>
              <FormControl>
                <InputOTP {...field} maxLength={4}>
                  <InputOTPGroup className="justify-center">
                    <InputOTPSlot index={0} mask={!showPin} />
                    <InputOTPSlot index={1} mask={!showPin} />
                    <InputOTPSlot index={2} mask={!showPin} />
                    <InputOTPSlot index={3} mask={!showPin} />
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
          <Button
            // className='w-35'
            type="button"
            variant="outline"
            onClick={() => setShowPin(!showPin)}
            disabled={isLoading}
            aria-label={showPin ? 'Ukryj PIN' : 'Pokaż PIN'}
          >
            {showPin ? (
              <>
                <EyeOff className="h-4 w-4 mr-2"/>
                Ukryj PIN
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Pokaż PIN
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Anuluj
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Zapisywanie...' : isPinSet ? 'Zmień PIN' : 'Ustaw PIN'}
          </Button>
        </div>
      </form>
    </Form>
  );
}