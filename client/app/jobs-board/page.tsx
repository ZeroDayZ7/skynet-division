"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlusCircle, FaSearch, FaFilter, FaSpinner, FaBriefcase } from "react-icons/fa";

const actions = [
  { id: 1, name: "Dodaj Ogłoszenie", icon: FaPlusCircle, enabled: true, link: "/jobs-board/new" },
  { id: 2, name: "Szukaj Pracy", icon: FaSearch, enabled: true, link: "/jobs-board/search" },
  { id: 3, name: "Filtruj Wyniki", icon: FaFilter, enabled: false, link: "#" }
];

export default function JobBoard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (link: string) => {
    if (link !== "#") {
      setIsLoading(true);
      setTimeout(() => {
        router.push(link);
      }, 500);
    }
  };

  return (
    <div className="job-board flex flex-col min-h-screen p-4">
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <FaSpinner className="text-6xl text-gray-600 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col flex-1 p-4 gap-6">
          <div className="grid grid-cols-3 gap-4">
            {actions.map(({ id, name, icon: Icon, enabled, link }) => (
              <button
                key={id}
                onClick={() => enabled && handleNavigation(link)}
                className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-md transition ${
                enabled ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!enabled}
              >
                <Icon className="text-4xl" />
                <span className="mt-2">{name}</span>
              </button>
            ))}
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold">Oferty Pracy</h2>
            <p className="text-gray-700">Lista dostępnych ofert pracy będzie tutaj.</p>
          </div>
        </div>
      )}
    </div>
  );
}
