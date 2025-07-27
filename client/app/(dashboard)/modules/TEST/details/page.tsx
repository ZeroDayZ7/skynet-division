"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock, Unlock } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function DetailsPage() {
  const [citizenData, setCitizenData] = useState(null);
  const [password, setPassword] = useState("");
  const [isDataUnlocked, setIsDataUnlocked] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const citizenId = searchParams.get("citizenId");

  useEffect(() => {
    const mockCitizens = [
      {
        id: "CIT001",
        firstName: "Jan",
        lastName: "Kowalski",
        maidenName: "Nowak",
        address: "ul. Główna 123, 00-001 Warszawa",
        pesel: "90010112345",
        idNumber: "ABC123456",
        driverLicense: { valid: true, number: "DL789012" },
        password: "secure123",
      },
      {
        id: "CIT002",
        firstName: "Anna",
        lastName: "Wiśniewska",
        maidenName: "Kowalczyk",
        address: "ul. Szkolna 45, 31-002 Kraków",
        pesel: "85020254321",
        idNumber: "XYZ654321",
        driverLicense: { valid: false, number: "DL123456" },
        password: "pass456",
      },
    ];
    const citizen = mockCitizens.find((c) => c.id === citizenId);
    if (citizen) {
      setCitizenData(citizen);
    } else {
      setError("Nie znaleziono obywatela.");
    }
  }, [citizenId]);

  const handleUnlock = () => {
    if (citizenData && citizenData.password === password) {
      setIsDataUnlocked(true);
      setError("");
    } else {
      setError("Nieprawidłowe hasło.");
      setIsDataUnlocked(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Szczegóły Obywatela</CardTitle>
        </CardHeader>
        <CardContent>
          {citizenData && (
            <div className="space-y-4">
              <div>
                <Label>Hasło obywatela</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Wprowadź hasło obywatela"
                  />
                  <Button onClick={handleUnlock} className="flex items-center gap-2">
                    {isDataUnlocked ? (
                      <>
                        <Unlock className="w-5 h-5" />
                        Odblokowano
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Odblokuj dane
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Błąd</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isDataUnlocked && (
                <div className="space-y-2">
                  <p>
                    <strong>Imię:</strong> {citizenData.firstName}
                  </p>
                  <p>
                    <strong>Nazwisko:</strong> {citizenData.lastName}
                  </p>
                  <p>
                    <strong>Nazwisko panieńskie:</strong> {citizenData.maidenName}
                  </p>
                  <p>
                    <strong>Adres:</strong> {citizenData.address}
                  </p>
                  <p>
                    <strong>PESEL:</strong> {citizenData.pesel}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <p>
                  <strong>Numer dowodu osobistego:</strong> {citizenData.idNumber}
                </p>
                <p>
                  <strong>Prawo jazdy:</strong>{" "}
                  {citizenData.driverLicense.valid ? (
                    <span className="text-green-600">Ważne ({citizenData.driverLicense.number})</span>
                  ) : (
                    <span className="text-red-600">Nieważne ({citizenData.driverLicense.number})</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}