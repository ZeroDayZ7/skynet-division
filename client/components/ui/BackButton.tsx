"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa"; // Ikona strzałki w lewo
import { Button } from "./button";

// Komponent przycisku cofania
export default function BackButton() {
  const router = useRouter(); // Hook do nawigacji w Next.js

  const goBack = () => {
    router.back(); // Cofnij użytkownika do poprzedniej strony
  };

  return (
    <Button 
      onClick={goBack}
      variant={'ghost'}
      className="hover:text-blue-400 dark:text-green-500  dark:hover:text-green-300"
    >
      <FaArrowLeft />
      Cofnij
    </Button>
  );
}
