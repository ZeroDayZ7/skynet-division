"use client";

import { useState } from "react";
import { FaSave, FaSpinner } from "react-icons/fa";
import categoriesData from "@/resources/categories.json";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

const JobPostingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Junior Frontend Developer",
    company: "TechCorp",
    location: "Warszawa",
    category: "IT",
    postalCode: "00-001",
    salaryMin: "5000",
    salaryMax: "8000",
    description: "Development of user interfaces for web applications.",
    requirements: "Knowledge of HTML, CSS, JavaScript, and React.",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/add-job`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(`${data.message}`, {
          description: "Zaloguj się ponownie",
          duration: 5000,
          position: "top-center", // Toast pojawi się w prawym górnym rogu
          richColors: true,
          icon: "❌", // Można dodać ikonę
        });

        throw new Error("Błąd podczas zapisywania oferty pracy");
      }

      // setFormData({
      //   title: "",
      //   company: "",
      //   location: "",
      //   category: "",
      //   postalCode: "",
      //   salaryMin: "",
      //   salaryMax: "",
      //   description: "",
      //   requirements: "",
      // });

      toast.success(`${data.message}`, {
        duration: 5000,
        position: "top-center", // Toast pojawi się w prawym górnym rogu
        richColors: true,
        icon: "✔", // Można dodać ikonę
      });

      // Przewijanie strony do góry po wyświetleniu toast
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Dodatkowy efekt płynnego przewijania
      });
    } catch (error) {
      console.error("Błąd podczas dodawania oferty:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="job-posting-page min-h-screen p-4 max-w-md mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="text-4xl text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Dodaj nową ofertę pracy</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tytuł oferty*
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="np. Programista Front-end"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nazwa firmy*
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="np. TechCorp Sp. z o.o."
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Miejscowość*
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="np. Warszawa"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kod pocztowy*
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    placeholder="00-000"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kategoria*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="salaryMin"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Wynagrodzenie od (PLN)
                  </label>
                  <input
                    id="salaryMin"
                    name="salaryMin"
                    type="number"
                    placeholder="Min"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    name="salaryMax"
                    type="number"
                    placeholder="Max"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Opis stanowiska*
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Opisz szczegóły oferty..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="requirements"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Wymagania*
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Wymagane kwalifikacje..."
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              disabled={isLoading}
            >
              <FaSave className="text-xl mr-2" />
              {isLoading ? "Zapisywanie..." : "Opublikuj ofertę"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default JobPostingPage;
