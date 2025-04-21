// app/user-management/components/PermissionCheckboxGroup.tsx
'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Permissions } from '../types/user';

interface PermissionCheckboxGroupProps {
  userPermissions: Permissions;
  onPermissionChange: (key: string, field: 'enabled' | ' visible', value: boolean) => void;
}

export const PermissionCheckboxGroup: React.FC<PermissionCheckboxGroupProps> = ({
  userPermissions,
  onPermissionChange,
}) => {
  return (
    <div className="space-y-4">
      {Object.entries(userPermissions).map(([key, perm]) =>
        perm ? (
          <div key={key} className="flex flex-col gap-2 border-b pb-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${key}-enabled`}
                checked={perm.enabled}
                onCheckedChange={(checked) => onPermissionChange(key, 'enabled', !!checked)}
              />
              <Label htmlFor={`${key}-enabled`} className="capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()} - Włączone
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${key}- visible`}
                checked={perm. visible}
                onCheckedChange={(checked) => onPermissionChange(key, ' visible', !!checked)}
              />
              <Label htmlFor={`${key}- visible`} className="capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()} - Ukryte
              </Label>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};