'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const deleteAccountSchema = z.object({
  password: z.string().min(6, 'Hasło jest wymagane'),
});

type DeleteAccountForm = z.infer<typeof deleteAccountSchema>;

export default function DeleteAccountSection() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DeleteAccountForm>({
    resolver: zodResolver(deleteAccountSchema),
  });

  const onSubmit = async (data: DeleteAccountForm) => {
    try {
      // TODO: Zaimplementuj logikę usuwania konta z użyciem CSRF i fetchClient
      console.log('Usuwanie konta z hasłem:', data.password);

      toast.success('Twoje konto zostało usunięte.');
      reset();
      setOpen(false);
    } catch (error) {
      toast.error('Nie udało się usunąć konta.');
    }
  };

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Uwaga: To działanie jest nieodwracalne</AlertTitle>
        <AlertDescription>
          Usunięcie konta spowoduje trwałe usunięcie wszystkich danych powiązanych z Twoim kontem. 
          Nie będzie możliwości ich odzyskania.
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Usuń konto</h3>
          <p className="text-sm text-muted-foreground">
            Spowoduje trwałe usunięcie Twojego konta i danych.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Usuń konto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Potwierdź usunięcie konta</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Potwierdź hasłem</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Wpisz swoje hasło"
                  {...register('password')}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Tej operacji nie można cofnąć. Upewnij się, że chcesz trwale usunąć konto.
                </AlertDescription>
              </Alert>

              <DialogFooter className="gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    reset();
                    setOpen(false);
                  }}
                  disabled={isSubmitting}
                >
                  Anuluj
                </Button>
                <Button type="submit" variant="destructive" disabled={isSubmitting}>
                  {isSubmitting ? 'Usuwanie...' : 'Usuń konto'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
