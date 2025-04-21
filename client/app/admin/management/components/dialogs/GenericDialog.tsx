'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GenericDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  actionLabel: string;
  action: (...args: any[]) => Promise<{ success: boolean; message?: string }>;
  actionArgs: any[];
  destructive?: boolean;
  children?: React.ReactNode;
}

export const GenericDialog: React.FC<GenericDialogProps> = ({
  open,
  onClose,
  title,
  description,
  actionLabel,
  action,
  actionArgs,
  destructive = false,
  children,
}) => {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    setStatus('idle');
    setMessage(null);
    try {
      const result = await action(...actionArgs);
      if (result.success) {
        setStatus('success');
        setMessage(result.message || `${actionLabel} wykonano pomyślnie.`);
        router.refresh();
      } else {
        setStatus('error');
        setMessage(result.message || 'Wystąpił błąd podczas wykonywania akcji.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Wystąpił błąd podczas wykonywania akcji.');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setMessage(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            {status === 'idle' ? description : message}
          </DialogDescription>
        </DialogHeader>
        {children}
        {status === 'idle' ? (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Anuluj
            </Button>
            <Button
              variant={destructive ? 'destructive' : 'default'}
              onClick={handleConfirm}
            >
              {actionLabel}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end">
            <Button onClick={handleClose}>OK</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};