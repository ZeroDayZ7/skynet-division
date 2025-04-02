"use client";

import { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";

export default function PointsDisplay() {
  const [points, setPoints] = useState(0); // Lokalny stan punktów
  const [isAnimating, setIsAnimating] = useState(false);

  // Symulacja punktów za rejestrację przy pierwszym renderowaniu
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem("hasVisited");
    if (isFirstVisit) {
      setPoints(50); // 50 punktów za rejestrację
      localStorage.setItem("hasVisited", "true");
      localStorage.setItem("userPoints", "50");
    } else {
      const savedPoints = localStorage.getItem("userPoints");
      setPoints(savedPoints ? parseInt(savedPoints) : 0);
    }
  }, []);

  // Funkcja dodawania losowych punktów
  const handleEarnPoints = () => {
    setIsAnimating(true);
    const earned = Math.floor(Math.random() * 50) + 10; // Losowe punkty 10-60
    const newPoints = points + earned;
    setPoints(newPoints);
    localStorage.setItem("userPoints", newPoints.toString());
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div
      className={`flex items-center bg-yellow-100 px-4 py-2 rounded-full shadow-md ${
        isAnimating ? "animate-bounce" : ""
      }`}
      onClick={handleEarnPoints}
    >
      <FaCoins className="text-yellow-500 text-2xl mr-2" />
      <span className="font-bold text-gray-800">{points} pkt</span>
    </div>
  );
}