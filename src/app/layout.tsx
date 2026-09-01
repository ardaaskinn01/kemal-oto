import type { Metadata } from 'next';
import { Figtree, Outfit } from 'next/font/google';
import './globals.css';
import { Navbar } from './components/header/Navbar';
import { Footer } from './components/footer/Footer';
import { MobileBottomBar } from './components/header/MobileBottomBar';
import { GarageProvider } from './contexts/GarageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ShippingSettingsProvider } from './contexts/ShippingSettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { CartProvider } from './contexts/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { GarageModal } from './components/garage/GarageModal';

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800'],
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.onlinehizliparca.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Online Hızlı Parça | Opel, Peugeot, Citroën, Chevrolet, DS Yedek Parça',
    template: '%s | Online Hızlı Parça',
  },
  description: 'Opel, Peugeot, Citroën, Chevrolet ve DS grubu araçlar için %100 uyumlu orijinal ve muadil yedek parçalar. Hızlı DHL kargo, 17 haneli şasi no ile doğrulama ve güvenli alışveriş.',
  keywords: [
    'online yedek parça',
    'opel yedek parça',
    'peugeot yedek parça',
    'citroen yedek parça',
    'chevrolet yedek parça',
    'ds yedek parça',
    'şasi numarası ile parça sorgulama',
    'orijinal oem yedek parça',
    'periyodik bakım seti'
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Online Hızlı Parça | Otomotiv Yedek Parça & Aksesuar',
    description: 'Opel, Peugeot, Citroën, Chevrolet ve DS grubu araçlar için %100 uyumlu orijinal OEM ve muadil parçalar.',
    url: baseUrl,
    siteName: 'Online Hızlı Parça',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Online Hızlı Parça Güvencesiyle Otomotiv Yedek Parça',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Hızlı Parça | Otomotiv Yedek Parça',
    description: 'Opel, Peugeot, Citroën, Chevrolet ve DS grubu için şasi uyum garantili yedek parça.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org AutoPartsStore & Organization JSON-LD
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    name: 'Online Hızlı Parça (Kemal Oto)',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Opel, Peugeot, Citroën, Chevrolet ve DS grubu otomotiv yedek parçaları e-ticaret platformu.',
    telephone: '+905422924492',
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'MUTLUBAŞLAR PLAZA, KEMALPAŞA CAD. 5.SANAYİ SİTESİ NO:344B',
      addressLocality: 'Bornova',
      addressRegion: 'İzmir',
      addressCountry: 'TR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:30',
      closes: '18:30',
    },
  };

  return (
    <html lang="tr" suppressHydrationWarning className={`dark ${figtree.variable} ${outfit.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('kemal_oto_theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (storedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
        <body className="min-h-screen flex flex-col bg-[#f7f8fa] dark:bg-[#0d0f12] text-slate-900 dark:text-slate-100 antialiased selection:bg-[#E8820C]/20 selection:text-[#E8820C]" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <ShippingSettingsProvider>
              <GarageProvider>
                <CartProvider>
                  <Navbar />
                  <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16 md:pb-0">{children}</main>
                  <Footer />
                  <MobileBottomBar />
                  <CartDrawer />
                  <GarageModal />
                </CartProvider>
              </GarageProvider>
            </ShippingSettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
