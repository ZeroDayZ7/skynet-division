import { useGetUserEIDData } from "@/app/api/users/electronic-documents/useGetUserEIDData";
import EIDCard from "@/components/electronic-documents/EIDCard";

export default async function EIDPage() {
  let userData = null;

  try {
    userData = await useGetUserEIDData();
    console.log(`Pobrano dane e-dowodu`);
  } catch (error) {
    console.error("Błąd pobierania danych dowodu osobistego", error);
  }

  return <EIDCard userData={userData} />;
}