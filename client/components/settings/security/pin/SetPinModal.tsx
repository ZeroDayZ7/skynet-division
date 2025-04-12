// components/SetPinModal.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SetPinForm } from './SetPinForm';
import { useSetPin } from '@/hooks/useSetPin';

interface SetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SetPinModal({ isOpen, onClose, onSuccess }: SetPinModalProps) {
  const {
    pin,
    confirmPin,
    password,
    isLoading,
    error,
    pinExists,
    setPin,
    setConfirmPin,
    setPassword,
    handleSubmit,
    resetForm,
  } = useSetPin(onSuccess);

  // Reset formularza przy zamykaniu modalu
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
        </DialogHeader>
        <SetPinForm
          pin={pin}
          confirmPin={confirmPin}
          password={password}
          error={error}
          isLoading={isLoading}
          onPinChange={setPin}
          onConfirmPinChange={setConfirmPin}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}