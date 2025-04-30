'use client';

import { FaUserPlus, FaUsersCog, FaClipboardList } from 'react-icons/fa';
import { usePermissions } from '@/context/PermissionsContext';
import MenuGrid from '@/components/ui/MenuGrid';

const adminMenu = [
  { id: 1, name: 'Zarejestruj Użytkownika', icon: FaUserPlus, link: '/admin/register', permissionKey: 'userCreate' },
  { id: 2, name: 'Zarządzanie Użytkownikami', icon: FaUsersCog, link: '/admin/management', permissionKey: 'userManagement' },
  { id: 3, name: 'Logi Systemowe', icon: FaClipboardList, link: '/admin/logs', permissionKey: 'viewLogs' },
  // { id: 4, name: 'Zarządzanie Użytkownikami2', icon: FaUsersCog, link: '/admin/management2', permissionKey: 'userManagement' },
];

export default function AdminPanelPage() {
  const { permissions, hasPermissionEnabled, hasPermissionVisible } = usePermissions();
  console.debug('== AdminPanelPage ==', permissions);

  if (!permissions) {
    return <div className="text-center text-red-500">Brak uprawnień</div>;
  }

  const documentItems = adminMenu
    .map((doc) => ({
      icon: doc.icon,
      link: doc.link,
      label: doc.name,
      enabled: hasPermissionEnabled(doc.permissionKey), // Używamy hasPermissionEnabled
      visible: hasPermissionVisible(doc.permissionKey), // Używamy hasPermissionVisible
    }))
    .filter((item) => item.visible); // Filtrujemy menu, pokazując tylko te, które mają visible === true

  return (
    <div className="mx-auto">
      <h1 className="mb-4 text-center text-2xl font-bold">Panel Administracyjny</h1>
      <MenuGrid items={documentItems} />
    </div>
  );
}