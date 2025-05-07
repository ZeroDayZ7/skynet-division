
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { format } from "date-fns";
// import ErrorMessage from "../errors/ErrorMessage";
// import Image from "next/image";
// import { UserDataEID } from "@/app/_api/users/electronic-documents/useGetUserEIDData";
// // import { error } from "console";

// // Interfejs propsów komponentu
// interface EIDCardProps {
//   userData: UserDataEID | null;
//   // errorMessage?: string; // Opcjonalny komunikat błędu
  
// }

// // Funkcja formatująca daty
// const formatDate = (dateString: string | null) => {
//   if (!dateString) return "Brak";
//   try {
//     return format(new Date(dateString), "dd.MM.yyyy");
//   } catch (error) {
//     console.error("Błąd formatu daty:", error);
//     return "Nieprawidłowa data";
//   }
// };

// export default function EIDCard({ userData }: EIDCardProps) {
//   // Jeśli brak danych, zwróć komunikat o błędzie
//   if (!userData) {
//     return (
//       <ErrorMessage
//         title="Błąd ładowania danych"
//         message="Nie udało się pobrać danych dowodu osobistego."
//       />
//     );
//   }

//   return (
//     <div className="flex items-center justify-center p-4">
//       <Card className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[640px] border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800">
//         {/* Nagłówek karty */}
//         <CardHeader className="bg-blue-900 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold tracking-wide">DOWÓD OSOBISTY</h1>
//             <p className="text-xs sm:text-sm mt-1 opacity-90">RZECZPOSPOLITA POLSKA</p>
//           </div>
//           <div className="text-xs sm:text-sm text-right">
//             <p>POLSKA</p>
//             <p>POLAND</p>
//           </div>
//         </CardHeader>

//         {/* Główna sekcja */}
//         <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-6">
//           {/* Sekcja ze zdjęciem */}
//           <div className="flex flex-col items-center sm:items-start gap-2">
//             {userData.photo ? (
//               <Image
//                 src={userData.photo}
//                 alt="Zdjęcie użytkownika"
//                 className="w-32 h-40 rounded-md object-cover border-2 border-blue-100 dark:border-blue-700"
//                 width={128}
//                 height={160}
//                 priority
//               />
//             ) : (
//               <Avatar className="w-32 h-40 border-2 border-blue-100 dark:border-blue-700">
//                 <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
//                   <svg
//                     className="w-16 h-16"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1}
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </AvatarFallback>
//               </Avatar>
//             )}
//             <div className="w-full mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-700 rounded text-center">
//               <p className="text-xs text-blue-800 dark:text-blue-300 font-mono font-semibold tracking-widest">
//                 {userData.document_number || "BRAK NUMERU"}
//               </p>
//             </div>
//           </div>

//           {/* Dane osobowe */}
//           <div className="space-y-3 text-gray-900 dark:text-gray-100">
//             <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Nazwisko / Surname
//               </h2>
//               <p className="text-lg sm:text-xl font-semibold uppercase">{userData.user.last_name}</p>
//             </div>

//             <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Imię (Imiona) / Given name(s)
//               </h2>
//               <p className="text-lg font-semibold">
//                 {userData.user.first_name} {userData.user.second_name || ""}
//               </p>
//             </div>

//             <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">PESEL</h2>
//               <p className="text-lg font-mono font-semibold tracking-wider">
//                 {userData.user.pesel || "Brak"}
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Data urodzenia / DOB
//                 </h2>
//                 <p className="text-sm font-semibold">{formatDate(userData.user.birth_date)}</p>
//               </div>
//               <div>
//                 <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Miejsce ur. / Place of birth
//                 </h2>
//                 <p className="text-sm font-semibold">{userData.user.birth_place || "Brak"}</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>

//         {/* Sekcja danych dokumentu */}
//         <CardContent className="px-6 pb-6 pt-2">
//           <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-700">
//             <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                 />
//               </svg>
//               DANE DOKUMENTU / DOCUMENT DETAILS
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-900 dark:text-gray-100">
//               <div>
//                 <h4 className="text-xs text-gray-500 dark:text-gray-400">Data wydania / Date of issue</h4>
//                 <p className="text-sm font-semibold">{formatDate(userData.issue_date)}</p>
//               </div>
//               <div>
//                 <h4 className="text-xs text-gray-500 dark:text-gray-400">Data ważności / Expiry date</h4>
//                 <p className="text-sm font-semibold">{formatDate(userData.expiration_date)}</p>
//               </div>
//               <div>
//                 <h4 className="text-xs text-gray-500 dark:text-gray-400">Organ wydający / Issuing authority</h4>
//                 <p className="text-sm font-semibold">WOJEWODA MAZOWIECKI</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>

//         {/* Stopka */}
//         <CardFooter className="bg-blue-700 p-2 flex justify-between items-center text-xs">
//           <span>POL</span>
//           <span className="opacity-80">ID CARD</span>
//           <span className="font-mono">{new Date().getFullYear()}</span>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }