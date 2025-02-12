import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Whiz Academy',
  description:
    'Whiz Academy: Empowering Rural Communities Through Digital Literacy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}
