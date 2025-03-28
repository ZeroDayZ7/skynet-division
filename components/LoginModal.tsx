"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function LoginModal() {
  const [email, setEmail] = useState("yovasec567@fincainc.com");
  const [password, setPassword] = useState("Zaq1@wsx");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nowy stan do blokowania wielokrotnego kliknięcia
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Zapobieganie wielokrotnemu wysyłaniu

    setError("");
    setIsLoading(true); // Blokowanie wielokrotnego kliknięcia

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
      } finally {
        setIsLoading(false); // Po zakończeniu odblokuj przycisk
      }
    }, 1000); // Opóźnienie 1000 ms (1 sekunda)
  };

  return (
    <div className="p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">Zaloguj się</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 h-12 rounded flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Zaloguj"}
        </button>
      </form>
    </div>
  );
}
