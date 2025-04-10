"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { FaSpinner, FaUserShield } from "react-icons/fa";
import { IconType } from "react-icons";

interface MenuItem {
  id?: number | string;
  icon: IconType;
  link: string;
  label: string;
  enabled: boolean;
  hidden?: boolean;
  admin?: boolean; // Nowe pole: czy element jest związany z adminem
}

interface MenuGridProps {
  items: MenuItem[];
  gridCols?: string;
  className?: string;
  showAdmin?: boolean; // Nowy props: czy pokazywać panel admina
}

export default function MenuGrid({
  items,
  gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  className = "",
  showAdmin = false, // Domyślnie wyłączone
}: MenuGridProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => !item.hidden); // Ukrywamy elementy z hidden: true

    // Dodajemy panel admina tylko, jeśli showAdmin jest true i użytkownik jest adminem
    if (showAdmin && user?.role === "admin") {
      result = [
        ...result,
        {
          id: "admin-panel",
          icon: FaUserShield,
          link: "/admin",
          label: "Panel Administracyjny",
          enabled: true,
          hidden: false,
          admin: true, // Oznaczamy jako element admina
        },
      ];
    }

    return result;
  }, [items, user, showAdmin]);

  const handleNavigation = (link: string, index: number) => {
    setLoadingIndex(index);
    router.push(link);
  };

  return (
    <div className={`grid gap-4 p-2 ${gridCols} ${className}`}>
      {filteredItems.map(({ icon: Icon, link, label, enabled }, index) => (
        <button
          key={filteredItems[index].id ?? index} // Używamy id lub index
          onClick={() => enabled && handleNavigation(link, index)}
          className={`flex flex-col items-center justify-center p-4 rounded shadow-md transition
            bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700
            ${enabled ? "" : "opacity-50 cursor-not-allowed"}`}
          disabled={!enabled || loadingIndex === index}
        >
          {loadingIndex === index ? (
            <FaSpinner className="text-4xl mb-2 text-gray-700 dark:text-gray-200 animate-spin" />
          ) : (
            <Icon className="text-4xl mb-2 text-gray-700 dark:text-gray-200" />
          )}
          <span className="text-sm text-gray-700 font-medium dark:text-gray-200">{label}</span>
        </button>
      ))}
    </div>
  );
}