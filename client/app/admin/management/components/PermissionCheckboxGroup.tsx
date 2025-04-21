'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Permissions } from '@/context/permissions/types';

interface PermissionCheckboxGroupProps {
  userPermissions: Permissions;
  onPermissionChange: (key: string, field: 'is_enabled' | 'is_visible', value: boolean) => void;
}

export const PermissionCheckboxGroup = ({ userPermissions, onPermissionChange }: PermissionCheckboxGroupProps) => {
  return (
    <div className="space-y-2">
      {Object.entries(userPermissions).map(([key, perm]) => (
        <div key={key} className="flex items-center space-x-4">
          <div className="flex-1">{key}</div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${key}-enabled`}
              checked={perm.is_enabled}
              onCheckedChange={(checked) => onPermissionChange(key, 'is_enabled', !!checked)}
            />
            <Label htmlFor={`${key}-enabled`}>Włączone</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${key}-visible`}
              checked={perm.is_visible}
              onCheckedChange={(checked) => onPermissionChange(key, 'is_visible', !!checked)}
            />
            <Label htmlFor={`${key}-visible`}>Widoczne</Label>
          </div>
        </div>
      ))}
    </div>
  );
};