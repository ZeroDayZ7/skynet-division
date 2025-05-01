'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaPlusCircle,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaBriefcase,
  FaBuilding,
  FaUserTie,
  FaChartLine,
  FaBell
} from 'react-icons/fa';

export default function JobBoard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState({
    activeJobs: 0,
    employers: 0,
    candidates: 0,
    hireRate: 0
  });

  useEffect(() => {
    // Mock load
    setTimeout(() => {
      setStats({
        activeJobs: 2341,
        employers: 785,
        candidates: 1943,
        hireRate: 74
      });
      setStatsLoading(false);
    }, 800);
  }, []);

  const QUICK_ACTIONS = [
    {
      id: 1,
      name: 'Dodaj Ogłoszenie',
      icon: FaPlusCircle,
      enabled: true,
      link: '/jobs/new',
      description: 'Dodaj nową ofertę pracy do naszej bazy',
      color: 'bg-emerald-700 text-emerald-300'
    },
    {
      id: 2,
      name: 'Szukaj Pracy',
      icon: FaSearch,
      enabled: true,
      link: '/jobs/search',
      description: 'Znajdź idealną pracę wśród tysięcy ofert',
      color: 'bg-blue-700 text-blue-300'
    },
    {
      id: 3,
      name: 'Zaawansowane Filtry',
      icon: FaFilter,
      enabled: true,
      link: '/jobs/filters',
      description: 'Dokładne filtrowanie ofert pracy',
      color: 'bg-purple-700 text-purple-300'
    }
  ];

  const JOB_CATEGORIES = [
    { id: 'it', name: 'IT & Programowanie', count: 1243, icon: <FaBriefcase /> },
    { id: 'finance', name: 'Finanse & Księgowość', count: 892, icon: <FaBuilding /> },
    { id: 'marketing', name: 'Marketing', count: 765, icon: <FaChartLine /> },
    { id: 'hr', name: 'HR & Rekrutacja', count: 543, icon: <FaUserTie /> }
  ];

  const handleNavigation = (link: string) => {
    setIsLoading(true);
    router.push(link);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="text-6xl text-blue-500 animate-spin" />
          <p className="text-lg text-gray-600">Ładowanie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Hero */}
      {/* <section className="py-4 px-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold mb-4">Znajdź Wymarzoną Pracę</h1>
          <p className="text-xl mb-8">Przeglądaj tysiące ofert pracy od najlepszych pracodawców</p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Stanowisko, słowa kluczowe, firma..."
                className="flex-1 py-4 px-4 text-lg rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-grey-500 text-blue-600 px-6 rounded-lg text-lg font-medium hover:bg-blue-100 transition"
              >
                <FaSearch className="inline mr-2" />
                Szukaj
              </button>
            </div>
          </form>
        </div>
      </section> */}

      <section className="max-w-8xl py-10 px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {statsLoading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>
              ))
            : (
              <>
                <StatCard title="Aktywne oferty" value={stats.activeJobs} icon={<FaBriefcase />} change="+12%" />
                <StatCard title="Pracodawcy" value={stats.employers} icon={<FaBuilding />} change="+5%" />
                <StatCard title="Kandydaci" value={stats.candidates} icon={<FaUserTie />} change="+8%" />
                <StatCard title="Wskaźnik zatrudnienia" value={`${stats.hireRate}%`} icon={<FaChartLine />} change="+2%" />
              </>
            )
          }
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-semibold mb-4">Szybkie Akcje</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {QUICK_ACTIONS.map(({ id, name, icon: Icon, enabled, link, description, color }) => (
            <div key={id} className="bg-card border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
              <div className={`p-4 ${color} flex items-center justify-between`}>
                <Icon className="text-2xl" />
                <span className="text-sm font-medium">Dostępne</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{name}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => enabled && handleNavigation(link)}
                  disabled={!enabled}
                  className={`w-full py-2 rounded-md font-medium ${
                    enabled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  {enabled ? 'Rozpocznij' : 'Wkrótce'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h2 className="text-2xl font-semibold mb-4">Popularne Kategorie</h2>
        <div className="flex flex-wrap gap-4 mb-10">
          {JOB_CATEGORIES.map(({ id, name, count, icon }) => (
            <button
              key={id}
              className={`flex items-center gap-3 px-4 py-2 rounded-full border ${
                selectedCategory === id ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(selectedCategory === id ? null : id)}
            >
              <span>{icon}</span>
              <span className="font-medium">{name}</span>
              <span className="text-sm text-gray-500">({count})</span>
            </button>
          ))}
        </div>

        {/* Job Listings - placeholder */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Najnowsze Oferty Pracy</h2>
            <button className="flex items-center gap-2 text-blue-600 hover:underline">
              <FaBell />
              Powiadomienia
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg hover:shadow">
                <h3 className="text-lg font-semibold mb-1">Stanowisko #{i + 1}</h3>
                <p className="text-sm text-gray-500 mb-2">Firma przykładowa · Warszawa</p>
                <p className="text-sm text-gray-600">Opis stanowiska... Lorem ipsum dolor sit amet consectetur.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const StatCard = ({ title, value, icon, change }: { title: string; value: number | string; icon: React.ReactNode; change: string }) => (
  <div className="bg-card border rounded-lg shadow p-4 flex flex-col justify-between h-full">
    <div className="flex justify-between items-center mb-2">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-2xl text-blue-600">{icon}</div>
    </div>
    <p className="text-sm text-green-600">{change} w tym miesiącu</p>
  </div>
);
