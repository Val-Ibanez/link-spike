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
  let tenantConfig: TenantConfig;

  try {
    tenantConfig = configManager.getCurrentTenant();
    console.log(`✅ ThemeProvider: Usando flavor '${tenantConfig.displayName}'`);
  } catch (error) {
    console.error('❌ Error al obtener configuración del tenant:', error);

    // Fallback: primero Santa Cruz, después Entre Ríos
    tenantConfig =
      configManager.getFlavorConfig('bancoSantaCruz') ||
      configManager.getFlavorConfig('bancoEntreRios')!;

    console.log(`⚠️ Usando configuración por defecto: ${tenantConfig.displayName}`);
  }

  const contextValue: ThemeContextType = {
    theme: tenantConfig.theme,
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
