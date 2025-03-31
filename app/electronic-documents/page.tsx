"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaIdCard, FaCar, FaPassport, FaUser, FaFileInvoice, FaClipboardList, FaRegCreditCard, FaSpinner } from "react-icons/fa";

const documents = [
  { id: 1, name: "E-Dowód", icon: FaIdCard, enabled: true, link: "/electronic-documents/eid" },
  { id: 2, name: "Prawo jazdy", icon: FaCar, enabled: true, link: "/electronic-documents/driving-license" },
  { id: 3, name: "Paszport", icon: FaPassport, enabled: true, link: "/electronic-documents/passport" },
  { id: 4, name: "Legitymacja studencka", icon: FaUser, enabled: false, link: "/legitymacja" },
  { id: 5, name: "E-Faktury", icon: FaFileInvoice, enabled: true, link: "/e-faktury" },
  { id: 6, name: "Rejestr karalności", icon: FaClipboardList, enabled: false, link: "/rejestr-karalnosci" },
  { id: 7, name: "Karta EKUZ", icon: FaRegCreditCard, enabled: true, link: "/ekuz" }
];

export default function DocumentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (link: string) => {
    setLoading(true);
    setTimeout(() => {
      router.push(link);
    }, 100);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <FaSpinner className="text-4xl text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
        <h1 className="text-2xl font-bold mb-4">Twoje dokumenty</h1>
        <div className="grid grid-cols-2 gap-4">
          {documents.map(({ id, name, icon: Icon, enabled, link }) => (
            <button
              key={id}
              onClick={() => enabled && handleNavigation(link)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition ${
                enabled ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!enabled}
            >
              <Icon className="text-4xl mb-2" />
              <span className="text-sm font-medium">{name}</span>
            </button>
          ))}
        </div>
        </>
      )}
    </div>
  );
}
