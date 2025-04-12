"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profil użytkownika</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informacje o koncie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Adres e-mail</Label>
              <Input id="email" type="email" placeholder="uzytkownik@example.com" disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-password">Aktualne hasło</Label>
              <Input id="current-password" type="password" placeholder="********" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Nowe hasło</Label>
              <Input id="new-password" type="password" placeholder="********" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Powtórz nowe hasło</Label>
              <Input id="confirm-password" type="password" placeholder="********" />
            </div>

            <Button className="w-full mt-2">Zmień hasło</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
