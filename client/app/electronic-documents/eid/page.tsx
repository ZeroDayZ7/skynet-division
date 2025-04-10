import { getUserEIDData } from "@/services/users-electronic-documents-services";
import EIDCard from "@/components/electronic-documents/EIDCard";

export default async function ProfilePage() {
  let userData = null;

  try {
    userData = await getUserEIDData();
    console.log("Dane e-dowodu:", userData);
  } catch (error) {
    console.error("Błąd pobierania danych dowodu osobistego", error);
  }

  return <EIDCard userData={userData} />;
}