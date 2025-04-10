import Image from "next/image";
import { cookies } from "next/headers";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import ErrorMessage from "@/components/ui/ErrorMessage";

// Interfejs danych paszportu
interface PassportData {
  passport_number: string;
  issue_date: string;
  expiration_date: string;
  country_code: string;
  passport_type: string;
  first_name: string;
  second_name?: string | null;
  last_name: string;
  pesel: string;
  birth_date: string;
  birth_place: string;
  nationality: string;
  gender: string;
  issuing_authority: string;
  photo?: string;
}

// Funkcja formatowania dat
function formatDate(dateString: string): string {
  try {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: pl });
  } catch {
    return "Brak danych";
  }
}

export default async function PassportPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_SERV;
  const cookieStore = await cookies();
  const cookiesHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  let passportData: PassportData | null = null;

  try {
    const res = await fetch(`${apiUrl}/api/users/user-passport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookiesHeader,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      passportData = {
        passport_number: data.passport_number || "AB1234567",
        issue_date: data.issue_date,
        expiration_date: data.expiration_date,
        country_code: data.country_code || "POL",
        passport_type: data.passport_type || "P",
        first_name: data.user.first_name,
        second_name: data.user.second_name,
        last_name: data.user.last_name,
        pesel: data.user.pesel,
        birth_date: data.user.birth_date,
        birth_place: data.user.birth_place,
        nationality: data.user.nationality || "POLSKA",
        gender: data.user.gender || "M",
        issuing_authority: data.issuing_authority || "WOJEWODA MAZOWIECKI",
        photo: data.photo,
      };
    } else {
      console.error("Błąd pobierania danych paszportu", await res.text());
    }
  } catch (err) {
    console.error("Błąd połączenia z API", err);
  }

  if (!passportData) {
    return (
      <ErrorMessage
        title="Błąd ładowania danych"
        message="Nie udało się załadować danych paszportu."
      />
    );
  }

  const middleInitial = passportData.second_name
    ? `${passportData.second_name.charAt(0)}.`
    : "";
  const mrzLine1 = `P<${passportData.country_code}${passportData.last_name.toUpperCase()}<<${passportData.first_name.toUpperCase()}${middleInitial ? middleInitial.toUpperCase() : ""}`.padEnd(44, "<");
  const mrzLine2 = `${passportData.passport_number}${passportData.country_code}${passportData.birth_date.slice(2, 8).replace(/-/g, "")}M${passportData.expiration_date.slice(2, 8).replace(/-/g, "")}<<<<<<<`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[640px] bg-gradient-to-b from-blue-900 to-blue-800 rounded shadow-2xl overflow-hidden relative transform transition-transform hover:scale-105">
        {/* Nagłówek paszportu */}
        <div className="p-4 text-white flex justify-between items-center border-b border-blue-700">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M2 17L12 22L22 17"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M2 12L12 17L22 12"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            <div>
              <h1 className="text-lg sm:text-xl font-bold uppercase">
                Rzeczpospolita Polska
              </h1>
              <p className="text-xs opacity-80">Republic of Poland</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg sm:text-xl font-bold uppercase">Paszport</h2>
            <p className="text-xs opacity-80">Passport</p>
          </div>
        </div>

        {/* Główna zawartość */}
        <div className="p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Zdjęcie */}
            <div className="flex-shrink-0">
              {passportData.photo ? (
                <Image
                  src={passportData.photo}
                  alt="Zdjęcie paszportowe"
                  width={120}
                  height={150}
                  className="rounded-md border-2 border-white shadow-md object-cover"
                  priority
                />
              ) : (
                <div className="w-[120px] h-[150px] bg-gray-300 rounded-md flex items-center justify-center text-gray-600 border-2 border-white shadow-md">
                  Brak zdjęcia
                </div>
              )}
              <div className="mt-2 text-center text-xs italic opacity-80">
                Podpis / Signature
              </div>
            </div>

            {/* Dane paszportowe */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
              <div>
                <span className="text-xs opacity-70">Numer / Passport No.</span>
                <p className="font-bold uppercase">{passportData.passport_number}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Typ / Type</span>
                <p className="font-bold">{passportData.passport_type}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Nazwisko / Surname</span>
                <p className="font-bold uppercase">{passportData.last_name}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Imiona / Given Names</span>
                <p className="font-bold uppercase">
                  {passportData.first_name} {middleInitial}
                </p>
              </div>
              <div>
                <span className="text-xs opacity-70">Obywatelstwo / Nationality</span>
                <p className="font-bold uppercase">{passportData.nationality}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Płeć / Sex</span>
                <p className="font-bold">{passportData.gender}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Data urodzenia / Date of Birth</span>
                <p className="font-bold">{formatDate(passportData.birth_date)}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Miejsce urodzenia / Place of Birth</span>
                <p className="font-bold">{passportData.birth_place}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Data wydania / Date of Issue</span>
                <p className="font-bold">{formatDate(passportData.issue_date)}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Data ważności / Date of Expiry</span>
                <p className="font-bold">{formatDate(passportData.expiration_date)}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs opacity-70">Organ wydający / Issuing Authority</span>
                <p className="font-bold">{passportData.issuing_authority}</p>
              </div>
            </div>
          </div>

          {/* MRZ - Machine Readable Zone */}
          <div className="mt-4 bg-gray-200 text-black p-2 rounded font-mono text-xs sm:text-sm tracking-wider">
            <p>{mrzLine1}</p>
            <p>{mrzLine2}</p>
          </div>
        </div>

        {/* Efekty wizualne */}
        <div className="absolute top-10 right-10 opacity-20 pointer-events-none">
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              fill="white"
              stroke="white"
              strokeWidth="1"
            />
            <path d="M2 17L12 22L22 17" fill="white" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}