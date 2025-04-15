// import { InformationCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function InfoAboutApp() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Informacje o aplikacji</h1>

      <div className="flex justify-center">
        <Card className="max-w-lg p-8 bg-gray-50 text-gray-700 border border-gray-300 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-6">
            {/* <InformationCircle className="h-12 w-12 text-brown-600 mb-4" /> */}
            <h2 className="text-2xl font-semibold mb-4">O naszej aplikacji</h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Nasza aplikacja ma na celu uproszczenie codziennych zadań i zapewnienie łatwego dostępu do narzędzi, które pomogą Ci w organizacji pracy.
              Została zaprojektowana z myślą o prostocie, elegancji i minimalizmie, abyś mógł skoncentrować się na tym, co naprawdę ważne.
            </p>
            <Button variant="outline" className="w-full text-gray-700 border-gray-400 hover:bg-gray-200">
              Dowiedz się więcej
            </Button>
          </div>

          <div className="mt-6 text-sm text-center text-gray-600">
            <p>
              <span className="font-semibold text-brown-600">Wersja:</span> 1.0.0
            </p>
            <p>
              <span className="font-semibold text-brown-600">Stworzona przez:</span> Zespół XYZ
            </p>
            <p>
              <span className="font-semibold text-brown-600">Data wydania:</span> Kwiecień 2025
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
