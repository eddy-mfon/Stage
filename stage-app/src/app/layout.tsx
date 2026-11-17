import type { Metadata } from 'next';
import { Fraunces, Bricolage_Grotesque, Pinyon_Script } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ui',
});

const pinyon = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: 'STAGE — Discover a Person, Not Just a Product',
  description: 'Stage is a social-commerce theatre where independent creators and performers take the spotlight. Explore personalized feeds, interactive drops, and direct maker commerce.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${bricolage.variable} ${pinyon.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--page)] text-[var(--page-ink)]">
        {children}
      </body>
    </html>
  );
}
