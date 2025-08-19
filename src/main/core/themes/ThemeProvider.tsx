import React, { createContext, useContext, ReactNode } from 'react';
import { View, Text } from 'react-native';
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
  const [tenantConfig, setTenantConfig] = React.useState<TenantConfig | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTenantConfig = () => {
      try {
        const config = configManager.getCurrentTenant();
        console.log(`✅ ThemeProvider: Usando flavor '${config.displayName}'`);
        setTenantConfig(config);
      } catch (error) {
        console.error('❌ Error al obtener configuración del tenant:', error);

        // Fallback: usar el primer flavor disponible dinámicamente
        const allFlavors = ['bancoSantaCruz', 'bancoSantaFe', 'bancoEntreRios'];
        const fallbackConfig = allFlavors.map(f => configManager.getFlavorConfig(f)).find(Boolean)!;

        console.log(`⚠️ Usando configuración por defecto: ${fallbackConfig.displayName}`);
        setTenantConfig(fallbackConfig);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenantConfig();
  }, []);



  if (isLoading || !tenantConfig) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando configuración del tema...</Text>
      </View>
    );
  }

  const contextValue: ThemeContextType = {
    theme: tenantConfig.theme,
    tenantConfig: tenantConfig,
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
    // Fallback sincrónico si no hay contexto - usar el primer flavor disponible
    const allFlavors = ['bancoSantaCruz', 'bancoSantaFe', 'bancoEntreRios'];
    const fallbackConfig = allFlavors.map(f => configManager.getFlavorConfig(f)).find(Boolean)!;
    
    console.warn('⚠️ useTheme() llamado fuera del ThemeProvider - usando fallback:', fallbackConfig.displayName);
    return {
      theme: fallbackConfig.theme,
      tenantConfig: fallbackConfig,
    };
  }
  return context;
};

// Hook para acceso rápido solo al tema
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme;
};
