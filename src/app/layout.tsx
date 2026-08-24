import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from './components/header/Navbar';
import { Footer } from './components/footer/Footer';

export const metadata: Metadata = {
  title: 'Kemal Oto | Otomotiv Yedek Parça & Aksesuar',
  description: 'Binek ve ticari araçlar için %100 uyumlu orijinal yedek parça, motor yağları, fren diskleri ve oto aksesuarları. Hızlı kargo, şase no ile arama ve güvenli alışveriş.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-orange-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
