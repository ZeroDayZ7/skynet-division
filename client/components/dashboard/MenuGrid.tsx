"use client";

import React from "react";
import {
  FaIdCard,
  FaNewspaper,
  FaLanguage,
  FaShoppingCart,
  FaTools,
  FaBriefcase,
} from "react-icons/fa";
import MenuGrid from '@/components/ui/MenuGrid';

const menuItems = [
  { icon: FaIdCard,        link: "/electronic-documents",  name: "eDokumenty",            enabled: true },
  // { icon: FaNewspaper,     link: "/citizens-projects",     name: "Projekty Obywatelskie", enabled: true },
  // { icon: FaLanguage,      link: "/language-trainer",      name: "Trener Języka",         enabled: true },
  // { icon: FaBriefcase,     link: "/jobs",                  name: "Praca",                 enabled: true },
  // { icon: FaShoppingCart,  link: "/market",                name: "Market",                enabled: true },
  { icon: FaTools,         link: "/settings",              name: "Ustawienia",            enabled: true },
];

// Mapowanie na format DashboardMenu
const documentItems = menuItems.map((doc) => ({
  icon: doc.icon,
  link: doc.link,
  label: doc.name,
  enabled: doc.enabled,
  hidden: false, // Domyślnie widoczne, można zmienić dla konkretnych
}));

export default function DashboardMenu() {
  return (
    <div className="mx-auto">
      <MenuGrid items={documentItems} showAdmin={true}/>
    </div>
  );
}
