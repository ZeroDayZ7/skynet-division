import localFont from 'next/font/local';

export const inter = localFont({
  src: [
    {
      path: '../public/fonts/inter/InterVariable.woff2',
      weight: '100 900', // variable font obsługuje cały zakres
      style: 'normal',
    },
    // {
    //   path: '../public/fonts/inter/Inter-Italic.woff2',
    //   weight: '100 900',
    //   style: 'italic',
    // },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: false
});
