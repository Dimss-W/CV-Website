import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dimas Wijanarko | Personal CV & Portfolio',
  description: 'Website CV & Portofolio Personal Dimas Wijanarko - Full Stack Web Developer & Software Engineer dibangun dengan Next.js, React, dan Supabase.',
  keywords: ['Dimas Wijanarko', 'CV Personal', 'Full Stack Developer', 'Next.js', 'React', 'Supabase', 'Portfolio'],
  authors: [{ name: 'Dimas Wijanarko' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Syne:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
