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
    <html lang="id" className="dark" data-theme="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.9.0/fonts/remixicon.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('dimas_portfolio_theme');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
