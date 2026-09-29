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
      <body>{children}</body>
    </html>
  );
}
