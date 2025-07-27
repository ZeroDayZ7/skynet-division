// app/components/PoliceVerification.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock, Unlock, Fingerprint } from "lucide-react";

// Mock JSON data for citizens
const mockCitizens = [
  {
    id: "CIT001",
    photo: "https://via.placeholder.com/150",
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
    photo: "https://via.placeholder.com/150",
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

export default function PoliceVerification() {
  const [citizenId, setCitizenId] = useState("");
  const [password, setPassword] = useState("");
  const [citizenData, setCitizenData] = useState(null);
  const [error, setError] = useState("");
  const [isDataUnlocked, setIsDataUnlocked] = useState(false);
  const [isBiometricVerified, setIsBiometricVerified] = useState(false);

  // Handle citizen ID search
  const handleSearch = () => {
    setError("");
    setCitizenData(null);
    setIsDataUnlocked(false);
    setIsBiometricVerified(false);

    const citizen = mockCitizens.find((c) => c.id === citizenId);
    if (citizen) {
      setCitizenData(citizen);
    } else {
      setError("Nie znaleziono obywatela o podanym ID.");
    }
  };

  // Handle password verification
  const handleUnlock = () => {
    if (citizenData && citizenData.password === password) {
      setIsDataUnlocked(true);
      setError("");
    } else {
      setError("Nieprawidłowe hasło.");
      setIsDataUnlocked(false);
    }
  };

  // Simulate biometric verification
  const handleBiometricVerification = () => {
    // Simulate async biometric check (e.g., face recognition)
    setTimeout(() => {
      setIsBiometricVerified(true);
      setError("");
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Weryfikacja Obywatela</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="citizenId">ID Obywatela</Label>
              <div className="flex gap-2">
                <Input
                  id="citizenId"
                  value={citizenId}
                  onChange={(e) => setCitizenId(e.target.value)}
                  placeholder="Wprowadź ID obywatela (np. CIT001)"
                />
                <Button onClick={handleSearch}>Szukaj</Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Błąd</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {citizenData && (
              <div className="space-y-6">
                {/* Photo and Biometric Verification */}
                <div className="flex flex-col items-center">
                  <img
                    src={citizenData.photo}
                    alt="Zdjęcie obywatela"
                    className="w-32 h-32 rounded-full mb-4"
                  />
                  {!isBiometricVerified ? (
                    <Button onClick={handleBiometricVerification} className="flex items-center gap-2">
                      <Fingerprint className="w-5 h-5" />
                      Weryfikuj biometrycznie
                    </Button>
                  ) : (
                    <Alert>
                      <AlertTitle>Zweryfikowano</AlertTitle>
                      <AlertDescription>Biometria potwierdzona pomyślnie.</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Sensitive Data Section */}
                <div className="space-y-4">
                  <div>
                    <Label>Hasło obywatela</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Wprowadź hasło obywatela"
                        disabled={!isBiometricVerified}
                      />
                      <Button
                        onClick={handleUnlock}
                        disabled={!isBiometricVerified}
                        className="flex items-center gap-2"
                      >
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

                  {/* Public Data (Always Visible) */}
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
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}