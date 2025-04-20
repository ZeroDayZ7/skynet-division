// app/user-management/components/dialogs/GenericDialog.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';

interface GenericDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  actionLabel: string;
  action: (...args: any[]) => Promise<any>;
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
  const { execute } = useApi();
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setError(null);
    try {
      const result = await execute(action, ...actionArgs);
      if (result.success) {
        onClose();
        router.refresh();
      } else {
        setError(result.message || 'Wystąpił błąd.');
      }
    } catch (error) {
      console.error(`Błąd podczas akcji ${title}:`, error);
      setError('Wystąpił błąd podczas wykonywania akcji.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="space-y-4 text-left">{description}</DialogDescription>
        </DialogHeader>
        {error && <div className="text-center text-destructive">{error}</div>}
        {children}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Anuluj
          </Button>
          <Button variant={destructive ? 'destructive' : 'default'} onClick={handleConfirm}>
            {actionLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};