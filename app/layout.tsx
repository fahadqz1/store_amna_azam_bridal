import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AMNA AZAM - Pakistani Eastern Wear & Bridal Couture',
  description: 'Discover luxury Pakistani eastern wear, pret collections, formal wear and exquisite bridal couture at AMNA AZAM. Premium craftsmanship and timeless elegance.',
  keywords: ['Pakistani fashion', 'Eastern wear', 'Bridal couture', 'Luxury pret', 'Formal wear'],
  authors: [{ name: 'AMNA AZAM' }],
  openGraph: {
    title: 'AMNA AZAM - Pakistani Eastern Wear & Bridal Couture',
    description: 'Luxury Pakistani fashion for every occasion',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
