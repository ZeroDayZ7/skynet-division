// app/user-management/components/dialogs/DeleteUserDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteUser } from '../../actions/deleteUser';
import { useState } from 'react';

interface DeleteUserDialogProps {
  userId: string | null;
  onClose: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ userId, onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState(!!userId);

  const handleConfirm = async () => {
    if (userId) {
      await deleteUser(userId);
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
          <DialogTitle>Usuń użytkownika</DialogTitle>
          <DialogDescription>
            Czy na pewno chcesz usunąć użytkownika o ID {userId}? Tej akcji nie można cofnąć.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
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