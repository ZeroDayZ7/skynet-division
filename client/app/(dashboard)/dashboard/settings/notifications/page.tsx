"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [securityNotif, setSecurityNotif] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Powiadomienia</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preferencje powiadomień</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif">Powiadomienia e-mail</Label>
                <p className="text-sm text-muted-foreground">
                  Otrzymuj ważne informacje na swoją skrzynkę e-mail
                </p>
              </div>
              <Switch
                id="email-notif"
                checked={emailNotif}
                onCheckedChange={setEmailNotif}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notif">Powiadomienia SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Otrzymuj wiadomości tekstowe o zmianach na koncie
                </p>
              </div>
              <Switch
                id="sms-notif"
                checked={smsNotif}
                onCheckedChange={setSmsNotif}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="security-notif">Alerty bezpieczeństwa</Label>
                <p className="text-sm text-muted-foreground">
                  Informuj mnie o logowaniach i nieznanych działaniach
                </p>
              </div>
              <Switch
                id="security-notif"
                checked={securityNotif}
                onCheckedChange={setSecurityNotif}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
