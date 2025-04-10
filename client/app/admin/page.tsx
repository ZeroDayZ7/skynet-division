'use client';

import { useRouter } from 'next/navigation';
import { FaUserPlus, FaUsersCog, FaClipboardList } from 'react-icons/fa';
import MenuGrid from '@/components/ui/MenuGrid';

const adminMenu = [
  { id: 1, name: 'Zarejestruj Użytkownika', icon: FaUserPlus, link: '/admin/register', enabled: true, hidden: false },
  { id: 2, name: 'Zarządzanie Użytkownikami', icon: FaUsersCog, link: '/admin/users', enabled: false, hidden: true },
  { id: 3, name: 'Logi Systemowe', icon: FaClipboardList, link: '/admin/logs', enabled: false, hidden: true },
];

const documentItems = adminMenu.map((doc) => ({
  icon: doc.icon,
  link: doc.link,
  label: doc.name,
  enabled: doc.enabled,
  // hidden: doc.hidden,
  hidden: false,
}));

export default function AdminPanelPage() {
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold my-4">
        Panel Administracyjny
      </h1>
      <MenuGrid items={documentItems}/>
    </div>
  );
}
