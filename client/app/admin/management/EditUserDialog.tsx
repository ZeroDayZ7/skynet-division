'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User } from './types';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { editUser } from './actions';

export const EditUserDialog: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('editUser');
  const [open, setOpen] = useState(!!userId);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      const cookieStore = document.cookie;
      fetch(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Nie znaleziono użytkownika');
          return res.json();
        })
        .then((data) => setFormData({
          id: Number(data.id),
          email: data.email,
          points: data.points,
          login_count: data.login_count,
          role: data.role,
          userBlock: data.userBlock,
          lastLoginIp: data.lastLoginIp,
          permissions: data.permissions || {},
          userData: data.userData ? {
            first_name: data.userData.first_name,
            last_name: data.userData.last_name,
          } : undefined,
        }))
        .catch((err) => console.error('Błąd pobierania użytkownika:', err));
    }
  }, [userId]);

  const handleSave = async () => {
    if (formData) {
      await editUser(formData);
      router.push('?');
      setOpen(false);
    }
  };

  if (!formData) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) router.push('?');
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj użytkownika: {formData.userData?.first_name || formData.email}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Imię</Label>
            <Input
              value={formData.userData?.first_name || ''}
              onChange={(e) => setFormData({
                ...formData,
                userData: { ...formData.userData!, first_name: e.target.value },
              })}
            />
          </div>
          <div>
            <Label>Nazwisko</Label>
            <Input
              value={formData.userData?.last_name || ''}
              onChange={(e) => setFormData({
                ...formData,
                userData: { ...formData.userData!, last_name: e.target.value },
              })}
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
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave}>Zapisz</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};