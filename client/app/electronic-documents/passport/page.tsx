// pages/profile.tsx
import { getUserPassportData } from "@/services/users-electronic-documents-services";
import PassportCard from "@/components/electronic-documents/PassportCard";

export default async function ProfilePage() {
  let passportData = null;

  try {
    passportData = await getUserPassportData();
    console.log("Pobrano dane paszportu:");
  } catch (error) {
    console.error("Błąd pobierania danych paszportu", error);
  }

  return <PassportCard passportData={passportData} />;
}
