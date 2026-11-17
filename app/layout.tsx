import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AMNA AZAM - Pakistani Eastern Wear & Bridal Couture',
  description: 'Discover luxury Pakistani eastern wear, pret collections, formal wear and exquisite bridal couture at AMNA AZAM. Premium craftsmanship and timeless elegance.',
  keywords: ['Pakistani fashion', 'Eastern wear', 'Bridal couture', 'Luxury pret', 'Formal wear'],
  authors: [{ name: 'AMNA AZAM' }],
  viewport: 'width=device-width, initial-scale=1',
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
      <body>{children}</body>
    </html>
  );
}
