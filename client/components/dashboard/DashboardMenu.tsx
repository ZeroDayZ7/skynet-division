// components/dashboard/DashboardMenu.tsx
'use client';

import React from 'react';
import MenuGrid from '@/components/ui/MenuGrid';
import { FaIdCard, FaTools, FaBriefcase } from 'react-icons/fa';

export default function DashboardMenu() {
  const menuItems = [
    { icon: FaIdCard, link: '/electronic-documents', label: 'eDokumenty', enabled: true },
    { icon: FaBriefcase, link: '/test', label: 'TEST', enabled: true },
    { icon: FaTools, link: '/settings', label: 'Ustawienia', enabled: true },
  ];

  const items = menuItems.map((item) => ({
    icon: item.icon,
    link: item.link,
    label: item.label,
    enabled: item.enabled,
    hidden: false,
  }));

  return (
    <div className="mx-auto flex flex-col gap-4">
      <MenuGrid items={items} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
      </div>
    </div>
  );
}