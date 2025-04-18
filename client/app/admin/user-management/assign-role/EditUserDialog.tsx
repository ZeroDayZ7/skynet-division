'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RoleSelection } from './RoleSelection';
import { PermissionSelection } from './PermissionSelection';
import { User } from './types';

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  customPermissions: Record<string, boolean>;
  onRoleChange: (role: string) => void;
  onPermissionChange: (key: string, value: boolean) => void;
  onSave: () => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onOpenChange,
  selectedUser,
  customPermissions,
  onRoleChange,
  onPermissionChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edytuj użytkownika: {selectedUser?.name || 'Brak użytkownika'}
          </DialogTitle>
        </DialogHeader>
        {selectedUser && (
          <div className="space-y-4">
            <RoleSelection
              selectedRole={selectedUser.role}
              onRoleChange={onRoleChange}
            />
            <PermissionSelection
              permissions={customPermissions}
              onPermissionChange={onPermissionChange}
            />
            <Button onClick={onSave}>Zapisz</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};