import { FC, createContext, ReactNode, useState, useEffect, useCallback, useMemo } from "react";
import { Theme, ThemeContextProps } from './types';

const DEFAULT_THEME: Theme = 'light';

const getStoredTheme = (): Theme => {
  const saved = localStorage.getItem('theme');
  return (saved === 'dark' || saved === 'light') ? (saved as Theme) : DEFAULT_THEME;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};