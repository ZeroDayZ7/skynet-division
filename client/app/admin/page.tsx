'use client';

import { FaUserPlus, FaUsersCog, FaClipboardList } from 'react-icons/fa';
import { usePermissions } from '@/context/PermissionsContext';
import MenuGrid from '@/components/ui/MenuGrid';

const adminMenu = [
  { id: 1, name: 'Zarejestruj Użytkownika', icon: FaUserPlus, link: '/admin/register', permissionKey: 'userCreate' },
  { id: 2, name: 'Zarządzanie Użytkownikami', icon: FaUsersCog, link: '/admin/management', permissionKey: 'userManagement' },
  { id: 3, name: 'Logi Systemowe', icon: FaClipboardList, link: '/admin/logs', permissionKey: 'viewLogs' },
];

export default function AdminPanelPage() {
  // Pobieranie uprawnień z kontekstu
  const { permissions } = usePermissions();

  // Modyfikacja menu na podstawie uprawnień
  const documentItems = adminMenu.map((doc) => ({
    icon: doc.icon,
    link: doc.link,
    label: doc.name,
    enabled: permissions?.[doc.permissionKey]?.enabled ?? false,  // Sprawdzamy, czy uprawnienie jest włączone
    hidden: permissions?.[doc.permissionKey]?.hidden ?? true,    // Sprawdzamy, czy uprawnienie jest ukryte
  }));

  // Renderowanie menu po załadowaniu uprawnień
 
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-green-500">
        Panel Administracyjny
      </h1>
      <MenuGrid items={documentItems} />
    </div>
  );
}
