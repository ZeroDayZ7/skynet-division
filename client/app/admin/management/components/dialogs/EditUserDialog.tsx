'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User } from '../../types/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { editUser } from '../../actions/editUser';
import { USER_ROLES } from '../../constants';
import { apiClient } from '@/lib/apiClient';

interface EditUserDialogProps {
  userId: string | null;
  onClose: () => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({ userId, onClose }) => {
  const router = useRouter();
  const { execute } = useApi();
  const [open, setOpen] = useState(!!userId);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      console.log(`EditUserDialog: Pobieram dane dla userId=${userId}`);
      execute(async () => {
        const result = await apiClient<User>(`/api/users/${userId}`, { method: 'GET' });
        if (result.success && result.data) {
          setFormData({
            id: Number(result.data.id),
            email: result.data.email,
            role: result.data.role,
            userBlock: result.data.userBlock,
            permissions: result.data.permissions || {},
            userData: result.data.userData
              ? {
                  first_name: result.data.userData.first_name,
                  last_name: result.data.userData.last_name,
                }
              : null,
          });
        }
        return result;
      });
    }
  }, [userId, execute]);

  const handleSave = async () => {
    if (formData) {
      console.log(`EditUserDialog: Zapisuję dane dla userId=${userId}`);
      const result = await execute(editUser, formData);
      if (result.success) {
        setOpen(false);
        onClose();
        router.refresh();
      }
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
        {!formData ? (
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