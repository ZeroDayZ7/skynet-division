'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getUserPermissions } from '../lib/getUserPermissions';
import { Permissions } from '../types/user';

interface EditPermissionsDialogProps {
  isOpen: boolean;
  userId: number;
  onClose: () => void;
}

const formatKey = (key: string) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

export const EditPermissionsDialog: React.FC<EditPermissionsDialogProps> = ({
  isOpen,
  userId,
  onClose,
}) => {
  const [permissions, setPermissions] = useState<Permissions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      setIsLoading(true);
      getUserPermissions(userId)
        .then((response) => {
          if (response.success && response.data) {
            setPermissions(response.data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, userId]);

  const handleCheckboxChange = (key: string, field: 'visible' | 'enabled') => {
    setPermissions((prev) => {
      if (!prev) return prev;
      
      return {
        ...prev,
        [key]: {
          ...prev[key],
          [field]: !prev[key][field],
        },
      };
    });
  };

  const handleSave = async () => {
    if (!permissions) return;

    try {
      const response = await fetch(`/api/updatePermissions/${userId}`, {
        method: 'POST',
        body: JSON.stringify(permissions),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Błąd podczas zapisywania uprawnień');
      }

      onClose();
    } catch (error) {
      console.error('Błąd:', error);
      // Tutaj możesz dodać powiadomienie dla użytkownika
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Uprawnienia użytkownika {userId}</DialogTitle>
          <DialogDescription>
            {isLoading ? 'Ładowanie...' : 'Aktualne uprawnienia tego użytkownika.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {permissions && Object.entries(permissions).map(([key, perm]) => (
            <div key={key} className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-4">
                <Label htmlFor={`${key}-name`} className="text-sm font-medium">
                  {formatKey(key)}
                </Label>
                {perm.description && (
                  <p className="text-xs text-muted-foreground">{perm.description}</p>
                )}
              </div>

              <div className="col-span-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${key}-visible`}
                    checked={perm.visible}
                    onCheckedChange={() => handleCheckboxChange(key, 'visible')}
                  />
                  <Label htmlFor={`${key}-visible`}>Widoczne</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${key}-enabled`}
                    checked={perm.enabled}
                    onCheckedChange={() => handleCheckboxChange(key, 'enabled')}
                  />
                  <Label htmlFor={`${key}-enabled`}>Aktywne</Label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Anuluj
          </Button>
          <Button onClick={handleSave} disabled={!permissions}>
            Zapisz zmiany
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};