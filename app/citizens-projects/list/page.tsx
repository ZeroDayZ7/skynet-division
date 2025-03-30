"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaMapMarkerAlt, FaSpinner, FaThumbsUp } from "react-icons/fa";
import BackButton from "@/components/ui/BackButton";

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  budget: number;
  upvotes: number;
}

export default function ViewProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/citizen-projects-list`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page }),
        });

        if (!response.ok) {
          throw new Error("Błąd pobierania projektów");
        }

        const data = await response.json();
        console.log(data);
        setProjects(data.projects);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Błąd podczas pobierania projektów:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [page]);

  const filteredProjects = projects.filter(project =>
    (searchTerm ? project.title.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
    (filterCategory ? project.category === filterCategory : true)
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <BackButton />
      <h2 className="text-xl font-semibold mb-4">Lista Projektów Obywatelskich</h2>

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

      {isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="text-6xl text-gray-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => router.push(`/citizens-projects/${project.id}`)}>
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-gray-600">Kategoria: {project.category}</p>
                <p className="text-gray-500 flex items-center gap-1"><FaMapMarkerAlt /> {project.location}</p>
                <p className="text-gray-700 font-semibold">Budżet: {project.budget.toLocaleString()} PLN</p>
                <div className="flex items-center gap-2 mt-2">
                  <FaThumbsUp className="text-blue-500" />
                  <span>{project.upvotes} głosów</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Brak wyników.</p>
          )}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Poprzednia
        </button>
        <span>Strona {page} z {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Następna
        </button>
      </div>
    </div>
  );
}