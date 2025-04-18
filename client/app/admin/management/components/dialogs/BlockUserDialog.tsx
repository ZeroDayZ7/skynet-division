// app/user-management/components/dialogs/BlockUserDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { blockUser } from '../../actions/blockUser';
import { unblockUser } from '../../actions/unblockUser';
import { useState, useEffect } from 'react';

interface BlockUserDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string; userBlock: boolean } | null;
  onClose: () => void;
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log(`BlockUserDialog: Aktualizacja user=${JSON.stringify(user)}`);
    setOpen(!!user);
    setMessage(null);
  }, [user]);

  const handleConfirm = async () => {
    if (user?.id) {
      console.log(`Potwierdzono ${user.userBlock ? 'odblokowanie' : 'blokadę'} użytkownika: userId=${user.id}`);
      try {
        const result = user.userBlock ? await unblockUser(user.id) : await blockUser(user.id);
        console.log(`BlockUserDialog: ${user.userBlock ? 'Odblokowanie' : 'Blokada'} zakończona sukcesem, wynik:`, result);
        setMessage(result.message || (user.userBlock ? 'Użytkownik został odblokowany' : 'Użytkownik został zablokowany'));
        setTimeout(() => {
          setOpen(false);
          onClose();
          router.refresh();
        }, 1500);
      } catch (err: any) {
        console.error(`BlockUserDialog: Błąd podczas ${user.userBlock ? 'odblokowania' : 'blokady'}:`, err);
        setMessage(err.message || `Nie udało się ${user.userBlock ? 'odblokować' : 'zablokować'} użytkownika`);
        setTimeout(() => {
          setOpen(false);
          onClose();
        }, 1500);
      }
    }
  };

  if (!user) {
    console.log('BlockUserDialog: Brak danych użytkownika, nie renderuję dialogu');
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(`BlockUserDialog: Zmiana stanu open=${open}`);
        setOpen(open);
        if (!open) {
          setMessage(null);
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user.userBlock ? 'Odblokuj użytkownika' : 'Zablokuj użytkownika'}</DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            <i className="font-semibold dark:text-red-500">Czy na pewno chcesz {user.userBlock ? 'odblokować' : 'zablokować'} użytkownika?</i>

            <strong className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
              <strong className="font-semibold dark:text-green-500">ID:</strong>
              <strong>{user.id}</strong>

              <strong className="font-semibold dark:text-green-500">Email:</strong>
              <strong>{user.email}</strong>

              <strong className="font-semibold dark:text-green-500">Imię:</strong>
              <strong>{user.first_name || '-'}</strong>

              <strong className="font-semibold dark:text-green-500">Nazwisko:</strong>
              <strong>{user.last_name || '-'}</strong>
            </strong>

            <strong className="text-muted-foreground text-sm">Ta akcja może zostać cofnięta.</strong>
          </DialogDescription>
        </DialogHeader>
        {message && <div className={message.includes('Nie udało się') ? 'text-red-500' : 'text-green-500'}>{message}</div>}
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
        </div>{' '}
        {/* Dodano zamykający tag </div> */}
      </DialogContent>
    </Dialog>
  );
};
