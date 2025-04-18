"use client";

import React from "react";
import { FaUser, FaUserEdit, FaUserPlus, FaUserShield, FaTrashAlt, FaBan } from "react-icons/fa";
import MenuGrid from "@/components/ui/MenuGrid";

// Symulacja pobierania opcji zarządzania użytkownikami
const userManagementItems = [
  { id: 1, name: "Dodaj użytkownika", icon: FaUserPlus, enabled: true, link: "/user-management/create" },
  { id: 2, name: "Edytuj użytkownika", icon: FaUserEdit, enabled: true, link: "/user-management/edit" },
  { id: 3, name: "Usuń użytkownika", icon: FaTrashAlt, enabled: true, link: "/user-management/delete" },
  { id: 4, name: "Przydziel rolę", icon: FaUserShield, enabled: true, link: "/admin/user-management/assign-role" },
  { id: 5, name: "Lista użytkowników", icon: FaUser, enabled: true, link: "/user-management/list" },
  { id: 6, name: "Zablokuj użytkownika", icon: FaBan, enabled: true, link: "/user-management/block" },
];

// Mapowanie na format MenuItem
const userManagementItemsFormatted = userManagementItems.map((item) => ({
  id: item.id,
  icon: item.icon,
  link: item.link,
  label: item.name,
  enabled: item.enabled,
  hidden: false, // Domyślnie widoczne, możesz ustawić na true w zależności od warunków
  admin: true, // Możesz dodać admin, jeśli opcja dotyczy tylko administratorów
}));

export default function UserManagementPage() {
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-green-500">Zarządzanie użytkownikami</h1>
      {/* Komponent MenuGrid, przekazujemy dane dotyczące zarządzania użytkownikami */}
      <MenuGrid items={userManagementItemsFormatted} />
    </div>
  );
}
