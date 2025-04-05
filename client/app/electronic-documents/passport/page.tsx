import Image from "next/image";
import { cookies } from "next/headers";
import BackButton from "@/components/ui/BackButton";

// Interfejs danych użytkownika
interface UserData {
  passport_number: string;
  issue_date: string;
  expiration_date: string;
  country_code: string;
  passport_type: string;
  user: {
    first_name: string;
    second_name: string;
    last_name: string;
    pesel: string;
    birth_date: string;
    birth_place: string;
  };
  photo?: string;
}


export default async function ProfilePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;
  const cookieStore = await cookies();

  // Pobieranie wszystkich ciasteczek
  const cookiesHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join("; ");

  let userData: UserData | null = null;

  try {
    const res = await fetch(`${apiUrl}/api/users/user-passport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookiesHeader, // Wysyłanie wszystkich ciasteczek
      },
      cache: "no-store", // zawsze pobierz nowe dane
    });

    if (res.ok) {
      userData = await res.json();
      console.log(userData);
    } else {
      console.error("Błąd pobierania danych paszportu", await res.text());
    }
  } catch (err) {
    console.error("Błąd połączenia z API", err);
  }

  if (!userData) {
    return (
      <div className="p-4 text-center text-red-500">
        Nie udało się załadować danych użytkownika.
      </div>
    );
  }

  return (
    <div className="profile-page p-4">
      <h1 className="text-2xl font-bold mb-4">Profil Użytkownika</h1>

      <div className="flex items-center mb-4">
        {userData.photo ? (
          <Image
            src={userData.photo}
            alt="User Photo"
            className="w-24 h-24 rounded-full border shadow-lg"
            width={96}
            height={96}
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            Brak zdjęcia
          </div>
        )}
        <div className="ml-4">
          <h2 className="text-xl font-semibold">
            {userData.user.first_name} {userData.user.second_name} {userData.user.last_name}
          </h2>
          <p className="text-gray-500">PESEL: {userData.user.pesel}</p>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-lg font-semibold">Dane osobowe</h3>
        <ul className="list-none p-0">
          <li><strong>Imię:</strong> {userData.user.first_name}</li>
          <li><strong>Drugie imię:</strong> {userData.user.second_name}</li>
          <li><strong>Nazwisko:</strong> {userData.user.last_name}</li>
          <li><strong>PESEL:</strong> {userData.user.pesel}</li>
          <li><strong>Data urodzenia:</strong> {new Date(userData.user.birth_date).toLocaleDateString()}</li>
          <li><strong>Miejsce urodzenia:</strong> {userData.user.birth_place}</li>
        </ul>
      </div>

      <div className="my-4">
        <h3 className="text-lg font-semibold">Paszport</h3>
        <ul className="list-none p-0">
          <li><strong>Numer paszportu:</strong> {userData.passport_number}</li>
          <li><strong>Data wydania:</strong> {new Date(userData.issue_date).toLocaleDateString()}</li>
          <li><strong>Data ważności:</strong> {new Date(userData.expiration_date).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
}
