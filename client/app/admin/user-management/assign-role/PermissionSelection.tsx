import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Permission } from './types';

interface PermissionSelectionProps {
  permissions: Record<string, boolean>;
  onPermissionChange: (key: string, value: boolean) => void;
}

export const PermissionSelection: React.FC<PermissionSelectionProps> = ({
  permissions,
  onPermissionChange,
}) => {
  const permissionsList: Permission[] = [
    { key: 'canCreateUser', label: 'Tworzenie użytkowników' },
    { key: 'canEditUser', label: 'Edycja użytkowników' },
    { key: 'canDeleteUser', label: 'Usuwanie użytkowników' },
    { key: 'canAssignRole', label: 'Przypisywanie ról' },
    { key: 'canBlockUser', label: 'Blokowanie użytkowników' },
  ];

  return (
    <div>
      <Label className='mb-2'>Indywidualne uprawnienia</Label>
      <div className="space-y-2">
        {permissionsList.map((perm) => (
          <div key={perm.key} className="flex items-center space-x-2">
            <Checkbox
              id={perm.key}
              checked={permissions[perm.key] ?? false}
              onCheckedChange={(checked) => onPermissionChange(perm.key, !!checked)}
            />
            <Label htmlFor={perm.key}>{perm.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};