'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

export function NavMain({
  items,
}: {
  items: {
    title: string
    icon: LucideIcon
    isActive?: boolean
    show?: boolean
    enabled?: boolean
    items?: {
      title: string
      url: string
      show?: boolean
      enabled?: boolean
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items
          .filter(item => item.show !== false)
          .map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                {item.items?.length ? (
                  <>
                    <div className="flex items-center">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="group flex-1 flex items-center justify-between"
                          disabled={item.enabled === false}
                        >
                          <div className="flex items-center space-x-2">
                            <item.icon />
                            <span className={item.enabled === false ? 'opacity-50' : ''}>
                              {item.title}
                            </span>
                          </div>
                          <ChevronRight className="transition-transform duration-100 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items
                          .filter(subItem => subItem.show !== false)
                          .map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              {subItem.enabled !== false ? (
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url} className="w-full">
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              ) : (
                                <SidebarMenuSubButton
                                  style={{ opacity: 0.5 }}
                                  className="w-full opacity-50 cursor-not-allowed"
                                >
                                  {subItem.title}
                                </SidebarMenuSubButton>
                              )}
                            </SidebarMenuSubItem>
                          ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : (
                  <SidebarMenuButton asChild tooltip={item.title}>
                    {item.enabled !== false ? (
                      <>
                        <item.icon />
                        <span>{item.title}</span>
                        </>
                    ) : (
                      <button
                        disabled
                        className="flex items-center space-x-2 opacity-50 cursor-not-allowed w-full text-left"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    )}
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
