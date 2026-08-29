import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from './components/header/Navbar';
import { Footer } from './components/footer/Footer';
import { GarageProvider } from './contexts/GarageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ShippingSettingsProvider } from './contexts/ShippingSettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { CartProvider } from './contexts/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Kemal Oto | Otomotiv Yedek Parça & Aksesuar',
  description: 'Opel, Peugeot, Citroën, Chevrolet ve DS grubu araçlar için %100 uyumlu orijinal ve muadil yedek parçalar. Hızlı DHL kargo, şasi no ile arama ve güvenli alışveriş.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning className={`dark ${jakarta.variable}`}>
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
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <ShippingSettingsProvider>
              <GarageProvider>
                <CartProvider>
                  <Navbar />
                  <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
                  <Footer />
                  <CartDrawer />
                </CartProvider>
              </GarageProvider>
            </ShippingSettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
