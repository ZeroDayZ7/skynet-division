"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Fingerprint } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const [isBiometricVerified, setIsBiometricVerified] = useState(false);
  const [citizenData, setCitizenData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const citizenId = searchParams.get("citizenId");

  useEffect(() => {
    const mockCitizens = [
      { id: "CIT001", photo: "https://via.placeholder.com/150", password: "secure123" },
      { id: "CIT002", photo: "https://via.placeholder.com/150", password: "pass456" },
    ];
    const citizen = mockCitizens.find((c) => c.id === citizenId);
    if (citizen) {
      setCitizenData(citizen);
    } else {
      setError("Nie znaleziono obywatela.");
    }
  }, [citizenId]);

  const handleBiometricVerification = () => {
    setTimeout(() => {
      setIsBiometricVerified(true);
      setError("");
    }, 1000);
  };

  const proceedToDetails = () => {
    router.push(`/details?citizenId=${citizenId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Weryfikacja Biometryczna</CardTitle>
        </CardHeader>
        <CardContent>
          {citizenData && (
            <div className="flex flex-col items-center space-y-4">
              <img
                src={citizenData.photo}
                alt="Zdjęcie obywatela"
                className="w-32 h-32 rounded-full"
              />
              {!isBiometricVerified ? (
                <Button onClick={handleBiometricVerification} className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5" />
                  Weryfikuj biometrycznie
                </Button>
              ) : (
                <>
                  <Alert>
                    <AlertTitle>Zweryfikowano</AlertTitle>
                    <AlertDescription>Biometria potwierdzona pomyślnie.</AlertDescription>
                  </Alert>
                  <Button onClick={proceedToDetails}>Przejdź do szczegółów</Button>
                </>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Błąd</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}