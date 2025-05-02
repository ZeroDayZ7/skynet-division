// components/sidebar/AppSidebar.tsx
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { SidebarFooterMenu } from "./SidebarFooterMenu"

// Importuj grupy
import { ApplicationGroup } from "../groups/ApplicationGroup"
import { SettingsGroup } from "../groups/SettingsGroup"
// import { AdminGroup } from "./groups/AdminGroup" // itd.

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <ApplicationGroup />
        <SettingsGroup />
        {/* <AdminGroup /> */}
        {/* Dodaj inne grupy bez ruszania głównego komponentu */}
      </SidebarContent>

      <SidebarFooterMenu />
    </Sidebar>
  )
}
