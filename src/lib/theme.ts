export type Theme = 'dark' | 'light';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem('dimas_portfolio_theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to dark as primary developer portfolio aesthetic
    return 'dark';
  } catch {
    return 'dark';
  }
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  }
  try {
    localStorage.setItem('dimas_portfolio_theme', theme);
  } catch {
    // Ignore storage quota / private mode errors
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}
