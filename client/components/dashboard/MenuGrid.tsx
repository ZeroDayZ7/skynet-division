"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  FaIdCard,
  FaNewspaper,
  FaLanguage,
  FaShoppingCart,
  FaTools,
  FaBriefcase,
  FaSpinner,
  FaUserShield,  // Ikona dla panelu admina
} from "react-icons/fa";

const menuItems = [
  { icon: FaIdCard, link: "/electronic-documents", label: "eDokumenty", enabled: true },
  { icon: FaNewspaper, link: "/citizens-projects", label: "Projekty Obywatelskie", enabled: true },
  { icon: FaLanguage, link: "/language-trainer", label: "Trener Języka", enabled: true },
  { icon: FaBriefcase, link: "/jobs", label: "Praca", enabled: true },
  { icon: FaShoppingCart, link: "/market", label: "Market", enabled: true },
  { icon: FaTools, link: "/settings", label: "Ustawienia", enabled: true },
];

export default function MenuGrid() {
  const { user } = useAuth();  // Pobieramy użytkownika z kontekstu
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null); // Śledzi, który przycisk się ładuje

  // Dodajemy przycisk administracyjny tylko dla użytkowników z rolą admin, z użyciem useMemo
  const menuWithAdmin = useMemo(() => {
    if (user?.role === "admin") {
      return [
        ...menuItems,
        {
          icon: FaUserShield,
          link: "/admin-panel",  // Link do panelu administracyjnego
          label: "Panel Administracyjny",
          enabled: true,
        },
      ];
    }
    return menuItems;
  }, [user]);

  const handleNavigation = (link: string, index: number) => {
    setLoadingIndex(index); // Ustawiamy indeks ładowanego przycisku
    router.push(link);
  };

  return (
    <div className="grid grid-cols-3 gap-4 flex-1 p-2">
      {menuWithAdmin.map(({ icon: Icon, link, label, enabled }, index) => (
        <button
          key={index}
          onClick={() => enabled && handleNavigation(link, index)}
          className={`flex flex-col items-center justify-center p-4 bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition dark:bg-gray-800 
            ${
            enabled ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!enabled || loadingIndex === index} // Wyłączamy przycisk podczas ładowania
        >
          {loadingIndex === index ? (
            <FaSpinner className="text-4xl text-gray-700 animate-spin" />
          ) : (
            <Icon className="text-4xl text-gray-700 dark:text-gray-200" />
          )}
          <span className="text-sm text-gray-700 mt-2 dark:text-gray-200">{label}</span>
        </button>
      ))}
    </div>
  );
}
