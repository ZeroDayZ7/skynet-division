'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { fetchClient } from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { useCsrfToken } from '@/hooks/useCsrfToken';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Aktualne hasło jest wymagane'),
    newPassword: z
      .string()
      .min(8, 'Nowe hasło musi mieć co najmniej 8 znaków')
      .regex(/[A-Z]/, 'Hasło musi zawierać wielką literę')
      .regex(/[a-z]/, 'Hasło musi zawierać małą literę')
      .regex(/[0-9]/, 'Hasło musi zawierać cyfrę')
      .regex(/[^A-Za-z0-9]/, 'Hasło musi zawierać znak specjalny'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Hasła się nie zgadzają',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePassword() {
  const { csrfToken } = useCsrfToken(); // zakładam że masz csrfToken
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: PasswordFormValues) => {
      await fetchClient.post(
        '/api/settings/change-password',
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success('Hasło zostało zmienione');
      form.reset();
    },
    onError: () => {
      toast.error('Nie udało się zmienić hasła');
    },
  });

  const onSubmit = (values: PasswordFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="px-4 py-2">
      <div className='flex flex-row'>
      <h2 className="text-xl font-semibold">Zmień hasło</h2>
       <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" size="icon">
                  ?
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 text-sm">
                <p className="mb-1 font-medium">Wymagania hasła:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Minimum 8 znaków</li>
                  <li>1 wielka litera</li>
                  <li>1 mała litera</li>
                  <li>1 cyfra</li>
                  <li>1 znak specjalny</li>
                </ul>
              </PopoverContent>
            </Popover>
</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aktualne hasło</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nowe hasło</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Powtórz nowe hasło</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Zmieniam...' : 'Zmień hasło'}
          </Button>
          
        </form>
      </Form>
    </div>
  );
}
