import React, { useState, useEffect, useContext, ReactNode } from 'react';
import theme from '../global/theme';

import { setToStorage, getFromStorage } from '../utils/useStorage';

const ThemeContext = React.createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const [currentTheme, setCurrentTheme] = useState<undefined | Object | null>(theme.light);

  useEffect(() => {
    getFromStorage('currentTheme', 'Object')
      .then(data => {
        if (data !== null || data !== undefined)
          setCurrentTheme(data);
      })
  }, []);

  useEffect(() => {
    setToStorage('currentTheme', currentTheme);
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
