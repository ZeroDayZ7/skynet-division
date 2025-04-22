// app/user-management/components/UserActionsMenu.tsx
'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { SelectedUser } from '../types/actions';

interface MenuAction {
  label: string;
  action: SelectedUser['action'];
  destructive?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface Props {
  user: User;
  setSelectedUser: (user: SelectedUser | null) => void;
  customActions?: MenuAction[];
}

export const UserActionsMenu: React.FC<Props> = ({ user, setSelectedUser, customActions = [] }) => {
  // Podstawowe akcje
  const baseActions: MenuAction[] = [
    {
      label: 'Edytuj użytkownika',
      action: 'edit',
      icon: <PencilIcon className="mr-2 h-4 w-4" />,
    },
    {
      label: 'Edytuj uprawnienia',
      action: 'permissions',
      icon: <ShieldIcon className="mr-2 h-4 w-4" />,
    },
    {
      label: user.userBlock ? 'Odblokuj użytkownika' : 'Zablokuj użytkownika',
      action: 'block',
      icon: user.userBlock ? (
        <UnlockIcon className="mr-2 h-4 w-4" />
      ) : (
        <LockIcon className="mr-2 h-4 w-4" />
      ),
    },
    {
      label: 'Usuń użytkownika',
      action: 'delete',
      destructive: true,
      icon: <TrashIcon className="mr-2 h-4 w-4" />,
    },
  ];

  // Połącz podstawowe akcje z niestandardowymi
  const allActions = [...baseActions, ...customActions];

  const actionButtons = useMemo(() => {
    return allActions.length > 0 ? (
      allActions.map((action) => (
        <Button
          key={`${action.action}-${user.id}`}
          variant="ghost"
          className={`w-full justify-start ${action.destructive ? 'text-destructive' : ''}`}
          onClick={() => setSelectedUser({ id: user.id, action: action.action })}
          disabled={action.disabled}
        >
          {action.icon}
          {action.label}
        </Button>
      ))
    ) : (
      <div className="text-center text-muted-foreground">Brak dostępnych akcji</div>
    );
  }, [allActions, user.id, setSelectedUser]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="end">
        {actionButtons}
      </PopoverContent>
    </Popover>
  );
};

// Proste ikony (możesz zastąpić prawdziwymi komponentami z lucide-react)
const PencilIcon = () => <svg />;
const ShieldIcon = () => <svg />;
const LockIcon = () => <svg />;
const UnlockIcon = () => <svg />;
const TrashIcon = () => <svg />;