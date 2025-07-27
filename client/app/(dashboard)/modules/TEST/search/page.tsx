"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [citizenId, setCitizenId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const mockCitizens = [
      { id: "CIT001", photo: "https://via.placeholder.com/150", password: "secure123" },
      { id: "CIT002", photo: "https://via.placeholder.com/150", password: "pass456" },
    ];
    const citizen = mockCitizens.find((c) => c.id === citizenId);
    if (citizen) {
      router.push(`/verify?citizenId=${citizenId}`);
    } else {
      setError("Nie znaleziono obywatela o podanym ID.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Wyszukiwanie Obywatela</CardTitle>
        </CardHeader>
        <CardContent>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}