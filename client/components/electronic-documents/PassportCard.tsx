
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { format } from "date-fns";
// import ErrorMessage from "../errors/ErrorMessage";
// import Image from "next/image";
// import { UserDataPassport } from "@/app/_api/users/electronic-documents/useGetUserPassportData";

// // Interfejs propsów komponentu
// interface PassportCardProps {
//     passportData: UserDataPassport | null;
//   }

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

// export default function PassportCard({ passportData }: PassportCardProps) {
//   // Jeśli brak danych, zwróć komunikat o błędzie
//   if (!passportData) {
//     return (
//       <ErrorMessage
//         title="Błąd ładowania danych"
//         message="Nie udało się załadować danych paszportu."
//       />
//     );
//   }

//   return (
//     <div className="flex items-center justify-center p-4">
//       <Card className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[640px] border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800">
//         {/* Nagłówek paszportu */}
//         <CardHeader className="bg-blue-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold tracking-wide">PASZPORT</h1>
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
//             {passportData.photo ? (
//               <Image
//                 src={passportData.photo}
//                 alt="Zdjęcie paszportowe"
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
//                 {passportData.passport_number || "BRAK NUMERU"}
//               </p>
//             </div>
//           </div>

//           {/* Dane paszportowe */}
//           <div className="space-y-3 text-gray-900 dark:text-gray-100">
//             <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nazwisko</h2>
//               <p className="text-lg sm:text-xl font-semibold uppercase">{passportData.user.last_name}</p>
//             </div>
//             <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Imię (Imiona)</h2>
//               <p className="text-lg font-semibold">
//                 {passportData.user.first_name} {passportData.user.second_name || ""}
//               </p>
//             </div>

//             <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">PESEL</h2>
//               <p className="text-lg font-mono font-semibold tracking-wider">
//                 {passportData.user.pesel || "Brak"}
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data urodzenia</h2>
//                 <p className="text-lg">{formatDate(passportData.user.birth_date)}</p>
//               </div>
//               <div>
//                 <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Miejsce urodzenia</h2>
//                 <p className="text-lg">{passportData.user.birth_place}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data wydania</h2>
//                 <p className="text-lg">{formatDate(passportData.issue_date)}</p>
//               </div>
//               <div>
//                 <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data ważności</h2>
//                 <p className="text-lg">{formatDate(passportData.expiration_date)}</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="bg-blue-50 dark:bg-blue-800 border-t border-gray-200 dark:border-gray-700">
//           {/* <p className="text-xs text-gray-500 dark:text-gray-400">{passportData.user.issuing_authority}</p> */}
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
