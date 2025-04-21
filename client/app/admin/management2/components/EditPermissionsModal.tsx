'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fetchUserPermissions } from '../lib/fetchUserPermissions';
import { useState, useEffect } from 'react';
import { Permissions } from '@/context/permissions/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface EditPermissionsDialogProps {
  isOpen: boolean;
  userId: string | null;
  onClose: () => void;
}

export const EditPermissionsDialog = ({ isOpen, userId, onClose }: EditPermissionsDialogProps) => {
  const [permissions, setPermissions] = useState<Permissions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      const loadPermissions = async () => {
        setIsLoading(true);
        try {
          const fetchedPermissions = await fetchUserPermissions(userId);
          setPermissions(fetchedPermissions);
        } catch (error) {
          console.error('Błąd pobierania uprawnień:', error);
          setPermissions(null);
        } finally {
          setIsLoading(false);
        }
      };
      loadPermissions();
    }
  }, [isOpen, userId]);

  const handleSave = () => {
    // TODO: Implementacja zapisu uprawnień (backend)
    console.log('Zapisywanie uprawnień:', permissions);
    onClose();
  };

  const updatePermission = (key: string, field: 'is_enabled' | 'is_visible', value: boolean) => {
    if (permissions) {
      setPermissions({
        ...permissions,
        [key]: {
          ...permissions[key],
          [field]: value,
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj uprawnienia użytkownika {userId}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="text-center">Ładowanie...</div>
        ) : !permissions ? (
          <div className="text-center text-red-500">Błąd ładowania uprawnień</div>
        ) : (
          <div className="space-y-4">
            {Object.entries(permissions).map(([key, perm]) => (
              <div key={key} className="flex items-center space-x-4">
                <div className="flex-1">{key}</div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${key}-enabled`}
                    checked={perm.is_enabled}
                    onCheckedChange={(checked) =>
                      updatePermission(key, 'is_enabled', !!checked)
                    }
                  />
                  <Label htmlFor={`${key}-enabled`}>Włączone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${key}-visible`}
                    checked={perm.is_visible}
                    onCheckedChange={(checked) =>
                      updatePermission(key, 'is_visible', !!checked)
                    }
                  />
                  <Label htmlFor={`${key}-visible`}>Widoczne</Label>
                </div>
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>Zapisz</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};