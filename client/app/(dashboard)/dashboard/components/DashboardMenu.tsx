'use client';

import React from 'react';
import MenuGrid from '@/components/ui/MenuGrid';
import { FaIdCard, FaTools, FaBriefcase, FaUserShield } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function DashboardMenu() {
  const { user } = useAuth();

  const menuItems = [
    { 
      icon: FaIdCard, link: '/electronic-documents', 
      label: 'eDokumenty', 
      enabled: user?.hasDocumentsEnabled ?? false 
    },
    { 
      icon: FaBriefcase, link: '/test', 
      label: 'TEST',
      enabled: true 
    },
    { 
      icon: FaTools, 
      link: '/settings', 
      label: 'Ustawienia', 
      enabled: true 
    },
    ...(user?.role && (user.role === 'root' || user.role === 'init')
      ? [{ icon: FaUserShield, link: '/admin', label: 'Administracja', enabled: true }]
      : []),
  ];

  return (
    <div className="mx-auto flex flex-col gap-4">
      <MenuGrid items={menuItems} />
    </div>
  );
}
