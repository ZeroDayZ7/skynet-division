"use client";

import { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { useAuth } from "@/context/auth-context";

export default function PointsDisplay() {
  const { user } = useAuth();
  const [points, setPoints] = useState<number>(); // Lokalny stan punktów

  
  useEffect(() => {
    if (user) {
      setPoints(user.points); // Pobieramy punkty z usera w context
    }
  }, [user]); // Używamy 'user' w zależności od jego zmiany


  return (
    <div
      className={`flex items-center bg-yellow-100 px-4 py-2 rounded-full shadow-md dark:bg-gray-700`}
    >
      <FaCoins className="text-yellow-500 text-2xl mr-2 dark:text-gray-200" />
      <span className="font-bold text-gray-700 dark:text-gray-200">{points} pkt</span>
    </div>
  );
}