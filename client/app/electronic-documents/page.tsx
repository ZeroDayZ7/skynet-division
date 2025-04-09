"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaIdCard, FaCar, FaPassport, FaUser, FaFileInvoice, FaClipboardList, FaRegCreditCard, FaSpinner } from "react-icons/fa";

// Symulacja pobierania dokumentów z bazy danych
const fetchDocumentsFromDatabase = async () => {
  return new Promise<{ id: number, name: string, icon: React.ElementType, enabled: boolean, link: string }[]>(resolve => {
      const documents = [
        { id: 1, name: "E-Dowód", icon: FaIdCard, enabled: true, link: "/electronic-documents/eid" },
        { id: 2, name: "Prawo jazdy", icon: FaCar, enabled: true, link: "/electronic-documents/driving-license" },
        { id: 3, name: "Paszport", icon: FaPassport, enabled: true, link: "/electronic-documents/passport" },
        { id: 4, name: "Legitymacja studencka", icon: FaUser, enabled: false, link: "/legitymacja" },
        { id: 5, name: "E-Faktury", icon: FaFileInvoice, enabled: true, link: "/e-faktury" },
        { id: 6, name: "Rejestr karalności", icon: FaClipboardList, enabled: false, link: "/rejestr-karalnosci" },
        { id: 7, name: "Karta EKUZ", icon: FaRegCreditCard, enabled: true, link: "/ekuz" }
      ];
      resolve(documents);
  });
};

export default function DocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobieranie dokumentów po załadowaniu komponentu
    const loadDocuments = async () => {
      try {
        const fetchedDocuments = await fetchDocumentsFromDatabase();
        setDocuments(fetchedDocuments);
      } catch (error) {
        console.error("Błąd podczas pobierania dokumentów:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleNavigation = (link: string) => {
    setLoading(true);
    router.push(link);
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
            {documents
              .filter(doc => doc.enabled) // Tylko dokumenty, które są włączone
              .map(({ id, name, icon: Icon, link }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(link)}
                  className="flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition bg-blue-500 text-white"
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
