"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

export default function NewProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    budget: "",
    image: null as File | null, // Dodajemy typ dla image
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Ekologia", "Infrastruktura", "Edukacja", "Zdrowie", "Kultura", "Sport", "Inne"];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.category || !formData.location.trim() || !formData.budget.trim()) {
      setError("Wszystkie pola są wymagane.");
      return false;
    }
    if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      setError("Budżet musi być liczbą większą niż 0.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
      setIsSubmitting(false);
      toast("Event has been created.");
      // router.push("/citizens-projects/list");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Zgłoś Projekt Obywatelski
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nazwa Projektu</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Nazwa projektu" 
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            required 
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Opis Projektu</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Opis projektu" 
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategoria</label>
          <select 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            required
          >
            <option value="">Wybierz kategorię</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lokalizacja</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="Lokalizacja" 
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            required 
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budżet (PLN)</label>
          <input 
            type="number" 
            id="budget" 
            name="budget" 
            value={formData.budget} 
            onChange={handleChange} 
            placeholder="Budżet (PLN)" 
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            required 
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Zdjęcie (opcjonalnie)</label>
          <input 
            type="file" 
            id="image" 
            onChange={handleFileChange} 
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full p-3 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isSubmitting ? "Wysyłanie..." : "Dodaj Projekt"}
          </button>
        </div>
      </form>
    </div>
  );
}