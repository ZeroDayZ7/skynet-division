"use client";

import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

export default function Notifications() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchNotificationsCount = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users/notifications/unread-count`, {
          method: "GET",
          credentials: "include", // Jeżeli potrzebujesz autoryzacji
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications count");
        }

        const data = await response.json();
        setCount(data.unreadCount); // Zakładając, że API zwraca pole `unreadCount`
      } catch (error) {
        console.error("Error fetching notifications count:", error);
      }
    };

    fetchNotificationsCount();
  }, []);

  const displayCount = count > 9 ? "9+" : count;

  return (
    <div className="relative">
      <FaBell className="text-gray-600 hover:text-blue-500 text-2xl cursor-pointer" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-4 flex items-center justify-center">
          {displayCount}
        </span>
      )}
    </div>
  );
}
