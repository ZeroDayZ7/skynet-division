// app/user-management/components/dialogs/EditUserDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApi } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/context/PermissionsContext';
import { editUser } from '../../actions/editUser';
import { UserInfo } from '../UserInfo';

interface EditUserDialogProps {
  userId: string | null;
  onClose: () => void;
}

interface UserData {
  email: string;
  first_name?: string;
  last_name?: string;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ userId, onClose }) => {
  console.log(`E5ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ67547457457E`);
  const router = useRouter();
  const { execute } = useApi();
  const { permissions } = usePermissions();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasPermission = !!(permissions?.userEdit?.enabled && !permissions.userEdit. visible);

  useEffect(() => {
    if (!userId || !hasPermission) {
      console.log('EditUserDialog: Brak userId lub uprawnień, zamykam dialog');
      setOpen(false);
      return;
    }

    console.log(`EditUserDialog: Aktualizacja userId=${userId}, hasPermission=${hasPermission}`);
    setOpen(true);

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      console.log(`EditUserDialog: Pobieranie danych dla userId=${userId}`);
      try {
        const response = await execute(userId);
        console.log(`EditUserDialog: Odpowiedź z getUser:`, JSON.stringify(response));
        if (response.success && response.data) {
          setUserData(response.data);
        } else {
          setError(response.message || 'Nie udało się pobrać danych użytkownika.');
        }
      } catch (error) {
        console.error('EditUserDialog: Błąd pobierania danych:', error);
        setError('Wystąpił błąd podczas pobierania danych.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, hasPermission, execute]);

  const handleSave = async () => {
    if (!userId || !userData) {
      setError('Brak danych do zapisania.');
      return;
    }

    console.log(`EditUserDialog: Zapisywanie danych dla userId=${userId}`, userData);
    setError(null);
    try {
      const result = await execute(editUser, userId, userData);
      console.log(`EditUserDialog: Odpowiedź z editUser:`, JSON.stringify(result));
      if (result.success) {
        console.log('EditUserDialog: Dane zapisano pomyślnie');
        setOpen(false);
        onClose();
        router.refresh();
      } else {
        setError(result.message || 'Nie udało się zapisać danych.');
      }
    } catch (error) {
      console.error('EditUserDialog: Błąd zapisywania danych:', error);
      setError('Wystąpił błąd podczas zapisywania danych.');
    }
  };

  if (!userId || !hasPermission) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(`EditUserDialog: Zmiana stanu open=${open}`);
        setOpen(open);
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj użytkownika</DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            {userData && <UserInfo user={userData} />}
            <samp className="text-muted-foreground text-sm">Wprowadź nowe dane użytkownika.</samp>
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="text-center text-muted-foreground">Ładowanie danych...</div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : userData ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="first_name">Imię</Label>
              <Input
                id="first_name"
                value={userData.first_name || ''}
                onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Nazwisko</Label>
              <Input
                id="last_name"
                value={userData.last_name || ''}
                onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  console.log('EditUserDialog: Anulowano edycję');
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
          <div className="text-center text-muted-foreground">Brak danych użytkownika.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;