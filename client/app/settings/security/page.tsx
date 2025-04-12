"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SetPinModal } from "@/components/settings/security/SetPinModal";
import { VerifyPinModal } from "@/components/settings/security/VerifyPinModal";

export default function SecurityPage() {
  const [isPinSet, setIsPinSet] = useState(false);
  const [isSetPinModalOpen, setIsSetPinModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSetPin = () => {
    if (isPinSet) {
      setIsVerifyModalOpen(true);
    } else {
      setIsSetPinModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bezpieczeństwo</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ochrona konta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pin">Kod PIN</Label>
                <p className="text-sm text-muted-foreground">
                  {isPinSet
                    ? "Kod PIN jest ustawiony"
                    : "Dodaj dodatkową warstwę zabezpieczeń"}
                </p>
              </div>
              <Button variant="outline" onClick={handleSetPin} className="dark:hover:text-green-500">
                {isPinSet ? "Zmień PIN" : "Ustaw PIN"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="2fa">Uwierzytelnianie dwuskładnikowe</Label>
                <p className="text-sm text-muted-foreground">
                  Wymagaj kodu z aplikacji autoryzacyjnej przy logowaniu
                </p>
              </div>
              <Switch
                id="2fa"
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historia logowań</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Ostatnie aktywności będą wyświetlane tutaj
            </div>
          </CardContent>
        </Card>
      </div>

      <SetPinModal
        isOpen={isSetPinModalOpen}
        onClose={() => setIsSetPinModalOpen(false)}
        onSuccess={() => {
          setIsPinSet(true);
          setIsSetPinModalOpen(false);
        }}
      />

      <VerifyPinModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onSuccess={() => {
          setIsSetPinModalOpen(true);
          setIsVerifyModalOpen(false);
        }}
      />
    </div>
  );
}