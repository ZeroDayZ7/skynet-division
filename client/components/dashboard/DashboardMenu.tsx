'use client';

import React from "react";
import MenuGrid from "@/components/ui/MenuGrid";
import { FaIdCard, FaTools, FaBriefcase } from "react-icons/fa";

interface DashboardMenuProps {
  showAdmin: boolean;
}

export default function DashboardMenu({ showAdmin }: DashboardMenuProps) {
  const menuItems = [
    { icon: FaIdCard, link: "/electronic-documents", label: "eDokumenty", enabled: true },
    { icon: FaBriefcase, link: "/test", label: "TEST", enabled: true },
    { icon: FaTools, link: "/settings", label: "Ustawienia", enabled: true },
  ];

  // Mapowanie do formatu MenuGrid
  const items = menuItems.map((item) => ({
    icon: item.icon,
    link: item.link,
    label: item.label,
    enabled: item.enabled,
    hidden: false,
    admin: item.link === "/admin",
  }));

  return (
    <div className="mx-auto">
      <MenuGrid items={items} showAdmin={showAdmin} />
    </div>
  );
}
