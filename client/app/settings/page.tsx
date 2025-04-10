"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Settings() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold mb-6">Ustawienia konta</h1>

      {/* Zmiana adresu e-mail */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Zmień adres e-mail</h2>
        <div>
          <Label htmlFor="new-email">Nowy e-mail</Label>
          <Input id="new-email" type="email" placeholder="nowy@email.com" />
        </div>
        <div>
          <Label htmlFor="email-password">Hasło</Label>
          <Input id="email-password" type="password" placeholder="Twoje hasło" />
        </div>
        <Button type="submit">Zmień e-mail</Button>
      </div>

      {/* Zmiana hasła */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Zmień hasło</h2>
        <div>
          <Label htmlFor="current-password">Obecne hasło</Label>
          <Input id="current-password" type="password" />
        </div>
        <div>
          <Label htmlFor="new-password">Nowe hasło</Label>
          <Input id="new-password" type="password" />
        </div>
        <div>
          <Label htmlFor="confirm-password">Potwierdź nowe hasło</Label>
          <Input id="confirm-password" type="password" />
        </div>
        <Button type="submit">Zmień hasło</Button>
      </div>

      {/* Usunięcie konta */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-red-600">Usuń konto</h2>
        <p className="text-sm text-muted-foreground">
          Tej operacji nie można cofnąć. Spowoduje trwałe usunięcie konta i wszystkich danych.
        </p>
        <Button variant="destructive">Usuń konto</Button>
      </div>
    </div>
  );
}
