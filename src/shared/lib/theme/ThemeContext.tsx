import {FC, createContext, ReactNode, useContext, useState, useEffect} from "react"
import { Theme, ThemeContextProps } from './types';

const DEFAULT_THEME: Theme = 'light';

const getStoredTheme = (): Theme => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || saved === 'light' ? (saved as Theme) : DEFAULT_THEME;
};

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(getStoredTheme());

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Error in ThemeProvider');
  }
  return context;
};