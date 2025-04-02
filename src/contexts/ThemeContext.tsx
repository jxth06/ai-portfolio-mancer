
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export type ThemeColor = 'blue' | 'indigo' | 'purple' | 'pink' | 'red' | 'orange' | 'green';
export type ThemeMode = 'light' | 'dark' | 'system';
export type FontFamily = 'inter' | 'poppins' | 'roboto' | 'montserrat';

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  font: FontFamily;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  setFont: (font: FontFamily) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [color, setColor] = useState<ThemeColor>('blue');
  const [font, setFont] = useState<FontFamily>('inter');

  // Apply theme mode
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', mode === 'dark');
    }
  }, [mode]);

  // Apply theme color
  useEffect(() => {
    const root = window.document.documentElement;
    const colors: Record<ThemeColor, string> = {
      blue: '221.2 83% 53.9%',
      indigo: '244.5 75.3% 57.5%',
      purple: '262.1 83.3% 57.8%',
      pink: '330.4 81.2% 60.2%',
      red: '0 84.2% 60.2%',
      orange: '24.5 95% 53.1%',
      green: '142.1 76.2% 36.3%',
    };
    
    root.style.setProperty('--primary', colors[color]);
    toast.success(`Theme color changed to ${color}`);
  }, [color]);

  // Apply font family
  useEffect(() => {
    const root = window.document.documentElement;
    const fonts: Record<FontFamily, string> = {
      inter: 'Inter, sans-serif',
      poppins: 'Poppins, sans-serif',
      roboto: 'Roboto, sans-serif',
      montserrat: 'Montserrat, sans-serif',
    };
    
    root.style.setProperty('--font-sans', fonts[font]);
    toast.success(`Font changed to ${font}`);
  }, [font]);

  const value = {
    mode,
    color,
    font,
    setMode,
    setColor,
    setFont
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
