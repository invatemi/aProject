import { FC } from 'react';
import { useTheme } from '@/shared';
import { Button } from '@/shared';

const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="md"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
};

export default ThemeSwitcher;