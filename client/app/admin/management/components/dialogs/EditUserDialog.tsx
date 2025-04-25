// components/user-management/dialogs/EditUserDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { editUser, getUser } from '@/app/admin/management/actions/editUser'; // Poprawny import
import { User } from '../../types/user';

interface EditUserDialogProps {
  user: User;
  onClose: () => void;
}

interface UserData {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    id: user.id,
    email: user.email,
    first_name: user.userData?.first_name || '',
    last_name: user.userData?.last_name || '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setMessage(null);
      try {
        const response = await getUser(user.id);
        if (response.success && response.data) {
          setUserData({ id: user.id, ...response.data });
        } else {
          setStatus('error');
          setMessage(response.message || 'Nie udało się pobrać danych użytkownika.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Wystąpił błąd podczas pobierania danych.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user.id]);

  const handleSave = async () => {
    if (!userData) {
      setStatus('error');
      setMessage('Brak danych do zapisania.');
      return;
    }

    setStatus('idle');
    setMessage(null);
    try {
      const result = await editUser(user.id, userData);
      if (result.success) {
        setStatus('success');
        setMessage('Dane użytkownika zapisano pomyślnie.');
        router.refresh();
      } else {
        setStatus('error');
        setMessage(result.message || 'Nie udało się zapisać danych.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Wystąpił błąd podczas zapisywania danych.');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setMessage(null);
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj użytkownika</DialogTitle>
          <DialogDescription className="space-y-4 text-left">
            {status === 'idle' && userData && (
              <span className="text-muted-foreground text-sm">Wprowadź nowe dane użytkownika.</span>
            )}
            {status !== 'idle' && message}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="text-center text-muted-foreground">Ładowanie danych...</div>
        ) : status === 'idle' && userData ? (
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
              <Button variant="outline" onClick={handleClose}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>Zapisz</Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <Button onClick={handleClose}>OK</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;