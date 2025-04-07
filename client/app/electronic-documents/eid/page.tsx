import Image from "next/image";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { cookies } from "next/headers";
import { format } from "date-fns";

// User data interface (tailored for Polish ID card)
interface UserData {
  user: {
    first_name: string;
    second_name: string;
    last_name: string;
    pesel: string;
    birth_date: string;
    birth_place: string;
  };
  document_number: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  photo?: string | null;
}

export default async function ProfilePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;
  const cookieStore = await cookies();
  const cookiesHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  let userData: UserData | null = null;

  try {
    const res = await fetch(`${apiUrl}/api/users/user-eid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookiesHeader,
      },
      cache: "no-store",
    });

    if (res.ok) {
      userData = await res.json();
      console.log(userData);
    } else {
      console.error("Błąd pobierania danych dowodu osobistego", await res.text());
    }
  } catch (err) {
    console.error("Błąd połączenia z API", err);
  }

  if (!userData) {
    return (
      <ErrorMessage
        title="Błąd ładowania danych"
        message="Nie udało się załadować danych paszportu."
      />
    );
  }

  // Format dates helper function
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Brak";
    try {
      return format(new Date(dateString), "dd.MM.yyyy");
    } catch (e) {
      return "Nieprawidłowa data";
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[640px]">
        {/* ID Card Container with perspective effect */}
        <div className="relative transform transition-all duration-500 hover:scale-105 hover:rotate-1">
          {/* Card Body */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-blue-200">
            {/* Eagle watermark in background */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-blue-900">
                <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
              </svg>
            </div>

            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 sm:p-6 flex items-center justify-between relative overflow-hidden">
              {/* Polish Emblem (simplified) */}
              <div className="absolute right-4 top-4 opacity-20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                </svg>
              </div>
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide">DOWÓD OSOBISTY</h1>
                <p className="text-xs sm:text-sm mt-1 opacity-90">RZECZPOSPOLITA POLSKA</p>
              </div>
              
              <div className="text-xs sm:text-sm text-right">
                <p>POLSKA</p>
                <p>POLAND</p>
              </div>
            </div>

            {/* Main Section */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-6">
              {/* Photo Section */}
              <div className="flex flex-col items-center sm:items-start gap-2">
                {/* Photo Frame */}
                <div className="relative">
                  {userData.photo ? (
                    <Image
                      src={userData.photo}
                      alt="Zdjęcie użytkownika"
                      className="w-32 h-40 rounded-md object-cover border-4 border-blue-100 shadow-md"
                      width={128}
                      height={160}
                      priority
                    />
                  ) : (
                    <div className="w-32 h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border-4 border-blue-100 shadow-md">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Hologram effect */}
                  <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-200 opacity-50 rounded-full blur-sm"></div>
                </div>
                
                {/* Document Number */}
                <div className="w-full mt-2 p-2 bg-blue-50 border border-blue-100 rounded text-center">
                  <p className="text-xs text-blue-800 font-mono font-semibold tracking-widest">
                    {userData.document_number || "BRAK NUMERU"}
                  </p>
                </div>
              </div>

              {/* Personal Data */}
              <div className="space-y-3">
                <div className="pb-2 border-b border-gray-200">
                  <h2 className="text-xs text-gray-500 uppercase tracking-wider">Nazwisko / Surname</h2>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900 uppercase">{userData.user.last_name}</p>
                </div>
                
                <div className="pb-2 border-b border-gray-200">
                  <h2 className="text-xs text-gray-500 uppercase tracking-wider">Imię (Imiona) / Given name(s)</h2>
                  <p className="text-lg font-semibold text-gray-900">
                    {userData.user.first_name} {userData.user.second_name ? `${userData.user.second_name}` : ""}
                  </p>
                </div>
                
                <div className="pb-2 border-b border-gray-200">
                  <h2 className="text-xs text-gray-500 uppercase tracking-wider">PESEL</h2>
                  <p className="text-lg font-mono font-semibold text-gray-900 tracking-wider">
                    {userData.user.pesel || "Brak"}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-xs text-gray-500 uppercase tracking-wider">Data urodzenia / DOB</h2>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(userData.user.birth_date)}
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xs text-gray-500 uppercase tracking-wider">Miejsce ur. / Place of birth</h2>
                    <p className="text-sm font-semibold text-gray-900">
                      {userData.user.birth_place || "Brak"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Data Section */}
            <div className="px-6 pb-6 pt-2">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  DANE DOKUMENTU / DOCUMENT DETAILS
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-xs text-gray-500">Data wydania / Date of issue</h4>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(userData.issue_date)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs text-gray-500">Data ważności / Expiry date</h4>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(userData.expiration_date)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs text-gray-500">Organ wydający / Issuing authority</h4>
                    <p className="text-sm font-semibold text-gray-900">WOJEWODA MAZOWIECKI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-2 flex justify-between items-center text-white text-xs">
              <span>POL</span>
              <span className="text-center opacity-80">ID CARD</span>
              <span className="font-mono">{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}