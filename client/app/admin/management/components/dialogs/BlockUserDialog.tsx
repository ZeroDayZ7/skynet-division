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
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setOpen(!!user);
    setMessage(null);
    setStatus('idle');
  }, [user]);

  const handleConfirm = async () => {
    if (!user?.id) return;

    try {
      const result = user.userBlock
        ? await unblockUser(user.id)
        : await blockUser(user.id);

      setMessage(
        result.message ||
        (user.userBlock
          ? 'Użytkownik został odblokowany'
          : 'Użytkownik został zablokowany')
      );
      setStatus('success');
    } catch (err: any) {
      console.error('Błąd:', err);
      setMessage(
        err.message ||
        `Nie udało się ${user.userBlock ? 'odblokować' : 'zablokować'} użytkownika`
      );
      setStatus('error');
    }
  };

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setMessage(null);
          setStatus('idle');
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user.userBlock ? 'Odblokuj użytkownika' : 'Zablokuj użytkownika'}
          </DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            <i className="font-semibold dark:text-red-500">
              Czy na pewno chcesz {user.userBlock ? 'odblokować' : 'zablokować'} użytkownika?
            </i>

            <strong className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
              <span className="font-semibold dark:text-green-500">ID:</span>
              <span>{user.id}</span>

              <span className="font-semibold dark:text-green-500">Email:</span>
              <span>{user.email}</span>

              <span className="font-semibold dark:text-green-500">Imię:</span>
              <span>{user.first_name || '-'}</span>

              <span className="font-semibold dark:text-green-500">Nazwisko:</span>
              <span>{user.last_name || '-'}</span>
            </strong>

            <i className="text-muted-foreground text-sm">
              Ta akcja może zostać cofnięta.
            </i>
          </DialogDescription>
        </DialogHeader>

        {message && (
          <div className={status === 'error' ? 'text-red-500' : 'text-green-500'}>
            {message}
          </div>
        )}

        {status === 'idle' && (
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
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
        )}

        {status !== 'idle' && (
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpen(false);
                onClose();
                if (status === 'success') router.refresh();
                setMessage(null);
                setStatus('idle');
              }}
            >
              OK
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
