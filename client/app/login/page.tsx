"use client";

import { useState, startTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/auth-context";
import { validateEmail, validatePassword } from "@/utils/formValidation";
import { serverLogin } from '@/lib/auth.server'

export default function LoginModal() {
  const { login } = useAuth(); // Używamy login z kontekstu
  const [email, setEmail] = useState("yovasec567@fincainc.com");
  const [password, setPassword] = useState("Zaq1@wsx");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    if (emailErr || passwordErr) {
      valid = false;
    }
    return valid;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Zapobiegamy przeładowaniu strony
    if (!validateForm()) return;
  
    setError("");
    setIsLoading(true);
  
    startTransition(async () => {
      const result = await serverLogin(email, password);
      if (result.success && result.user) {
        document.cookie = `ACCESS_KEY=${result.token}; path=/; max-age=${
          parseInt(process.env.NEXT_PUBLIC_JWT_EXPIRES_IN_MS || "900000", 10) /
          1000
        }; ${
          process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "secure" : ""
        }`;
        console.log(result.user);
        login(result.user);
        setTimeout(() => {
          router.replace("/dashboard");
        }, 100);
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    });
  };
  

  return (
    <div className="flex flex-col items-center">
      <div className="p-6 w-full max-w-screen-sm">
        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo/logo.jpg"
            alt="Logo aplikacji"
            className="rounded-full"
            width={200}
            height={112}
            priority
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
              autoComplete="username"
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
              autoComplete="current-password"
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
              className={`w-full h-12 flex items-center justify-center rounded-md text-white transition duration-300 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
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
