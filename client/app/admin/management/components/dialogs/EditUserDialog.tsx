// app/user-management/components/dialogs/EditUserDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User } from '../../types/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { editUser } from '../../actions/editUser';
import { USER_ROLES } from '../../constants';

interface EditUserDialogProps {
  userId: string | null;
  onClose: () => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({ userId, onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState(!!userId);
  const [formData, setFormData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      console.log(`EditUserDialog: Pobieram dane dla userId=${userId}`);
      const cookieStore = document.cookie;
      fetch(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore,
        },
      })
        .then((res) => {
          console.log(`EditUserDialog: Odpowiedź serwera: ${res.status}`);
          if (!res.ok) throw new Error('Nie znaleziono użytkownika');
          return res.json();
        })
        .then((data) => {
          setFormData({
            id: Number(data.id),
            email: data.email,
            role: data.role,
            userBlock: data.userBlock,
            permissions: data.permissions || {},
            userData: data.userData
              ? {
                  first_name: data.userData.first_name,
                  last_name: data.userData.last_name,
                }
              : null,
          });
          setError(null);
        })
        .catch((err) => {
          console.error('EditUserDialog: Błąd pobierania użytkownika:', err);
          setError('Nie udało się pobrać danych użytkownika');
        });
    }
  }, [userId]);

  const handleSave = async () => {
    if (formData) {
      console.log(`EditUserDialog: Zapisuję dane dla userId=${userId}`);
      await editUser(formData);
      router.refresh();
      setOpen(false);
      onClose();
    }
  };

  if (!userId) {
    console.log('EditUserDialog: Brak userId, nie renderuję dialogu');
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(`EditUserDialog: Zmiana stanu open=${open}`);
        setOpen(open);
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj użytkownika: {formData?.userData?.first_name || formData?.email || 'ID: ' + userId}</DialogTitle>
        </DialogHeader>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : !formData ? (
          <div>Ładowanie danych...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Imię</Label>
              <Input
                value={formData.userData?.first_name || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userData: { ...formData.userData!, first_name: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label>Nazwisko</Label>
              <Input
                value={formData.userData?.last_name || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userData: { ...formData.userData!, last_name: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label>Rola</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz rolę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={USER_ROLES.ADMIN}>Admin</SelectItem>
                  <SelectItem value={USER_ROLES.MODERATOR}>Moderator</SelectItem>
                  <SelectItem value={USER_ROLES.USER}>User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} disabled={!formData}>
              Zapisz
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};