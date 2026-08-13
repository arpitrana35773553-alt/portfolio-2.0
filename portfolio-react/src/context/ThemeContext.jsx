import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('fr-theme') === 'light';
  });

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    localStorage.setItem('fr-theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  const toggleTheme = () => setIsLight(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
