// app/user-management/components/dialogs/EditPermissionsDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/context/PermissionsContext';
import { usePermissionsDialog } from '../../hooks/usePermissionsDialog';
import { PermissionCheckboxGroup } from '../PermissionCheckboxGroup';
import { UserInfo } from '../UserInfo'; // Nowy komponent, patrz pytanie 3

interface EditPermissionsDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string } | null;
  onClose: () => void;
}

export const EditPermissionsDialog: React.FC<EditPermissionsDialogProps> = ({ user, onClose }) => {
  const { permissions } = usePermissions();
  const hasPermission = !!(permissions?.userEditPermissions?.enabled && !permissions.userEditPermissions.hidden);
  const { open, setOpen, userPermissions, loading, error, handlePermissionChange, handleSave } =
    usePermissionsDialog({ user, hasPermission, onClose });

  if (!user || !hasPermission) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj uprawnienia użytkownika</DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            <UserInfo user={user} />
            <samp className="text-muted-foreground text-sm">
              Zaznacz odpowiednie pola, aby włączyć lub ukryć uprawnienia.
            </samp>
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
              <Button variant="outline" onClick={() => setOpen(false)}>
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