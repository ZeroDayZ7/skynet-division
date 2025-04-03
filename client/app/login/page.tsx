"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginModal() {
  const [email, setEmail] = useState("yovasec567@fincainc.com");
  const [password, setPassword] = useState("Zaq1@wsx");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Niepoprawny adres e-mail");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Hasło musi mieć co najmniej 6 znaków");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !validateForm()) return;

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message || "Błąd logowania");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Wystąpił problem z logowaniem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="p-6 w-full max-w-screen-sm">
        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.jpg"
            alt="Logo aplikacji"
            className="w-max h-24 rounded-full mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Aplikacja Obywatelska
          </h1>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* E-MAIL */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* HASŁO */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Hasło
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {/* Ikona „Pokaż hasło” */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform text-gray-500 text-2xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* PRZYCISK LOGOWANIA */}
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
    </div>
  );
}
