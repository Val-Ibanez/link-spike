import React, { createContext, useContext, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { useCurrentTenant } from '../../stores';
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
  const currentTenant = useCurrentTenant();

  // ✅ SOLO ESPERAR A QUE EL TENANT ESTÉ DISPONIBLE
  // NO inicializar nada aquí, eso lo hace AppInitializer
  
  if (!currentTenant) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Esperando inicialización de la aplicación...</Text>
      </View>
    );
  }

  const contextValue: ThemeContextType = {
    theme: currentTenant.theme,
    tenantConfig: currentTenant,
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
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};

// Hook para acceso rápido solo al tema
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme;
};