"use client";

import { useState } from "react";
import { logoutUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function LogoutDialog() {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      logout();
      router.replace("/");
    } catch (error) {
      console.error("Błąd przy wylogowywaniu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:text-red-500">
          <FaSignOutAlt />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Wylogować się?</AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz się wylogować?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="bg-red-300">
            {loading ? "Wylogowywanie..." : "Wyloguj"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
