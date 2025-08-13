import React, { createContext, useContext, ReactNode } from 'react';
import { configManager } from '../ConfigManager';
import { TenantConfig } from '../types/tenant';

interface ThemeContextType {
  theme: TenantConfig['theme'];
  tenantConfig: TenantConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const tenantConfig = configManager.getCurrentTenant();
  const theme = tenantConfig.theme;

  const contextValue: ThemeContextType = {
    theme,
    tenantConfig,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    // En lugar de lanzar error, usar configuración por defecto
    const defaultConfig = configManager.getCurrentTenant();
    return {
      theme: defaultConfig.theme,
      tenantConfig: defaultConfig,
    };
  }
  return context;
};

// Hook para acceso rápido solo al tema
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme;
};