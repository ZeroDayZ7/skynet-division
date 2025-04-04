"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";

interface UserData {
  first_name: string;
  second_name?: string | null;
  last_name: string;
  pesel: string | null;
  document_number: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  photo?: string | null;
  birth_date: string | null;
  birth_place: string | null;
}

const UserDataSchema = z.object({
  first_name: z.string().min(1),
  second_name: z.string().optional().nullable(),
  last_name: z.string().min(1),
  pesel: z.string().length(11).nullable(),
  document_number: z.string().min(1).nullable(),
  issue_date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format for issue_date",
  }).nullable(),
  expiration_date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format for expiration_date",
  }).nullable(),
  photo: z.string().url().nullable().optional(),
  birth_date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format for birth_date",
  }).nullable(),
  birth_place: z.string().min(1).nullable(),
});

const sanitize = (input: string | null | undefined) =>
  sanitizeHtml(input || "", { allowedTags: [], allowedAttributes: {} });

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Brak";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Nieprawidłowa data";
  }
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

  useEffect(() => {
    const fetchUserData = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Increased timeout

      try {
        const response = await fetch(`${apiUrl}/api/users/user-eid`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const rawData = await response.json();
        const data = UserDataSchema.parse(rawData);
        setUserData(data);
      } catch (error: any) {
        console.error("Fetch error:", error);
        setError(
          error.name === "AbortError"
            ? "Przekroczono czas oczekiwania"
            : error.message || "Nieznany błąd"
        );
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <FaSpinner className="text-4xl text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Ładowanie danych dowodu osobistego...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4 text-center">Błąd</h2>
          <p className="text-gray-700">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-amber-600 mb-4">Brak danych</h2>
          <p className="text-gray-700">
            Nie udało się załadować danych dowodu osobistego.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-md w-full">
        {/* Polish ID Card Container */}
        <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-xl overflow-hidden shadow-lg border border-gray-300">
          {/* Header - Polish ID Card */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-3">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold">RZECZPOSPOLITA POLSKA</h1>
                <p className="text-xs">REPUBLIC OF POLAND</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">DOWÓD OSOBISTY</p>
                <p className="text-xs">IDENTITY CARD</p>
              </div>
            </div>
          </div>
          
          {/* Card Content */}
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Photo Section */}
              <div className="w-full md:w-1/3 flex flex-col items-center">
                {userData.photo ? (
                  <Image
                    src={sanitize(userData.photo)}
                    alt="Zdjęcie użytkownika"
                    className="object-cover rounded-md border border-gray-300 shadow-sm"
                    width={150}
                    height={150}
                  />
                ) : (
                  <div className="w-32 h-40 bg-gray-200 rounded-md flex items-center justify-center border border-gray-300">
                    <span className="text-gray-500 text-sm">Brak zdjęcia</span>
                  </div>
                )}
                
                {/* Document Number Under Photo */}
                <div className="mt-2 text-center w-full">
                  <p className="text-xs text-gray-500">NUMER DOWODU / ID NUMBER</p>
                  <p className="text-lg font-mono font-bold tracking-wider">
                    {userData.document_number ? sanitize(userData.document_number) : "XXX000000"}
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="w-full md:w-2/3">
                <div className="space-y-2">
                  {/* Name Section */}
                  <div>
                    <p className="text-xs text-gray-500">NAZWISKO / SURNAME</p>
                    <p className="text-lg font-semibold">
                      {sanitize(userData.last_name).toUpperCase()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">IMIONA / GIVEN NAMES</p>
                    <p className="text-lg font-semibold">
                      {sanitize(userData.first_name).toUpperCase()}{" "}
                      {userData.second_name ? sanitize(userData.second_name).toUpperCase() : ""}
                    </p>
                  </div>

                  {/* PESEL Section */}
                  <div>
                    <p className="text-xs text-gray-500">NUMER PESEL</p>
                    <p className="font-mono font-semibold tracking-wider">
                      {userData.pesel ? sanitize(userData.pesel) : "Brak"}
                    </p>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <p className="text-xs text-gray-500">DATA URODZENIA / DATE OF BIRTH</p>
                      <p className="font-semibold">
                        {formatDate(userData.birth_date)}
                      </p>
                    </div>
                    <div className="w-1/2">
                      <p className="text-xs text-gray-500">MIEJSCE URODZENIA / PLACE OF BIRTH</p>
                      <p className="font-semibold">
                        {userData.birth_place ? sanitize(userData.birth_place) : "Brak"}
                      </p>
                    </div>
                  </div>

                  {/* Issue & Expiration Dates */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <p className="text-xs text-gray-500">DATA WYDANIA / DATE OF ISSUE</p>
                      <p className="font-semibold">
                        {formatDate(userData.issue_date)}
                      </p>
                    </div>
                    <div className="w-1/2">
                      <p className="text-xs text-gray-500">DATA WAŻNOŚCI / DATE OF EXPIRY</p>
                      <p className="font-semibold">
                        {formatDate(userData.expiration_date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MRZ Zone - Machine Readable Zone (Simplified) */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="bg-gray-100 p-2 rounded font-mono text-xs tracking-wider overflow-hidden">
                <p>IDPOL{userData.document_number || "XXX000000"}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
                <p>{userData.last_name?.substring(0, 9).toUpperCase() || "DOE"}
                &lt;&lt;{userData.first_name?.substring(0, 9).toUpperCase() || "JOHN"}&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
              </div>
            </div>
          </div>

          {/* Footer with Coat of Arms */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 h-2"></div>
        </div>

        {/* Additional information or buttons can be placed here */}
        <div className="mt-4 text-center text-xs text-gray-500">
          Dokument elektroniczny · Nie stanowi oficjalnego dokumentu tożsamości
        </div>
      </div>
    </div>
  );
}