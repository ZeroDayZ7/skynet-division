"use client";

import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";

interface UserData {
  user_id: number;
  first_name: string;
  second_name: string;
  last_name: string;
  pesel: string;
  document_number: string;
  issue_date: string;
  expiration_date: string;
  photo?: string;
  birth_date: string;
  birth_place: string;
}

const UserDataSchema = z.object({
  user_id: z.number(),
  first_name: z.string().min(1),
  second_name: z.string().min(1),
  last_name: z.string().min(1),
  pesel: z.string().length(11),
  document_number: z.string().min(1),
  issue_date: z.string().datetime(),
  expiration_date: z.string().datetime(),
  photo: z.string().url().optional(),
  birth_date: z.string().datetime(),
  birth_place: z.string().min(1),
});

const sanitize = (input: string) =>
  sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

  useEffect(() => {
    const fetchUserData = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const token = localStorage.getItem("jwt_token"); // lub z ciasteczka
        const response = await fetch(`${apiUrl}/api/user-eid`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-CSRF-Token": await fetchCsrfToken(),
          },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Błąd pobierania danych");
        const rawData = await response.json();
        const data = UserDataSchema.parse(rawData);
        setUserData(data);
      } catch (error) {
        setError(error.name === "AbortError" ? "Przekroczono czas oczekiwania" : error.message);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // const fetchCsrfToken = async () => {
  //   const res = await fetch(`${apiUrl}/api/csrf-token`, { credentials: "include" });
  //   const { csrfToken } = await res.json();
  //   return csrfToken;
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!userData) {
    return <p className="text-center text-red-500">Nie udało się załadować danych użytkownika.</p>;
  }

  return (
    <div className="profile-page p-4">
      <h1 className="text-2xl font-bold mb-4">Profil Użytkownika</h1>
      <div className="flex items-center mb-4">
        {userData.photo ? (
          <img src={sanitize(userData.photo)} alt="User Photo" className="w-24 h-24 rounded-full border shadow-lg" />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            Brak zdjęcia
          </div>
        )}
        <div className="ml-4">
          <h2 className="text-xl font-semibold">
            {sanitize(userData.first_name)} {sanitize(userData.second_name)} {sanitize(userData.last_name)}
          </h2>
          <p className="text-gray-500">PESEL: {sanitize(userData.pesel)}</p>
        </div>
      </div>
      {/* Reszta JSX z sanitizacją tam, gdzie wyświetlasz dane */}
    </div>
  );
}