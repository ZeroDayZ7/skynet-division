// app/(dashboard)/settings/page.tsx
'use client'
import { SettingsSection } from "@/components/settings/SettingsSection";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { Shield, User, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-2">Ustawienia</h1>
      
      <SettingsSection title="Konto">
        <SettingsCard 
          title="Profil" 
          description="Zarządzaj swoimi danymi"
          icon={<User className="w-5 h-5" />}
          href="/dashboard/settings/profile"
        />
      </SettingsSection>

      <SettingsSection title="Powiadomienia">
        <SettingsCard 
          title="Preferencje" 
          description="Dostosuj powiadomienia"
          icon={<Bell className="w-5 h-5" />}
          href="/dashboard/settings/notifications"
        />
      </SettingsSection>

      <SettingsSection title="Bezpieczeństwo">
        <SettingsCard 
          title="Ochrona konta" 
          description="Zabezpieczenia i logowania"
          icon={<Shield className="w-5 h-5" />}
          href="/dashboard/settings/security"
        />
        <SettingsCard 
          title="Autoryzacja" 
          description="Ustawienia uwierzytelniania"
          icon={<Lock className="w-5 h-5" />}
          href="/dashboard/settings/auth"
        />
      </SettingsSection>
    </div>
  );
}