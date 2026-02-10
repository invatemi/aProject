import { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; 
import { ThemeContextProps } from "./types";

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Wrap your component tree with <ThemeProvider>.'
    );
  }
  
  return context;
};