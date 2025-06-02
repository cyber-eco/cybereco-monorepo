import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createThemeScript, themeTransitionCSS } from '@cybereco/ui-components';
import './globals.css';
import '../styles/theme-variables.css';
import { Providers } from '../components/Providers';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CyberEco Hub',
  description: 'Your gateway to the CyberEco digital ecosystem',
  icons: {
    icon: '/images/favicon.svg',
    shortcut: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeTransitionCSS }} />
        <script dangerouslySetInnerHTML={{ __html: createThemeScript() }} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}