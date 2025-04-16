// pages/profile.tsx
import { useGetUserPassportData } from "@/app/api/users/electronic-documents/useGetUserPassportData";
import PassportCard from "@/components/electronic-documents/PassportCard";

export default async function ProfilePage() {
  let passportData = null;

  try {
    passportData = await useGetUserPassportData();
    console.log(`Pobrano dane paszportu`);
  } catch (error) {
    console.error("Błąd pobierania danych paszportu", error);
  }

  return <PassportCard passportData={passportData} />;
}
