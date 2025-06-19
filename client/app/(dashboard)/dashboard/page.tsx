'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { AlertCircle, FolderKanban } from "lucide-react"


// Dummy data props
// const user = { nickname: "janek123" }
const tasksInProgress = 5
const alerts = 2

function WelcomeBanner({ nickname }: { nickname: string }) {
  return (
    <Card className="text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Witaj, {nickname}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Miło Cię znowu widzieć. Sprawdź swoje sprawy poniżej</p>
      </CardContent>
    </Card>
  )
}

function StatusButton({ count, label, icon }: { count: number, label: string, icon: React.ReactNode }) {
  return (
    <Button variant="outline" className="relative w-full justify-start text-left text-base">
      <div className="mr-3 text-yellow-500">{icon}</div>
      {label}
      {count > 0 && (
        <Badge className="absolute right-4 top-2 bg-pink-600 text-white">{count}</Badge>
      )}
    </Button>
  )
}

export default function DashboardPage() {

  const { user } = useAuth();
  if (!user) return null; // lub loader lub komunikat o błędzie

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6 p-6 animate-fade-in">
      <WelcomeBanner nickname={user.username} />

      <div className="grid gap-4">
        <StatusButton
          count={tasksInProgress}
          label="Sprawy w toku"
          icon={<FolderKanban className="w-5 h-5" />}
        />

        <StatusButton
          count={alerts}
          label="Alerty i przypomnienia"
          icon={<AlertCircle className="w-5 h-5" />}
        />
      </div>
    </div>
  )
}
