// components/user-management/dialogs/EditPermissionsDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/context/PermissionsContext';
import { editPermissions, getPermissions } from '@/app/admin/management/actions/permissions'; // Poprawny import
import { PermissionCheckboxGroup } from '../PermissionCheckboxGroup';
import { User } from '../../types/user';
import { Permissions } from '@/context/permissions/types';

interface EditPermissionsDialogProps {
  user: User;
  onClose: () => void;
}

export const EditPermissionsDialog: React.FC<EditPermissionsDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const { hasPermissionEnabled, hasPermissionVisible } = usePermissions();
  const hasEditPermission = hasPermissionEnabled('userEditPermissions') && hasPermissionVisible('userEditPermissions');
  const [open, setOpen] = useState(true);
  const [userPermissions, setUserPermissions] = useState<Permissions>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasEditPermission || !user) {
      setOpen(false);
      onClose();
      return;
    }

    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const response = await getPermissions(user.id);
        if (response.success && response.data) {
          setUserPermissions(response.data);
        } else {
          setError(response.message || 'Nie udało się pobrać uprawnień.');
        }
      } catch (error) {
        setError('Wystąpił błąd podczas pobierania uprawnień.');
      } finally {
        setLoading(false);
      }
    };
    fetchPermissions();
  }, [user, hasEditPermission, onClose]);

  const handlePermissionChange = (updatedPermissions: Permissions) => {
    setUserPermissions(updatedPermissions);
  };

  const handleSave = async () => {
    try {
      const response = await editPermissions(user.id, userPermissions);
      if (response.success) {
        router.refresh();
        setOpen(false);
        onClose();
      } else {
        setError(response.message || 'Nie udało się zapisać uprawnień.');
      }
    } catch (error) {
      setError('Wystąpił błąd podczas zapisywania uprawnień.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  if (!hasEditPermission || !user) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj uprawnienia użytkownika</DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            <span>
              {user.email} ({user.userData?.first_name || '-'} {user.userData?.last_name || '-'})
            </span>
            <span className="text-muted-foreground text-sm">
              Zaznacz odpowiednie pola, aby włączyć lub ukryć uprawnienia.
            </span>
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="text-center text-muted-foreground">Ładowanie uprawnień...</div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : Object.keys(userPermissions).length > 0 ? (
          <div className="space-y-4">
            <PermissionCheckboxGroup
              userPermissions={userPermissions}
              onPermissionChange={handlePermissionChange}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>Zapisz</Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">Brak uprawnień do edycji.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditPermissionsDialog;