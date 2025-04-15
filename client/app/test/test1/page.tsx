'use client'
import Link from 'next/link'
import { Home, Info, Settings, User } from 'lucide-react' // Ikony z lucide-react
import { Button } from '@/components/ui/button' // Przykładowy komponent przycisku
import { Card } from '@/components/ui/card' // Przykładowy komponent karty

export default function Homes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Witaj w naszej aplikacji!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <Card>
          <div className="flex flex-col items-center">
            <Home className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold">Strona Główna</h3>
            <Link href="/" passHref>
              <Button variant="outline" className="mt-4">
                Wejdź do strony głównej
              </Button>
            </Link>
          </div>
        </Card>

        {/* Card 2 */}
        <Card>
          <div className="flex flex-col items-center">
            <Info className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold">O nas</h3>
            <Link
              href={{
                pathname: '/about',
                query: { name: 'test' },
              }}
              passHref
            >
              <Button variant="outline" className="mt-4">
                Dowiedz się więcej
              </Button>
            </Link>
          </div>
        </Card>

        {/* Card 3 */}
        <Card>
          <div className="flex flex-col items-center">
            <Settings className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold">Ustawienia</h3>
            <Link href="/settings" passHref>
              <Button variant="outline" className="mt-4">
                Przejdź do ustawień
              </Button>
            </Link>
          </div>
        </Card>

        {/* Card 4 */}
        <Card>
          <div className="flex flex-col items-center">
            <User className="h-8 w-8 text-teal-500 mb-4" />
            <h3 className="text-lg font-semibold">Profil</h3>
            <Link href="/profile" passHref>
              <Button variant="outline" className="mt-4">
                Zobacz swój profil
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
