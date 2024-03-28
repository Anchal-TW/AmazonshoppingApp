import React, {createContext, useState, useContext, useEffect} from 'react';
import Storage from '../helper/Storage';

type ThemeType = {
  backgroundColor: string;
  textColor: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeType>({
  backgroundColor: '',
  textColor: '',
  isDarkMode: false,
  toggleTheme: function (): void {},
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({children}: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    async function getStoredDarkMode() {
      try {
        const storedDarkMode = await Storage.getItem('darkmode');
        if (storedDarkMode !== null) {
          setIsDarkMode(storedDarkMode === 'true');
        }
      } catch (error) {
        console.error('Error retrieving dark mode from storage:', error);
      }
    }
    getStoredDarkMode();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      Storage.setItem('darkmode', newMode.toString());
      return newMode;
    });
  };

  const theme = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    textColor: isDarkMode ? '#fff' : '#333',
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
