/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#07090e',
          surface: '#0d111a',
          card: 'rgba(15, 22, 36, 0.7)',
          hover: 'rgba(24, 34, 56, 0.85)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          primary: '#6366f1', // Indigo
          secondary: '#38bdf8', // Sky
          neon: '#00F5A0', // Bedimcode Vibrant Neon / Emerald Accent
          cyan: '#06b6d4',
          muted: '#94a3b8', // Slate muted
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        syne: ['Plus Jakarta Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'glow-sky': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'glow-neon': '0 0 25px -5px rgba(0, 245, 160, 0.35)',
      },
    },
  },
  plugins: [],
};
