'use client';

import { useState, useCallback } from 'react';
import {
  BadgeCheck,
  LogOut,
  ChevronsRight,
  Settings,
  ShieldUser,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import { NotificationBell } from './ui/NotificationBell'; // Wizualny komponent
import Notifications from '../notification/Notification';
import { UserPlanBadge } from './ui/UserPlanBadge';
import LogoutDialog from '../auth/LogoutDialog';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, fullUser } = useAuth();
  const t = useTranslations('NavUser');

  const [logoutOpen, setLogoutOpen] = useState(false);
  // Dodaj stan dla Dropdown Menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Stan dla Notification Sheet
  const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          {/* Uczyń DropdownMenu kontrolowanym */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                  <span className="truncate text-xs">{user?.role}</span>
                </div>
                <ChevronsRight className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {t('greeting')}: {user?.username}
                    </span>
                    <span className="truncate font-medium">
                      {t('role')}: {user?.role}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserPlanBadge plan={'free'} label={t('upgrade')} />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    <span>{t('account')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <ShieldUser className="mr-2 h-4 w-4" />
                    {t('administration')}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    {t('settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <DropdownMenuItem onSelect={() => setIsNotificationSheetOpen(true)}>
                  <NotificationBell
                    count={fullUser?.notifications}
                    label={t('notifications')}
                  />
                </DropdownMenuItem>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <DropdownMenuItem onSelect={() => setLogoutOpen(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Renderuj Sheet niezależnie od DropdownMenu */}
      <Notifications
        open={isNotificationSheetOpen}
        onOpenChange={setIsNotificationSheetOpen}
      />

      <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />

    </>
  );
}