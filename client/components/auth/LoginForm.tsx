"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

// 🧠 1. Zod Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Nieprawidłowy adres e-mail" }),
  password: z.string().min(6, { message: "Hasło musi mieć min. 6 znaków" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // 🧠 2. useForm z resolverem Zod
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "yovasec567@fincainc.com",
      password: "Zaq1@wsx",
    },
  });

  // 🧠 3. Obsługa logowania
  const onSubmit = async (values: LoginSchema) => {
    if (isLoading) return;
    setError("");
    setIsLoading(true);
  
    try {
      const response = await loginUser(values.email, values.password);
      if (!response.isAuthenticated) {
        throw new Error(response.message || "Błąd logowania");
      }
      login(response.user);
      router.replace("/dashboard");
    } catch (err: unknown) {
      // Zakładamy, że err to Error, bo rzuciliśmy go sami
      const error = err as Error;
      setError(error.message || "Wystąpił problem z logowaniem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="text-red-500 text-sm text-center min-h-[20px]">
            {error}
          </div>
      
        {/* E-mail */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="E-mail"
                  autoComplete="username"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <div className="min-h-[20px]">
              <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Hasło */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Hasło"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    disabled={isLoading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </FormControl>
              <div className="min-h-[20px]">
              <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Przycisk logowania */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Zaloguj"}
        </Button>
      </form>
    </Form>
  );
}
