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
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => !item.hidden); // Ukrywamy elementy z hidden: true

    // Dodajemy panel admina tylko, jeśli showAdmin jest true i użytkownik jest adminem
    if (showAdmin) {
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
  }, [items, showAdmin]);

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
          className={`flex flex-col items-center justify-center p-4 rounded shadow-md
            bg-card border dark:text-green-500  dark:hover:text-green-300 transition-colors duration-200 dark:hover:bg-muted/80
            ${enabled ? "" : "opacity-50 cursor-not-allowed disabled:dark:hover:text-green-500"}`}
          disabled={!enabled || loadingIndex === index}
        >
          {loadingIndex === index ? (
            <FaSpinner className="text-4xl mb-2 text-gray-700 dark:text-green-300 animate-spin" />
          ) : (
            <Icon className="text-4xl mb-2" />
          )}
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}