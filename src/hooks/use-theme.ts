
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const rootEl = document.documentElement;
    const currentTheme = rootEl.getAttribute('data-theme') as 'light' | 'dark';
    setTheme(currentTheme);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = rootEl.getAttribute('data-theme') as 'light' | 'dark';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(rootEl, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return { theme };
}
