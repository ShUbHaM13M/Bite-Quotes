import React, { useState, useEffect, useContext, ReactNode } from 'react';

import { getThemeFromStorage, saveThemeToStorage } from '../utils/useStorage';

const ThemeContext = React.createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

interface Props {
  children: ReactNode;
}

type Theme = 'light' | 'dark'

export default function ThemeProvider({ children }: Props) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  useEffect(() => {
    getThemeFromStorage()
      .then(data => {
        if (data)
          setCurrentTheme(data)
      })
  }, []);

  useEffect(() => {
    saveThemeToStorage(currentTheme);
  }, [currentTheme]);

  const value = {
    currentTheme,
    setCurrentTheme,
  };
  return (
    <ThemeContext.Provider value={value} >
      {children}
    </ThemeContext.Provider>
  );
}
