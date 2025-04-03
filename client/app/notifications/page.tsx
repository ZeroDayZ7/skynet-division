"use client";

import { useState, useEffect, useCallback } from "react";
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaStar, FaSpinner } from "react-icons/fa";
import BackButton from "@/components/ui/BackButton";

// API URL z zmiennych środowiskowych
const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

// Typowanie dla typów powiadomień
type NotificationType = "success" | "warning" | "error" | "info";

// Mapowanie ikon dla typów powiadomień
const ICONS: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  success: FaCheckCircle,
  warning: FaExclamationTriangle,
  error: FaExclamationTriangle,
  info: FaInfoCircle,
};

// Funkcja do pobierania kolorów tła w zależności od typu
const getBgColor = (type: NotificationType): string => {
  switch (type) {
    case "success": return "bg-green-100 text-green-700 border-green-500";
    case "warning": return "bg-yellow-100 text-yellow-700 border-yellow-500";
    case "error": return "bg-red-100 text-red-700 border-red-500";
    case "info": return "bg-blue-100 text-blue-700 border-blue-500";
    default: return "bg-gray-100 text-gray-700 border-gray-500"; // Domyślny styl dla nieznanych typów
  }
};

// Typ dla powiadomienia
interface Notification {
  id?: number; // Dodajemy ID dla unikalności i oznaczania jako przeczytane
  template: {
    type: NotificationType;
    title?: string; // Opcjonalny tytuł
    message: string;
  };
  is_read?: boolean;
  created_at?: string; // ISO string daty
}

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Funkcja do pobierania powiadomień
  const fetchNotifications = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/api/users/notifications`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: pageNum, limit: 10 }), // Limit 10 na stronę
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      if (!Array.isArray(data.notifications)) {
        throw new Error("Invalid response format");
      }

      setNotifications((prevNotifications) => 
        pageNum === 1 ? data.notifications : [...prevNotifications, ...data.notifications]
      );
      setHasMore(data.notifications.length === 10); // Jeśli mniej niż 10, to koniec
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Pobieranie powiadomień przy zmianie strony
  useEffect(() => {
    fetchNotifications(page);
  }, [page, fetchNotifications]);

  // Funkcja do oznaczania powiadomienia jako przeczytanego
  const markAsRead = async (notificationId: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/notifications/${notificationId}/read`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to mark as read");

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Powiadomienia</h2>
        <BackButton />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Błąd: {error}. Spróbuj ponownie później.
        </div>
      )}

      {notifications.length === 0 && !loading && !error ? (
        <p className="text-center text-gray-500">Brak powiadomień</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notification, index) => {
            const id = notification.id ?? `temp-${index}`;
            const { template, is_read, created_at } = notification;
            const { type, title, message } = template;
            const Icon = ICONS[type] || FaInfoCircle; // Domyślna ikona, jeśli typ nieznany

            return (
              <li
                key={id}
                onClick={() => !is_read && markAsRead(id)} // Oznacz jako przeczytane po kliknięciu
                className={`flex justify-between items-center gap-3 p-3 border-l-4 rounded cursor-pointer transition-all ${
                  getBgColor(type)
                } ${is_read ? "opacity-60" : "hover:bg-opacity-80"}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-xl" />
                  <div>
                    {title && <span className="font-semibold block">{title}</span>}
                    <span>{message}</span>
                    <span className="text-xs text-gray-500 block mt-1">
                      {created_at ? new Date(created_at).toLocaleString() : ""}
                    </span>
                  </div>
                </div>
                {!is_read && (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <FaStar /> Nowe
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {loading && (
        <div className="flex justify-center mt-4">
          <FaSpinner className="text-2xl text-blue-500 animate-spin" />
        </div>
      )}

      {hasMore && !loading && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Pokaż więcej
        </button>
      )}
    </div>
  );
}