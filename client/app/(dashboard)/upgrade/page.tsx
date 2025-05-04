// app/page.tsx (lub pages/index.tsx w starszej wersji)
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Porównanie planów</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-4 text-left">Funkcja</th>
              <th className="border border-gray-300 p-4 text-center">Pro</th>
              <th className="border border-gray-300 p-4 text-center">Platinum</th>
              <th className="border border-gray-300 p-4 text-center">VIP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-4">Dostęp do podstawowych funkcji</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Dostęp do zaawansowanych funkcji</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Priorytetowe wsparcie</td>
              <td className="border border-gray-300 p-4 text-center">❌</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Specjalne korzyści</td>
              <td className="border border-gray-300 p-4 text-center">❌</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
              <td className="border border-gray-300 p-4 text-center">✔</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Cena miesięczna</td>
              <td className="border border-gray-300 p-4 text-center">29 PLN</td>
              <td className="border border-gray-300 p-4 text-center">59 PLN</td>
              <td className="border border-gray-300 p-4 text-center">99 PLN</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/upgrade" className="bg-blue-500 text-white py-2 px-4 rounded mr-4">
          Ulepsz do Pro
        </Link>
        <Link href="/upgrade" className="bg-green-500 text-white py-2 px-4 rounded mr-4">
          Ulepsz do Platinum
        </Link>
        <Link href="/upgrade" className="bg-purple-500 text-white py-2 px-4 rounded">
          Ulepsz do VIP
        </Link>
      </div>
    </div>
  );
}
