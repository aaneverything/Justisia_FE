import { useEffect, useState } from 'react';
import { Scale, Moon, Sun, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onNewChat?: () => void;
}

const Header = ({ onNewChat }: HeaderProps) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Scale className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-medium">Justisia</h2>
          <p className="text-xs text-muted-foreground">teman pro bono kamu</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onNewChat && (
          <Button
            variant="outline"
            size="sm"
            onClick={onNewChat}
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Chat Baru</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="rounded-full"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;