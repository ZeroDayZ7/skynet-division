import { useGetUserEIDData } from "@/app/api/users/electronic-documents/useGetUserEIDData";
import EIDCard from "@/components/electronic-documents/EIDCard";

export default async function EIDPage() {
  let userData = null;
  let errorMessage = null;

  try {
    // const csrfToken = await fetchCsrfToken(); // 1. pobierz CSRF token
    // console.log(`TokenCSRF: ${csrfToken}`); // 2. loguj token CSRF
    userData = await useGetUserEIDData(); // Pobierz dane użytkownika
    console.log(`Pobrano dane e-dowodu`);
  } catch (error: any) {
    console.error("Błąd pobierania danych dowodu osobistego:", error.message);
    errorMessage = error.message;  // Przechowaj komunikat błędu
  }

  // Jeśli wystąpił błąd, przekazujemy go do komponentu
  return <EIDCard userData={userData} errorMessage={errorMessage} />;
}
