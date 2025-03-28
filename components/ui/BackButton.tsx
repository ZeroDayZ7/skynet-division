"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa"; // Ikona strzałki w lewo

// Komponent przycisku cofania
export default function BackButton() {
  const router = useRouter(); // Hook do nawigacji w Next.js

  const goBack = () => {
    router.back(); // Cofnij użytkownika do poprzedniej strony
  };

  return (
    <button 
      onClick={goBack} 
      className="text-blue-500 flex items-center gap-2 mb-4"
    >
      <FaArrowLeft />
      Cofnij
    </button>
  );
}
