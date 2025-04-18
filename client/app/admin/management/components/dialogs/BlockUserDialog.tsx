// app/user-management/components/dialogs/BlockUserDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { blockUser } from '../../actions/blockUser';
import { useState } from 'react';

interface BlockUserDialogProps {
  userId: string | null;
  onClose: () => void;
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({ userId, onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState(!!userId);

  const handleConfirm = async () => {
    if (userId) {
      await blockUser(userId);
      router.refresh();
      setOpen(false);
      onClose();
    }
  };

  if (!userId) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
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
          <Button variant="outline" onClick={() => setOpen(false)}>
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