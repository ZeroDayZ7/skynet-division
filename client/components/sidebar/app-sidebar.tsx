'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import { NavMain } from '@/components/sidebar/nav-main'
import { NavProjects } from '@/components/sidebar/nav-projects'
import { NavSecondary } from '@/components/sidebar/nav-secondary'
import { NavUser } from '@/components/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

function useSidebarData() {
  const t = useTranslations('Sidebar')

  return {
    navMain: [
      {
        title: t('main.home'),
        url: '/dashboard',
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: t('main.history'), url: '#' },
          { title: t('main.starred'), url: '#' },
          { title: t('main.settings'), url: '#' },
        ],
      },
      {
        title: t('main.documents'),
        url: '/dashboard/documents',
        icon: Bot,
        items: [
          { title: t('documents.eid'), url: '#' },
          { title: t('documents.passport'), url: '#' },
        ],
      },
      {
        title: t('main.docs'),
        url: '#',
        icon: BookOpen,
        items: [
          { title: t('docs.intro'), url: '#' },
          { title: t('docs.start'), url: '#' },
          { title: t('docs.tutorials'), url: '#' },
          { title: t('docs.changelog'), url: '#' },
        ],
      },
      {
        title: t('main.settings'),
        url: '/dashboard/settings',
        icon: Settings2,
        items: [
          { title: t('settings.general'), url: '#' },
          { title: t('settings.team'), url: '#' },
          { title: t('settings.billing'), url: '#' },
          { title: t('settings.limits'), url: '#' },
        ],
      },
    ],
    navSecondary: [
      { title: t('secondary.support'), url: '/dashboard/support', icon: LifeBuoy },
      { title: t('secondary.feedback'), url: '#', icon: Send },
    ],
    projects: [
      { name: t('projects.design'), url: '#', icon: Frame },
      { name: t('projects.sales'), url: '#', icon: PieChart },
      { name: t('projects.travel'), url: '#', icon: Map },
    ],
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useSidebarData()

  return (
    <Sidebar
      className="top-[var(--header-height)] h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium"> Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

export default memo(AppSidebar)
