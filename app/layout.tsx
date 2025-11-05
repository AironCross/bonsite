import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { SEOSchema } from '@/components/SEOSchema';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'B OnSite - Digitális Működésmenedzsment',
  description: 'Automatizálj, spórolj időt, és lásd át a működést egyetlen rendszerben. Komplex működésmenedzsment megoldás vállalkozásoknak.',
  keywords: 'működésmenedzsment, HR rendszer, digitalizáció, beléptető rendszer, munkavédelem',
  openGraph: {
    title: 'B OnSite - Digitális Működésmenedzsment',
    description: 'Automatizálj, spórolj időt, és lásd át a működést egyetlen rendszerben.',
    type: 'website',
    locale: 'hu_HU',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <head>
        <SEOSchema />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
