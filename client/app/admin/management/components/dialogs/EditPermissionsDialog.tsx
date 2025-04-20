// app/user-management/components/dialogs/EditPermissionsDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useApi } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/context/PermissionsContext';
import { getPermissions, editPermissions } from '../../actions/editPermissions';

interface Permission {
  enabled: boolean;
  hidden: boolean;
}

interface Permissions {
  [key: string]: Permission;
}

interface EditPermissionsDialogProps {
  user: { id: string; email: string; first_name?: string; last_name?: string } | null;
  onClose: () => void;
}

export const EditPermissionsDialog: React.FC<EditPermissionsDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const { execute } = useApi();
  const { permissions } = usePermissions();
  const [open, setOpen] = useState(false);
  const [userPermissions, setUserPermissions] = useState<Permissions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sprawdź uprawnienia i dane użytkownika
  const hasPermission = permissions && permissions.userEditPermissions ? permissions.userEditPermissions.enabled && !permissions.userEditPermissions.hidden : false;

  useEffect(() => {
    console.log(`EditPermissionsDialog: Aktualizacja user=${JSON.stringify(user)}, hasPermission=${hasPermission}`);
    setOpen(!!user && hasPermission);

    if (user && hasPermission) {
      const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        console.log(`EditPermissionsDialog: Pobieranie uprawnień dla userId=${user.id}`);
        try {
          const response = await execute(getPermissions, user.id);
          if (response.success && response.data) {
            console.log(`EditPermissionsDialog: Pobrano uprawnienia:`, response.data);
            setUserPermissions(response.data);
          } else {
            console.log('EditPermissionsDialog: Nie udało się pobrać uprawnień, response=', response);
            setError(response.message);
            // setOpen(false);
          }
        } catch (error) {
          console.error('EditPermissionsDialog: Błąd pobierania uprawnień:', error);
          setError('Wystąpił błąd podczas pobierania uprawnień.');
          setOpen(false);
        } finally {
          setLoading(false);
        }
      };
      fetchPermissions();
    } else {
      console.log('EditPermissionsDialog: Brak user lub uprawnień, zamykam dialog');
      setUserPermissions(null);
      setOpen(false);
    }
  }, [user, hasPermission, execute]);

  const handlePermissionChange = (key: string, field: 'enabled' | 'hidden', value: boolean) => {
    console.log(`EditPermissionsDialog: Zmiana uprawnienia ${key}.${field} na ${value}`);
    setUserPermissions((prev) =>
      prev
        ? {
            ...prev,
            [key]: {
              ...prev[key],
              [field]: value,
            },
          }
        : prev
    );
  };

  const handleSave = async () => {
    if (user && userPermissions) {
      console.log(`EditPermissionsDialog: Zapisywanie uprawnień dla userId=${user.id}`, userPermissions);
      setError(null);
      try {
        const result = await execute(editPermissions, user.id, userPermissions);
        if (result.success) {
          console.log('EditPermissionsDialog: Uprawnienia zapisano pomyślnie');
          setOpen(false);
          onClose();
          router.refresh();
        } else {
          console.log('EditPermissionsDialog: Błąd zapisywania uprawnień, result=', result);
          setError(result.message);
        }
      } catch (error) {
        console.error('EditPermissionsDialog: Błąd zapisywania uprawnień:', error);
        setError('Wystąpił błąd podczas zapisywania uprawnień.');
      }
    }
  };

  if (!user || !permissions || !permissions.userEditPermissions || !permissions.userEditPermissions.enabled || permissions.userEditPermissions.hidden) {
    console.log('EditPermissionsDialog: Brak danych użytkownika lub uprawnień, nie renderuję dialogu');
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(`EditPermissionsDialog: Zmiana stanu open=${open}`);
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
            <strong className="font-semibold dark:text-green-500">Zarządzaj uprawnieniami dla użytkownika: {user.email}</strong>
            <samp className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <samp className="font-semibold dark:text-green-500">ID</samp>
              <samp>{user.id}</samp>
              <samp className="font-semibold dark:text-green-500">Email</samp>
              <samp>{user.email}</samp>
              <samp className="font-semibold dark:text-green-500">Imię</samp>
              <samp>{user.first_name || '-'}</samp>
              <samp className="font-semibold dark:text-green-500">Nazwisko</samp>
              <samp>{user.last_name || '-'}</samp>
            </samp>
            <samp className="text-muted-foreground text-sm">Zaznacz odpowiednie pola, aby włączyć lub ukryć uprawnienia.</samp>
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="text-center text-muted-foreground">Ładowanie uprawnień...</div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : userPermissions ? (
          <div className="space-y-4">
            {Object.entries(userPermissions).map(([key, perm]) => (
              <div key={key} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${key}-enabled`}
                    checked={perm.enabled}
                    onCheckedChange={(checked) => handlePermissionChange(key, 'enabled', !!checked)}
                  />
                  <Label htmlFor={`${key}-enabled`} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()} - Włączone
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${key}-hidden`}
                    checked={perm.hidden}
                    onCheckedChange={(checked) => handlePermissionChange(key, 'hidden', !!checked)}
                  />
                  <Label htmlFor={`${key}-hidden`} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()} - Ukryte
                  </Label>
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  console.log('EditPermissionsDialog: Anulowano edycję uprawnień');
                  setOpen(false);
                  onClose();
                }}
              >
                Anuluj
              </Button>
              <Button onClick={handleSave}>Zapisz</Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-destructive">Brak danych uprawnień.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};