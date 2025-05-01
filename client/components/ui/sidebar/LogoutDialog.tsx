// LogoutDialog.tsx
import { useState } from "react";
import { logoutUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
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
import { LogOut } from "lucide-react";

export default function LogoutDialog() {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      logout();
      router.replace("/"); // redirect after logout
    } catch (error) {
      console.error("Błąd przy wylogowywaniu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      {/* Użycie AlertDialogTrigger do wywołania dialogu */}
      <AlertDialogTrigger>
        <div className="flex items-center cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </div>
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
          <AlertDialogAction onClick={handleLogout} className="bg-red-500 text-white">
            {loading ? "Wylogowywanie..." : "Wyloguj"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
