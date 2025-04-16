"use client";

import React from "react";
import { FaIdCard, FaCar, FaPassport, FaUser, FaFileInvoice, FaClipboardList, FaRegCreditCard } from "react-icons/fa";
import MenuGrid from '@/components/ui/MenuGrid';

// Symulacja pobierania dokumentów z bazy danych
const documents = [
  { id: 1, name: "E-Dowód",              icon: FaIdCard,         enabled: true,  link: "/electronic-documents/eid" },
  { id: 2, name: "Prawo jazdy",          icon: FaCar,            enabled: false,  link: "/electronic-documents/driving-license" },
  { id: 3, name: "Paszport",             icon: FaPassport,       enabled: true,  link: "/electronic-documents/passport" },
  { id: 4, name: "Legitymacja studencka",icon: FaUser,           enabled: false, link: "/legitymacja" },
  { id: 5, name: "E-Faktury",            icon: FaFileInvoice,    enabled: false,  link: "/e-faktury" },
  { id: 6, name: "Rejestr karalności",   icon: FaClipboardList,  enabled: false, link: "/rejestr-karalnosci" },
  { id: 7, name: "Karta EKUZ",           icon: FaRegCreditCard,  enabled: false,  link: "/ekuz" },
];

// Mapowanie na format MenuItem
const documentItems = documents.map((doc) => ({
  id: doc.id,
  icon: doc.icon,
  link: doc.link,
  label: doc.name, // Zamieniamy `name` na `label`
  enabled: doc.enabled,
  hidden: false, // Domyślnie widoczne, można zmienić dla konkretnych
}));

export default function Documents() {
  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold my-4 dark:text-green-500">Twoje dokumenty</h1>
      <MenuGrid items={documentItems} />
    </div>
  );
}
