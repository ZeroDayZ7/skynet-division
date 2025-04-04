"use client";

import { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { useAuth } from "@/context/auth-context";

export default function PointsDisplay() {
  const { user } = useAuth();
  const [points, setPoints] = useState<number>(0); // Lokalny stan punktów
  const [isAnimating, setIsAnimating] = useState(false);

  
  useEffect(() => {
    if (user) {
      setPoints(user.points); // Pobieramy punkty z usera w context
    }
  }, [user]); // Używamy 'user' w zależności od jego zmiany

  // Funkcja dodawania losowych punktów
  const handleEarnPoints = () => {
    setIsAnimating(true);
    // const earned = Math.floor(Math.random() * 50) + 10; // Losowe punkty 10-60
    // const newPoints = points + earned;
    // setPoints(newPoints);
    // localStorage.setItem("userPoints", newPoints.toString());
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div
      className={`flex items-center bg-yellow-100 px-4 py-2 rounded-full shadow-md`}
    >
      <FaCoins className="text-yellow-500 text-2xl mr-2" />
      <span className="font-bold text-gray-800">{points} pkt</span>
    </div>
  );
}