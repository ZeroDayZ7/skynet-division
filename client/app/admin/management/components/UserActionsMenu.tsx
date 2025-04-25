'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { User } from '../types/user';
import { useUserActions } from '@/context/UserActionsContext';
import { actionConfig } from '../hooks/actionConfig';
import { usePermissions } from '@/context/PermissionsContext';

interface Props {
  user: User;
}

export const UserActionsMenu: React.FC<Props> = ({ user }) => {
  const { setSelectedUser } = useUserActions();
  const { hasPermissionEnabled, hasPermissionVisible } = usePermissions();

  const [open, setOpen] = useState(false);
  const [actions, setActions] = useState<
    {
      label: string;
      action: string;
      destructive?: boolean;
      disabled: boolean;
      onClick: () => void;
    }[]
  >([]);

  useEffect(() => {
    if (!open) return;

    const availableActions = actionConfig
      .filter((config) => hasPermissionVisible(config.permissionKey))
      .map((config) => ({
        label: typeof config.label === 'function' ? config.label(user) : config.label,
        action: config.action,
        destructive: config.destructive,
        disabled: !hasPermissionEnabled(config.permissionKey),
        onClick: () =>
          setSelectedUser({ user, action: config.action }),
      }));

    setActions(availableActions);
  }, [open, user, hasPermissionVisible, hasPermissionEnabled, setSelectedUser]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="end">
        {actions.length > 0 ? (
          actions.map((action) => (
            <Button
              key={`${action.action}-${user.id}`}
              variant="ghost"
              disabled={action.disabled}
              className={`w-full justify-start ${action.destructive ? 'text-destructive' : ''}`}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))
        ) : (
          <div className="text-center text-muted-foreground">Brak dostępnych akcji</div>
        )}
      </PopoverContent>
    </Popover>
  );
};
