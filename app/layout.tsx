import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SaudiPrice - KSA Offers, Flyers & Deals',
  description: 'Find the best offers, flyers, and deals in Saudi Arabia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Main layout wrapper */}
        {children}
      </body>
    </html>
  );
}