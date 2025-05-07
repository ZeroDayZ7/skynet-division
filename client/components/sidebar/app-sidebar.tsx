'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Command,
  AlertTriangle,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  FileDigit
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
        url: '#',
        icon: SquareTerminal,
        isActive: false,
        show: true,
        enabled: true,
        items: [
          { 
            title: t('main.history'), 
            url: '/dashboard',
            show: true,
            enabled: true,
          },
          { title: t('main.job'), url: '/dashboard/jobs', enabled: true},
          // { title: t('main.citizenprojects'), url: '#', enabled: false},
        ],
      },
      {
        title: t('main.documents'),
        url: '#',
        icon: FileDigit,
        items: [
          { 
            title: t('documents.submitApplication'), 
            url: '/dashboard/documents/document-application' 
          },
          { title: t('documents.mydocuments'), url: '/dashboard/documents/mydocuments' },
        ],
      },
      {
        title: t('main.docs'),
        url: '#',
        icon: BookOpen,
        show: false,
        items: [
          { title: t('docs.intro'), url: '#' },
          { title: t('docs.start'), url: '#' },
          { title: t('docs.tutorials'), url: '#' },
          { title: t('docs.changelog'), url: '#' },
        ],
      },
      {
        title: t('main.citizenprojects'),
        url: '#',
        icon: Settings2,
        items: [
          { title: t('citizenprojects.general'), url: '/dashboard/citizens-projects' },
          // { title: t('citizenprojects.tutorial'), url: '/dashboard/settings', enabled: true },
          { title: t('citizenprojects.panel'), url: '#', enabled: false },
          { title: t('citizenprojects.favourites'), url: '#', enabled: false },
        ],
      },
    ],
    navSecondary: [
      { title: t('secondary.support'), url: '/dashboard/support', icon: LifeBuoy },
      // { title: t('secondary.feedback'), url: '/dashboard/feed-back', icon: Send },
    ],
    projects: [
      { name: t('projects.emerygency'), url: '/intervention-group', icon: AlertTriangle },
      { name: t('projects.test'), url: '/test', icon: PieChart },
      // { name: t('projects.travel'), url: '#', icon: Map, show: false },
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
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

export default memo(AppSidebar)
