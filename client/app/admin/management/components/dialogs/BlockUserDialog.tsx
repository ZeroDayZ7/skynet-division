// app/user-management/components/dialogs/BlockUserDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { blockUser } from '../../actions/blockUser';
import { useState, useEffect } from 'react';

interface BlockUserDialogProps {
  userId: string | null;
  onClose: () => void;
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({ userId, onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Synchronizuj stan open z userId
  useEffect(() => {
    console.log(`BlockUserDialog: Aktualizacja userId=${userId}`);
    setOpen(!!userId);
  }, [userId]);

  const handleConfirm = async () => {
    if (userId) {
      console.log(`Potwierdzono blokadę użytkownika: userId=${userId}`);
      await blockUser(userId);
      router.refresh();
      setOpen(false);
      onClose();
    }
  };

  if (!userId) {
    console.log('BlockUserDialog: Brak userId, nie renderuję dialogu');
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(`BlockUserDialog: Zmiana stanu open=${open}`);
        setOpen(open);
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Zablokuj użytkownika</DialogTitle>
          <DialogDescription>
            Czy na pewno chcesz zablokować użytkownika o ID {userId}? Ta akcja może zostać cofnięta.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              console.log('Anulowano blokadę');
              setOpen(false);
              onClose();
            }}
          >
            Anuluj
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Zablokuj
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};