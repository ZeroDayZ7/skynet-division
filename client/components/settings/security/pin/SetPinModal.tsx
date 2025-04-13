// components/SetPinModal.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SetPinForm } from './SetPinForm';
import { useSetPin, PinFormData } from '@/hooks/useSetPin';

interface SetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void; // Zmodyfikowano, aby przekazywać komunikat
}

export function SetPinModal({ isOpen, onClose, onSuccess }: SetPinModalProps) {
  const { isLoading, error, successMessage, pinExists, handleSubmit, resetForm } = useSetPin(() => {
    onSuccess(successMessage); // Przekazuj komunikat sukcesu
    onClose(); // Zamknij modal po sukcesie
  });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="mx-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {pinExists === null ? 'Ładowanie...' : pinExists ? 'Zmień kod PIN' : 'Ustaw kod PIN'}
          </DialogTitle>
          <DialogDescription>
            {pinExists
              ? 'Wprowadź nowy kod PIN i potwierdź go, aby zmienić istniejący PIN.'
              : 'Ustaw nowy kod PIN, aby dodać dodatkową warstwę zabezpieczeń.'}
          </DialogDescription>
        </DialogHeader>
        <SetPinForm
          error={error}
          successMessage={successMessage} // Przekazuj komunikat sukcesu
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}