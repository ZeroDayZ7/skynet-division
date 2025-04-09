"use client";

import { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import categoriesData from "@/resources/categories.json";

const JobSearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [radius, setRadius] = useState("5");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
      router.push(
        `/job-board/results?search=${encodeURIComponent(
          searchQuery
        )}&location=${encodeURIComponent(
          location
        )}&category=${encodeURIComponent(
          category
        )}&postalCode=${encodeURIComponent(
          postalCode
        )}&radius=${radius}&salaryMin=${salaryMin}&salaryMax=${salaryMax}`
      );
  };

  return (
    <div className="job-search-page min-h-screen p-4 max-w-md mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="text-4xl text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Szukaj Pracy</h1>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="searchQuery"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stanowisko
                </label>
                <input
                  id="searchQuery"
                  type="text"
                  placeholder="np. Programista Front-end"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lokalizacja
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="np. Warszawa"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kategoria
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500"
                >
                  <option value="">Wybierz kategorię</option>
                  {categoriesData.categories.map(
                    (
                      cat // Zmiana tutaj
                    ) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kod pocztowy
                </label>
                <input
                  id="postalCode"
                  type="text"
                  placeholder="00-000"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="radius"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Promień wyszukiwania
                </label>
                <select
                  id="radius"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500"
                >
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="20">20 km</option>
                  <option value="50">50 km</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="salaryMin"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Wynagrodzenie od (PLN)
                  </label>
                  <input
                    id="salaryMin"
                    type="number"
                    placeholder="Min"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="salaryMax"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Wynagrodzenie do (PLN)
                  </label>
                  <input
                    id="salaryMax"
                    type="number"
                    placeholder="Max"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              disabled={isLoading}
            >
              <FaSearch className="text-xl mr-2" />
              {isLoading ? "Wyszukiwanie..." : "Szukaj ofert"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default JobSearchPage;
