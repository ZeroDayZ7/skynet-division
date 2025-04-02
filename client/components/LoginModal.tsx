"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function LoginModal() {
  const [email, setEmail] = useState("yovasec567@fincainc.com");
  const [password, setPassword] = useState("Zaq1@wsx");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const res = await fetch(`${apiUrl}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.code || "Błąd logowania");
        }

        router.push("/dashboard");
      } catch (err: any) {
        setError(err.message || "Wystąpił problem z logowaniem");
      }
    }, 100);
  };

  // Funkcja do generowania losowego URL obrazu z Unsplash
  const getRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://source.unsplash.com/random/100x100/?city,nature,abstract&sig=1`;
  };

  return (
    <div className="p-6 max-w-screen-sm">
      <div className="mb-6">
        <img
          src={getRandomImageUrl()}
          alt="Logo aplikacji"
          className="w-20 h-20 rounded-full mb-2"
        />
        <h1 className="text-2xl font-bold text-gray-800">Aplikacja Obywatelska</h1>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Hasło</label>
          <input
            type="password"
            id="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 h-12 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Zaloguj"}
          </button>
        </div>
      </form>
    </div>
  );
}