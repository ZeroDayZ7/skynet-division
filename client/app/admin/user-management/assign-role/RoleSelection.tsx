import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface RoleSelectionProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ selectedRole, onRoleChange }) => {
  return (
    <div>
      <Label>Rola</Label>
      <Select value={selectedRole} onValueChange={onRoleChange}>
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
  );
};