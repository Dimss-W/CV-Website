import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dimas Wijanarko | Portfolio Website',
  description:
    'Experienced Full Stack Web & Mobile Software Engineer offering high-quality digital and enterprise solutions. Discover my portfolio and work with me to turn your ideas into impactful results.',
  keywords: [
    'Dimas Wijanarko',
    'CV Personal',
    'Full Stack Developer',
    'Flutter Developer',
    'Laravel',
    'Power BI',
    'Portfolio',
  ],
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.9.0/fonts/remixicon.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
