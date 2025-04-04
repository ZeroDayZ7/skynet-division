"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, MenuIcon, Heart, ShoppingCart, Filter, MapPin, User, Plus, ArrowUpDown } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Listing {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string;
  image: string;
  date: string;
  offerType: 'sprzedam' | 'oddam';
  saved: boolean;
}

const CitizenMarketplace = () => {
  // Stan aplikacji
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('wszystko');
  const [sortBy, setSortBy] = useState<string>('najnowsze');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [onlyFreeItems, setOnlyFreeItems] = useState<boolean>(false);
  const [offerType, setOfferType] = useState<'wszystkie' | 'sprzedam' | 'oddam'>('wszystkie');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  // Przykładowe dane dla kategorii
  const categories: Category[] = [
    { id: 'wszystko', name: 'Wszystko', icon: '🏠' },
    { id: 'meble', name: 'Meble', icon: '🪑' },
    { id: 'elektronika', name: 'Elektronika', icon: '📱' },
    { id: 'ubrania', name: 'Ubrania', icon: '👕' },
    { id: 'ksiazki', name: 'Książki', icon: '📚' },
    { id: 'sport', name: 'Sport', icon: '⚽' },
    { id: 'okazje', name: 'Okazje', icon: '🎁' },
    { id: 'oddam', name: 'Oddam', icon: '♻️' }
  ];

  // Przykładowe dane dla lokalizacji
  const locations: string[] = [
    'Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań',
    'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Katowice'
  ];

  // Przykładowe dane dla ofert
  const sampleListings: Listing[] = [
    {
      id: 1,
      title: 'Krzesło biurowe ergonomiczne',
      category: 'meble',
      price: 250,
      location: 'Warszawa',
      image: '/api/placeholder/200/200',
      date: '2025-03-29',
      offerType: 'sprzedam',
      saved: false
    },
    {
      id: 2,
      title: 'Laptop Dell Inspiron 15',
      category: 'elektronika',
      price: 800,
      location: 'Kraków',
      image: '/api/placeholder/200/200',
      date: '2025-03-30',
      offerType: 'sprzedam',
      saved: true
    },
    {
      id: 3,
      title: 'Kurtka zimowa, rozmiar L',
      category: 'ubrania',
      price: 120,
      location: 'Gdańsk',
      image: '/api/placeholder/200/200',
      date: '2025-03-25',
      offerType: 'sprzedam',
      saved: false
    },
    {
      id: 4,
      title: 'Zbiór książek fantasy',
      category: 'ksiazki',
      price: 0,
      location: 'Wrocław',
      image: '/api/placeholder/200/200',
      date: '2025-03-28',
      offerType: 'oddam',
      saved: false
    },
    {
      id: 5,
      title: 'Rower górski',
      category: 'sport',
      price: 450,
      location: 'Poznań',
      image: '/api/placeholder/200/200',
      date: '2025-03-28',
      offerType: 'sprzedam',
      saved: false
    }
  ];

  // Filtrowanie wyników
  const filteredListings = sampleListings.filter(item => {
    // Filtrowanie po kategorii
    if (currentCategory !== 'wszystko' && item.category !== currentCategory) return false;

    // Filtrowanie po lokalizacji
    if (selectedLocation && item.location !== selectedLocation) return false;

    // Filtrowanie po cenie
    if (item.price > maxPrice) return false;

    // Filtrowanie po typie oferty (darmowe)
    if (onlyFreeItems && item.price > 0) return false;

    // Filtrowanie po typie oferty (sprzedam/oddam)
    if (offerType !== 'wszystkie' && item.offerType !== offerType) return false;

    // Filtrowanie po wyszukiwanej frazie
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    return true;
  });

  // Sortowanie wyników
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'najnowsze') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'najstarsze') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'najdrozsze') {
      return b.price - a.price;
    } else if (sortBy === 'najtansze') {
      return a.price - b.price;
    }
    return 0;
  });

  // Przełączanie zapisanych przedmiotów
  const toggleSavedItem = (id: number) => { // Typ parametru id to number
    const updatedSavedItems = savedItems.includes(String(id)) // Konwertuj id na string do porównania
      ? savedItems.filter(item => item !== String(id)) // Konwertuj item na string do porównania
      : [...savedItems, String(id)]; // Konwertuj id na string przed dodaniem
    setSavedItems(updatedSavedItems);
  };

  // Renderowanie paska wyszukiwania
  const renderSearchBar = () => (
    <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
      <div className="relative">
        <input
          type="text"
          placeholder="Czego szukasz?"
          className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>
    </div>
  );

  // Renderowanie paska kategorii
  const renderCategoryBar = () => (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="flex overflow-x-auto pb-2 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            className={`flex flex-col items-center min-w-16 p-2 rounded-lg ${currentCategory === category.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-50'}`}
            onClick={() => setCurrentCategory(category.id)}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="text-xs mt-1">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Renderowanie paska filtrów
  const renderFilterBar = () => (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="flex justify-between">
        <button
          className="flex items-center px-3 py-2 border border-gray-300 rounded-lg"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} className="mr-2" />
          <span>Filtry</span>
        </button>

        <div className="flex">
          <button
            className="flex items-center px-3 py-2 border border-gray-300 rounded-l-lg"
            onClick={() => setSortBy(sortBy === 'najnowsze' ? 'najstarsze' : 'najnowsze')}
          >
            <ArrowUpDown size={16} className="mr-2" />
            <span>{sortBy === 'najnowsze' ? 'Najnowsze' : 'Najstarsze'}</span>
          </button>

          <button
            className="flex items-center px-3 py-2 border-t border-b border-r border-gray-300 rounded-r-lg"
            onClick={() => setSortBy(sortBy === 'najtansze' ? 'najdrozsze' : 'najtansze')}
          >
            <span>{sortBy === 'najtansze' ? 'Najtańsze' : 'Najdroższe'}</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Lokalizacja</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Wszystkie lokalizacje</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <h3 className="font-semibold mb-3">Cena</h3>
          <div className="flex items-center justify-between mb-2">
            <span>do {maxPrice} zł</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full"
          />

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="onlyFree"
              checked={onlyFreeItems}
              onChange={() => setOnlyFreeItems(!onlyFreeItems)}
              className="mr-2"
            />
            <label htmlFor="onlyFree">Tylko darmowe</label>
          </div>

          <h3 className="font-semibold mt-4 mb-3">Typ oferty</h3>
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 border rounded-lg ${offerType === 'wszystkie' ? 'bg-blue-100 text-blue-600 border-blue-300' : 'border-gray-300'}`}
              onClick={() => setOfferType('wszystkie')}
            >
              Wszystkie
            </button>
            <button
              className={`px-3 py-2 border rounded-lg ${offerType === 'sprzedam' ? 'bg-blue-100 text-blue-600 border-blue-300' : 'border-gray-300'}`}
              onClick={() => setOfferType('sprzedam')}
            >
              Sprzedam
            </button>
            <button
              className={`px-3 py-2 border rounded-lg ${offerType === 'oddam' ? 'bg-blue-100 text-blue-600 border-blue-300' : 'border-gray-300'}`}
              onClick={() => setOfferType('oddam')}
            >
              Oddam
            </button>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg"
              onClick={() => {
                setSelectedLocation('');
                setMaxPrice(1000);
                setOnlyFreeItems(false);
                setOfferType('wszystkie');
              }}
            >
              Wyczyść filtry
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-lg"
              onClick={() => setShowFilters(false)}
            >
              Zastosuj
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Renderowanie wyników wyszukiwania
  const renderListings = () => (
    <div className="bg-gray-100 p-4">
      <div className="text-sm text-gray-500 mb-2">Znaleziono {sortedListings.length} ogłoszeń</div>

      <div className="space-y-4">
        {sortedListings.length > 0 ? (
          sortedListings.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow">
              <div className="relative">
                <Image src={item.image} alt={item.title} className="w-full h-48 object-cover" width={200} height={200} />
                <button
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
                  onClick={() => toggleSavedItem(item.id)}
                >
                  <Heart size={20} fill={savedItems.includes(String(item.id)) ? "red" : "none"} color={savedItems.includes(String(item.id)) ? "red" : "black"} />
                </button>
                {item.offerType === 'oddam' && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs">Za darmo</span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-xl font-bold mb-2">{item.price > 0 ? `${item.price} zł` : 'Za darmo'}</p>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin size={14} className="mr-1" />
                  <span>{item.location}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString('pl-PL')}
                  </span>
                  <button className="text-blue-500 text-sm font-medium">
                    Zobacz więcej
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-gray-500">Nie znaleziono ogłoszeń spełniających kryteria.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => {
                setSearchQuery('');
                setCurrentCategory('wszystko');
                setSelectedLocation('');
                setMaxPrice(1000);
                setOnlyFreeItems(false);
                setOfferType('wszystkie');
              }}
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Renderowanie przycisku dodawania nowego ogłoszenia
  const renderAddButton = () => (
    <div className="fixed bottom-20 right-4">
      <button className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
        <Plus size={24} />
      </button>
    </div>
  );

  // Renderowanie dolnego paska nawigacji
  const renderNavigationBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around p-3">
        <button className="flex flex-col items-center">
          <MenuIcon size={20} className="text-blue-500" />
          <span className="text-xs mt-1">Przeglądaj</span>
        </button>
        <button className="flex flex-col items-center">
          <Search size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Szukaj</span>
        </button>
        <button className="flex flex-col items-center">
          <Heart size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Zapisane</span>
        </button>
        <button className="flex flex-col items-center">
          <ShoppingCart size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Zamówienia</span>
        </button>
        <button className="flex flex-col items-center">
          <User size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Profil</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {renderSearchBar()}
      {renderCategoryBar()}
      {renderFilterBar()}
      {renderListings()}
      {renderAddButton()}
      {renderNavigationBar()}
    </div>
  );
};

export default CitizenMarketplace;