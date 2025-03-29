"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaMapMarkerAlt, FaSpinner, FaThumbsUp } from "react-icons/fa";
import BackButton from "@/components/ui/BackButton";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Symulacja pobierania danych
    setTimeout(() => {
      const mockProjects = [
        { id: 1, name: "Nowy park miejski", category: "Ekologia", location: "Warszawa", budget: 500000, votes: 120 },
        { id: 2, name: "Remont drogi osiedlowej", category: "Infrastruktura", location: "Kraków", budget: 200000, votes: 80 },
        { id: 3, name: "Darmowe zajęcia fitness", category: "Zdrowie", location: "Gdańsk", budget: 100000, votes: 150 },
      ];
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let filtered = projects;
    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCategory) {
      filtered = filtered.filter((project) => project.category === filterCategory);
    }
    setFilteredProjects(filtered);
  }, [searchTerm, filterCategory, projects]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
       <BackButton />
      <h2 className="text-xl font-semibold mb-4">Lista Projektów Obywatelskich</h2>

      {/* Wyszukiwarka i filtry */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center border p-2 rounded w-full">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Szukaj"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <select
          className="border p-2 rounded"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Filtruj według kategorii</option>
          <option value="Ekologia">Ekologia</option>
          <option value="Infrastruktura">Infrastruktura</option>
          <option value="Zdrowie">Zdrowie</option>
        </select>
      </div>

      {/* Lista projektów */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="text-6xl text-gray-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => router.push(`/citizens-projects/${project.id}`)}>
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-gray-600">Kategoria: {project.category}</p>
                <p className="text-gray-500 flex items-center gap-1"><FaMapMarkerAlt /> {project.location}</p>
                <p className="text-gray-700 font-semibold">Budżet: {project.budget.toLocaleString()} PLN</p>
                <div className="flex items-center gap-2 mt-2">
                  <FaThumbsUp className="text-blue-500" />
                  <span>{project.votes} głosów</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Brak wyników.</p>
          )}
        </div>
      )}
    </div>
  );
}
