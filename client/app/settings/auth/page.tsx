"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AuthSettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Autoryzacja</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ustawienia uwierzytelniania</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="2fa">Uwierzytelnianie dwuskładnikowe</Label>
                <p className="text-sm text-muted-foreground">
                  Wymagaj kodu z aplikacji przy logowaniu
                </p>
              </div>
              <Switch
                id="2fa"
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="biometrics">Uwierzytelnianie biometryczne</Label>
                <p className="text-sm text-muted-foreground">
                  Pozwól na logowanie odciskiem palca lub twarzą (jeśli dostępne)
                </p>
              </div>
              <Switch
                id="biometrics"
                checked={biometricsEnabled}
                onCheckedChange={setBiometricsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="login-alerts">Alerty o logowaniu</Label>
                <p className="text-sm text-muted-foreground">
                  Otrzymuj powiadomienia o każdym nowym logowaniu
                </p>
              </div>
              <Switch
                id="login-alerts"
                checked={loginAlerts}
                onCheckedChange={setLoginAlerts}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
