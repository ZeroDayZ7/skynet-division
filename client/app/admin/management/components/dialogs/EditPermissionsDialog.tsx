'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/context/PermissionsContext';
import { useRouter } from 'next/navigation';
import { useEditPermissions } from './hooks/useEditPermissions';
import { PermissionCheckboxGroup } from '../PermissionCheckboxGroup';
import { User } from '../../types/user';

interface EditPermissionsDialogProps {
  user: User;
  onClose: () => void;
}

export const EditPermissionsDialog: React.FC<EditPermissionsDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const { hasPermissionEnabled, hasPermissionVisible } = usePermissions();
  const hasEditPermission = hasPermissionEnabled('userEditPermissions') && hasPermissionVisible('userEditPermissions');

  const {
    userPermissions,
    setUserPermissions,
    loading,
    error,
    savePermissions,
    // assignDefaultPermissions,
  } = useEditPermissions(user, hasEditPermission, onClose);

  const handleSave = async () => {
    await savePermissions();
    router.refresh();
    onClose();
  };

  if (!hasEditPermission || !user) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {Object.keys(userPermissions).length > 0 ? 'Edytuj uprawnienia użytkownika' : 'Nadaj uprawnienia użytkownikowi'}
          </DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            <span>{user.email} ({user.userData?.first_name || '-'} {user.userData?.last_name || '-'})</span>
            <span className="text-muted-foreground text-sm">
              Zaznacz odpowiednie pola, aby włączyć lub ukryć uprawnienia.
            </span>
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="text-center text-muted-foreground">Ładowanie...</div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : Object.keys(userPermissions).length > 0 ? (
          <div className="space-y-4">
            <PermissionCheckboxGroup
              userPermissions={userPermissions}
              onPermissionChange={setUserPermissions}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>Zapisz</Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <div>Brak przypisanych uprawnień.</div>
            {/* <Button onClick={assignDefaultPermissions}>Nadaj uprawnienia</Button> */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditPermissionsDialog;
