"use client";

import React, { useState, useEffect } from "react";
import BackButton from "@/components/ui/BackButton";
import { FaSpinner } from "react-icons/fa";

// Interfejs określający typ danych użytkownika
interface UserData {
  user_id: number;
  first_name: string;
  second_name: string;
  last_name: string;
  pesel: string;
  passport_number: string;
  issue_date: string;
  expiration_date: string;
  photo?: string; // Pole opcjonalne
  birth_date: string;
  birth_place: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/user-passport`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Błąd pobierania danych");
        }

        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!userData) {
    return <p className="text-center text-red-500">Nie udało się załadować danych użytkownika.</p>;
  }

  return (
    <div className="profile-page p-4">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Profil Użytkownika</h1>
      
      <div className="flex items-center mb-4">
        {userData.photo ? (
          <img src={userData.photo} alt="User Photo" className="w-24 h-24 rounded-full border shadow-lg" />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            Brak zdjęcia
          </div>
        )}
        <div className="ml-4">
          <h2 className="text-xl font-semibold">
            {userData.first_name} {userData.second_name} {userData.last_name}
          </h2>
          <p className="text-gray-500">PESEL: {userData.pesel}</p>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-lg font-semibold">Dane osobowe</h3>
        <ul className="list-none p-0">
          <li><strong>Imię:</strong> {userData.first_name}</li>
          <li><strong>Drugie imię:</strong> {userData.second_name}</li>
          <li><strong>Nazwisko:</strong> {userData.last_name}</li>
          <li><strong>PESEL:</strong> {userData.pesel}</li>
          <li><strong>Data urodzenia:</strong> {new Date(userData.birth_date).toLocaleDateString()}</li>
          <li><strong>Miejsce urodzenia:</strong> {userData.birth_place}</li>
        </ul>
      </div>

      <div className="my-4">
        <h3 className="text-lg font-semibold">Paszport</h3>
        <ul className="list-none p-0">
          <li><strong>Numer paszportu:</strong> {userData.passport_number}</li>
          <li><strong>Data wydania:</strong> {new Date(userData.issue_date).toLocaleDateString()}</li>
          <li><strong>Data ważności:</strong> {new Date(userData.expiration_date).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
}
