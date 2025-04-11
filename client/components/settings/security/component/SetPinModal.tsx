'use client';

import { useState, useEffect } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SetPinModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPin('');
      setConfirmPin('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Sprawdzamy długość PIN-u (4 cyfry)
    if (pin.length !== 4) {
      setError('Kod PIN musi składać się z 4 cyfr');
      return;
    }

    if (pin !== confirmPin) {
      setError('Kody PIN nie są identyczne');
      return;
    }

    if (!password) {
      setError('Wprowadź aktualne hasło');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Dodaj wysyłkę do API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } catch {
      setError('Wystąpił błąd podczas zapisywania PIN-u');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{pin ? 'Zmień kod PIN' : 'Ustaw kod PIN'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <InputOTP value={pin} onChange={setPin} maxLength={4}>
              <InputOTPGroup className="justify-center">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <div className="text-center text-sm">Nowy kod PIN (4 cyfry)</div>
          </div>

          <div className="flex flex-col items-center">
            <InputOTP value={confirmPin} onChange={setConfirmPin} maxLength={4}>
              <InputOTPGroup className="justify-center">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <div className="text-center text-sm">Potwierdź kod PIN</div>
          </div>

          <div className="flex flex-col items-center">
            <Label htmlFor="password">Aktualne hasło</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full max-w-xs"
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="text-destructive text-center text-sm font-medium">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} type="button">
              Anuluj
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
