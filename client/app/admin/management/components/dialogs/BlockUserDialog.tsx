'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { blockUser } from '@/app/admin/management/actions/blockUser';
import { unblockUser } from '@/app/admin/management/actions/unblockUser';
import { usePermissions } from '@/context/PermissionsContext';

interface BlockUserDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string; userBlock: boolean } | null;
  onClose: () => void;
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const { execute } = useApi();
  const { permissions } = usePermissions();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(`BlockUserDialog: Aktualizacja user=${JSON.stringify(user)}`);
    const hasPermission = permissions && permissions.userBlock ? permissions.userBlock.enabled && !permissions.userBlock.hidden : false;
    setOpen(!!user && hasPermission);
  }, [user, permissions]);

  const handleConfirm = async () => {
    if (user?.id) {
      console.log(`Potwierdzono ${user.userBlock ? 'odblokowanie' : 'blokadę'} użytkownika: userId=${user.id}`);
      const action = user.userBlock ? unblockUser : blockUser;
      const result = await execute(action, user.id);

      if (result.success) {
        setOpen(false);
        onClose();
        router.refresh();
      }
    }
  };

  if (!user || !permissions || !permissions.userBlock || !permissions.userBlock.enabled || permissions.userBlock.hidden) {
    console.log('BlockUserDialog: Brak danych użytkownika lub uprawnień, nie renderuję dialogu');
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(`BlockUserDialog: Zmiana stanu open=${open}`);
        setOpen(open);
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user.userBlock ? 'Odblokuj użytkownika' : 'Zablokuj użytkownika'}</DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            <strong className="font-semibold dark:text-red-500">Czy na pewno chcesz {user.userBlock ? 'odblokować' : 'zablokować'} użytkownika?</strong>
            <samp className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
              <samp className="font-semibold dark:text-green-500">ID:</samp>
              <samp>{user.id}</samp>
              <samp className="font-semibold dark:text-green-500">Email:</samp>
              <samp>{user.email}</samp>
              <samp className="font-semibold dark:text-green-500">Imię:</samp>
              <samp>{user.first_name || '-'}</samp>
              <samp className="font-semibold dark:text-green-500">Nazwisko:</samp>
              <samp>{user.last_name || '-'}</samp>
            </samp>
            <samp className="text-muted-foreground text-sm">Ta akcja może zostać cofnięta.</samp>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              console.log(`Anulowano ${user.userBlock ? 'odblokowanie' : 'blokadę'}`);
              setOpen(false);
              onClose();
            }}
          >
            Anuluj
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {user.userBlock ? 'Odblokuj' : 'Zablokuj'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
