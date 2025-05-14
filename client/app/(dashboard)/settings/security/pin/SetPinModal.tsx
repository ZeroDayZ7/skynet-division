// components/settings/security/pin/SetPinModal.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SetPinForm } from './SetPinForm';
import { useSetPin } from './hooks/useSetPin';

interface SetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  isPinSet: boolean;
}

export default function SetPinModal({ isOpen, onClose, onSuccess, isPinSet }: SetPinModalProps) {
  const { isLoading, error, handleSubmit, resetForm } = useSetPin(onSuccess);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="mx-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isPinSet ? 'Zmień kod PIN' : 'Ustaw kod PIN'}</DialogTitle>
          <DialogDescription>
            {isPinSet
              ? 'Wprowadź nowy kod PIN i potwierdź go, aby zmienić obecny PIN.'
              : 'Wprowadź nowy kod PIN i potwierdź go, aby dodać warstwę zabezpieczeń.'}
          </DialogDescription>
        </DialogHeader>
        <SetPinForm
          error={error}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isPinSet={isPinSet}
        />
      </DialogContent>
    </Dialog>
  );
}