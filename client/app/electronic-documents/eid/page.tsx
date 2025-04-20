import { getUserEIDData } from "@/app/api/users/electronic-documents/useGetUserEIDData"; // ← Zmieniona nazwa!
import EIDCard from "../../../../components/electronic-documents/EIDCard";

export default async function EIDPage() {
  let userData = null;
  try {
    userData = await getUserEIDData(); // teraz OK
  } catch (error) {
    console.error("Błąd pobierania danych dowodu osobistego:", error);
  }

  return <EIDCard userData={userData} />;
}
