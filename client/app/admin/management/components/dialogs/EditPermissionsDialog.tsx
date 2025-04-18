// app/user-management/components/dialogs/EditPermissionsDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Permissions } from '../../types/user';
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      console.log(`EditPermissionsDialog: Pobieram uprawnienia dla userId=${userId}`);
      const cookieStore = document.cookie;
      fetch(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore,
        },
      })
        .then((res) => {
          console.log(`EditPermissionsDialog: Odpowiedź serwera: ${res.status}`);
          if (!res.ok) throw new Error('Nie znaleziono użytkownika');
          return res.json();
        })
        .then((data) => {
          setPermissions(data.permissions || {});
          setError(null);
        })
        .catch((err) => {
          console.error('EditPermissionsDialog: Błąd pobierania uprawnień:', err);
          setError('Nie udało się pobrać uprawnień użytkownika');
        });
    }
  }, [userId]);

  const handleSave = async () => {
    if (userId) {
      console.log(`EditPermissionsDialog: Zapisuję uprawnienia dla userId=${userId}`);
      await editPermissions(userId, permissions);
      router.refresh();
      setOpen(false);
      onClose();
    }
  };

  if (!userId) {
    console.log('EditPermissionsDialog: Brak userId, nie renderuję dialogu');
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(`EditPermissionsDialog: Zmiana stanu open=${open}`);
        setOpen(open);
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj uprawnienia użytkownika (ID: {userId})</DialogTitle>
        </DialogHeader>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
};