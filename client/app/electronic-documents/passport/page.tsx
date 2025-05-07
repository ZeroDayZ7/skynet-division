import { getUserPassportData } from "@/app/_api/users/electronic-documents/useGetUserPassportData";
import PassportCard from "@/components/electronic-documents/PassportCard";

export default async function PassportPage() {
  let passportData = null;
  try {
    passportData = await getUserPassportData();
    console.log(`Pobrano dane paszportu`);
  } catch (error) {
    console.error("Błąd pobierania danych paszportu", error);
  }

  return <PassportCard passportData={passportData} />;
}
