// app/layout.tsx
import type { Metadata } from 'next';
import { inter } from './fonts';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import './globals.css';





// const inter = Inter({
//   subsets: ['latin', 'latin-ext'],
//   variable: '--font-inter',
//   display: 'swap',
//   preload: false,
//   weight: ['400', '500', '600', '700'],
// });

export const metadata: Metadata = {
  title: 'Dark Army',
  description: 'Wolność nie jest darem, wolność jest prawem!',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  applicationName: 'Dark Army',
  referrer: 'no-referrer',
};



export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  console.log('[app] RootLayout renderowany');
  console.log(`[app] locale: ${locale}`);


  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthProvider>
          <Toaster richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
