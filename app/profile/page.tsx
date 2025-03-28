"use client";

import React, { useState } from "react";
import BackButton from "@/components/ui/BackButton";

// Przykładowe dane użytkownika
const userData = {
  firstName: "Jan",
  secondName: "Krzysztof",
  lastName: "Nowak",
  pesel: "12345678901",
  address: "ul. Przykładowa 123, 00-123 Warszawa",
  photo: "https://randomuser.me/api/portraits/men/75.jpg", // Przykładowe zdjęcie
};

export default function ProfilePage() {

  const [isAddressVisible, setIsAddressVisible] = useState(false); // Kontrola widoczności adresu

  const toggleAddressVisibility = () => {
    setIsAddressVisible((prev) => !prev);
  };

  return (
    <div className="profile-page p-6 rounded-lg shadow-lg">
       <BackButton />
      <h1 className="text-2xl font-bold mb-4">Profil Użytkownika</h1>
      
      <div className="flex items-center mb-4">
        <img src={userData.photo} alt="User Photo" className="w-24 h-24 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{userData.firstName} {userData.secondName} {userData.lastName}</h2>
          <p className="text-gray-500">PESEL: {userData.pesel}</p>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-lg font-semibold">Dane osobowe</h3>
        <ul className="list-none p-0">
          <li><strong>Imię:</strong> {userData.firstName}</li>
          <li><strong>Drugie imię:</strong> {userData.secondName}</li>
          <li><strong>Nazwisko:</strong> {userData.lastName}</li>
          <li><strong>PESEL:</strong> {userData.pesel}</li>
        </ul>
      </div>

      <div className="my-4">
        <h3 className="text-lg font-semibold">Adres</h3>
        <p className="cursor-pointer text-blue-600" onClick={toggleAddressVisibility}>
          {isAddressVisible ? userData.address : "Kliknij, aby wyświetlić adres"}
        </p>
      </div>
    </div>
  );
}
