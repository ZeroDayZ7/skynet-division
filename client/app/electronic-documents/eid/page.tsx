import { useGetUserEIDData } from "@/app/api/users/electronic-documents/useGetUserEIDData";
import EIDCard from "@/components/electronic-documents/EIDCard";

export default async function EIDPage() {
  let userData = null;
  // let errorMessage = null;
  try {
    userData = await useGetUserEIDData(); // Pobierz dane użytkownika
    console.log(`Pobrano dane e-dowodu`);
  } catch (error) {
    console.error("Błąd pobierania danych dowodu osobistego:", error);
    // errorMessage = error.message;  // Przechowaj komunikat błędu
  }

  return <EIDCard userData={userData} />;
}

