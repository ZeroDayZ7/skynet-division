'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

export default function MobileSidebarToggle() {
  const [openMobile, setOpenMobile] = React.useState(false)

  console.log(`openMobile: ${openMobile}`)

  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-muted-foreground">
        Sidebar mobilny jest: <strong>{openMobile ? 'otwarty' : 'zamknięty'}</strong>
      </p>
      <Button onClick={() => setOpenMobile((prev) => !prev)}>
        {openMobile ? 'Zamknij sidebar' : 'Otwórz sidebar'}
      </Button>
    </div>
  )
}
