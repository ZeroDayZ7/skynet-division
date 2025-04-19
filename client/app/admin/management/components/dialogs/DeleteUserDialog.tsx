'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { deleteUser } from '../../actions/deleteUser';

interface DeleteUserDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string } | null;
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const { execute } = useApi();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(`DeleteUserDialog: Aktualizacja user=${JSON.stringify(user)}`);
    setOpen(!!user);
  }, [user]);

  const handleConfirm = async () => {
    if (user?.id) {
      console.log(`Potwierdzono usunięcie użytkownika: userId=${user.id}`);
      const result = await execute(deleteUser, user.id);

      if (result.success) {
        setOpen(false);
        onClose();
        router.refresh();
      }
    }
  };

  if (!user) {
    console.log('DeleteUserDialog: Brak danych użytkownika, nie renderuję dialogu');
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(`DeleteUserDialog: Zmiana stanu open=${open}`);
        setOpen(open);
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuń użytkownika</DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            <i className="font-semibold dark:text-red-500">Czy na pewno chcesz usunąć użytkownika?</i>
            <strong className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <strong className="font-semibold dark:text-green-500">ID:</strong>
              <strong>{user.id}</strong>
              <strong className="font-semibold dark:text-green-500">Email:</strong>
              <strong>{user.email}</strong>
              <strong className="font-semibold dark:text-green-500">Imię:</strong>
              <strong>{user.first_name || '-'}</strong>
              <strong className="font-semibold dark:text-green-500">Nazwisko:</strong>
              <strong>{user.last_name || '-'}</strong>
            </strong>
            <strong className="text-muted-foreground text-sm">Tej akcji nie można cofnąć.</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              console.log('Anulowano usunięcie');
              setOpen(false);
              onClose();
            }}
          >
            Anuluj
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Usuń
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};