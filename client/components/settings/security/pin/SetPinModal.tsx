// components/SetPinModal.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SetPinForm } from './SetPinForm';
import { useSetPin } from '@/hooks/useSetPin';

interface SetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function SetPinModal({ isOpen, onClose, onSuccess }: SetPinModalProps) {
  const { isLoading, error, handleSubmit, resetForm } = useSetPin(onSuccess);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="mx-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ustaw lub zmień kod PIN</DialogTitle>
          <DialogDescription>
            Wprowadź nowy kod PIN i potwierdź go, aby dodać lub zmienić warstwę zabezpieczeń.
          </DialogDescription>
        </DialogHeader>
        <SetPinForm
          error={error}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}