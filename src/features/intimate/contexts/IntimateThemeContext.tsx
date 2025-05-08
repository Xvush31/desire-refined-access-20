
import React, { createContext, useContext, useState, useEffect } from 'react';

interface IntimateThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const IntimateThemeContext = createContext<IntimateThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
});

export const useIntimateTheme = () => {
  return useContext(IntimateThemeContext);
};

interface IntimateThemeProviderProps {
  children: React.ReactNode;
}

export const IntimateThemeProvider: React.FC<IntimateThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    // Apply Intimate specific classes to the body
    document.body.classList.add('intimate-theme');
    
    return () => {
      // Clean up when unmounting
      document.body.classList.remove('intimate-theme');
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <IntimateThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`intimate-theme ${isDark ? 'intimate-dark' : 'intimate-light'}`}>
        {children}
      </div>
    </IntimateThemeContext.Provider>
  );
};
