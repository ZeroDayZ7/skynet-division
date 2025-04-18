// app/user-management/components/dialogs/EditPermissionsDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { User, Permissions } from '../../types/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { editPermissions } from '../../actions/editPermissions';
import { AVAILABLE_PERMISSIONS } from '../../constants';

interface EditPermissionsDialogProps {
  userId: string | null;
  onClose: () => void;
}

export const EditPermissionsDialog: React.FC<EditPermissionsDialogProps> = ({ userId, onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState(!!userId);
  const [permissions, setPermissions] = useState<Permissions>({});

  useEffect(() => {
    if (userId) {
      const cookieStore = document.cookie;
      fetch(`http://localhost:3001/api/admin/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Nie znaleziono użytkownika');
          return res.json();
        })
        .then((data: User) => setPermissions(data.permissions || {}))
        .catch((err) => console.error('Błąd pobierania uprawnień:', err));
    }
  }, [userId]);

  const handleSave = async () => {
    if (userId) {
      await editPermissions(userId, permissions);
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
          <DialogTitle>Edytuj uprawnienia użytkownika (ID: {userId})</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {AVAILABLE_PERMISSIONS.map((perm) => (
            <div key={perm.key} className="flex items-center space-x-2">
              <Checkbox
                id={perm.key}
                checked={permissions[perm.key] || false}
                onCheckedChange={(checked) =>
                  setPermissions({ ...permissions, [perm.key]: checked as boolean })
                }
              />
              <Label htmlFor={perm.key}>{perm.label}</Label>
            </div>
          ))}
          <Button onClick={handleSave}>Zapisz</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};