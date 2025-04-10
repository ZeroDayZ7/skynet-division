"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlusCircle, FaProjectDiagram, FaSpinner } from "react-icons/fa";

export default function CitizenProjectsHome() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNavigation = (link: string) => {
    setIsLoading(true);
    router.push(link);
  };

  return (
    <div className="citizens-projects flex flex-col p-4">
      {/* Ekran ładowania */}
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <FaSpinner className="text-6xl text-gray-600 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col flex-1 p-4 gap-6">
          {/* Przyciski akcji */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleNavigation("/citizens-projects/new")}
              className="flex flex-col items-center justify-center p-6 bg-green-600 
              text-white rounded shadow-md hover:bg-green-600 transition dark:text-black"
            >
              <FaPlusCircle className="text-4xl" />
              <span className="mt-2">Dodaj Projekt</span>
            </button>
            <button
              onClick={() => handleNavigation("/citizens-projects/list")}
              className="flex flex-col items-center justify-center p-6 bg-blue-600 
              text-white rounded shadow-md hover:bg-blue-600 transition"
            >
              <FaProjectDiagram className="text-4xl" />
              <span className="mt-2">Zobacz Projekty</span>
            </button>
          </div>

          {/* Sekcja z informacjami */}
          <div className="p-6 bg-gray-100 rounded shadow-md">
            <h2 className="text-lg font-semibold">Jak działają projekty obywatelskie?</h2>
            <p className="mt-2 text-gray-700">
              Mieszkańcy mogą zgłaszać swoje pomysły na poprawę społeczności. Każdy projekt przechodzi głosowanie i może zostać sfinansowany przez budżet obywatelski.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
