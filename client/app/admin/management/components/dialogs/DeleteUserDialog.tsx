// app/user-management/components/dialogs/DeleteUserDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteUser } from '../../actions/deleteUser';
import { useState, useEffect } from 'react';

interface DeleteUserDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string } | null;
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Synchronizuj stan open z user
  useEffect(() => {
    console.log(`DeleteUserDialog: Aktualizacja user=${JSON.stringify(user)}`);
    setOpen(!!user);
    setMessage(null); // Reset komunikatu przy zmianie użytkownika
  }, [user]);

  const handleConfirm = async () => {
    if (user?.id) {
      console.log(`Potwierdzono usunięcie użytkownika: userId=${user.id}`);
      try {
        const result = await deleteUser(user.id);
        console.log('DeleteUserDialog: Usunięcie zakończone sukcesem, wynik:', result);
        setMessage(result.message || 'Użytkownik został usunięty');
        setTimeout(() => {
          setOpen(false);
          onClose();
          router.refresh();
        }, 1500);
      } catch (err: any) {
        console.error('DeleteUserDialog: Błąd podczas usuwania:', err);
        setMessage(err.message || 'Nie udało się usunąć użytkownika');
        setTimeout(() => {
          setOpen(false);
          onClose();
        }, 1500);
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
          setMessage(null);
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
        {message && <div className={message.includes('Nie udało się') ? 'text-red-500' : 'text-green-500'}>{message}</div>}
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
