// app/user-management/components/dialogs/DeleteUserDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { deleteUser } from '../../actions/deleteUser';
import { usePermissions } from '@/context/PermissionsContext';

interface DeleteUserDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string } | null;
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const { execute } = useApi();
  const { permissions } = usePermissions();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(`DeleteUserDialog: Aktualizacja user=${JSON.stringify(user)}`);
    const hasPermission = permissions && permissions.userDelete ? permissions.userDelete.enabled && !permissions.userDelete.hidden : false;
    setOpen(!!user && hasPermission);
  }, [user, permissions]);

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

  if (!user || !permissions || !permissions.userDelete || !permissions.userDelete.enabled || permissions.userDelete.hidden) {
    console.log('DeleteUserDialog: Brak danych użytkownika lub uprawnień, nie renderuję dialogu');
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
            <strong className="font-semibold dark:text-red-500">Czy na pewno chcesz usunąć użytkownika?</strong>
            <samp className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <samp className="font-semibold dark:text-green-500">ID</samp>
              <samp>{user.id}</samp>
              <samp className="font-semibold dark:text-green-500">Email</samp>
              <samp>{user.email}</samp>
              <samp className="font-semibold dark:text-green-500">Imię</samp>
              <samp>{user.first_name || '-'}</samp>
              <samp className="font-semibold dark:text-green-500">Nazwisko</samp>
              <samp>{user.last_name || '-'}</samp>
            </samp>
            <samp className="text-muted-foreground text-sm">Tej akcji nie można cofnąć.</samp>
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