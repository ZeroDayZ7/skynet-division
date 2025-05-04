'use client';

import {
  UserPlus,
  Users,
  ClipboardList,
  Mail
} from 'lucide-react';
import { usePermissions } from '@/context/PermissionsContext';
import MenuGrid from '@/components/ui/MenuGrid';

const adminMenu = [
  {
    id: 1,
    name: 'Zarejestruj Użytkownika',
    icon: UserPlus,
    link: '/admin/register',
    permissionKey: 'userCreate',
  },
  {
    id: 2,
    name: 'Zarządzanie Użytkownikami',
    icon: Users,
    link: '/admin/management',
    permissionKey: 'userManagement',
  },
  {
    id: 3,
    name: 'Logi Systemowe',
    icon: ClipboardList,
    link: '/admin/logs',
    permissionKey: 'viewLogs',
  },
  {
    id: 4,
    name: 'Wiadomości Supportu',
    icon: Mail,
    link: '/admin/support-messages',
    permissionKey: 'supportMessages',
  },
];

export default function AdminPanelPage() {
  const { permissions, hasPermissionEnabled, hasPermissionVisible } = usePermissions();

  if (!permissions) {
    return <div className="text-center text-red-500">Brak uprawnień</div>;
  }

  const documentItems = adminMenu
    .map((doc) => ({
      icon: doc.icon,
      link: doc.link,
      label: doc.name,
      enabled: hasPermissionEnabled(doc.permissionKey),
      visible: hasPermissionVisible(doc.permissionKey),
    }))
    .filter((item) => item.visible);

  return (
    <div className="mx-auto">
      <h1 className="mb-4 text-center text-2xl font-bold">Panel Administracyjny</h1>
      <MenuGrid items={documentItems} />
    </div>
  );
}
