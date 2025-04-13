import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { ThemeProvider } from '@/components/theme/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aplikacja Obywatelska',
  description: 'Zarządzaj Polska z jednego miejsca!',
  robots: {
    index: false, // Blokuje indeksowanie
    follow: false, // Blokuje podążanie za linkami
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true, // Blokuje indeksowanie obrazów (np. zdjęcia z ePassport)
    },
  },
  // manifest: '/manifest.json', // Web App Manifest dla bezpiecznej instalacji jako PWA
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png', // Ikona dla urządzeń Apple
  // },
  applicationName: 'Aplikacja Obywatelska',
  referrer: 'no-referrer', // Zapobiega przesyłaniu informacji o refererze (większa prywatność)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </AuthProvider>
        <Toaster richColors position="top-center"/>
      </body>
    </html>
  );
}
