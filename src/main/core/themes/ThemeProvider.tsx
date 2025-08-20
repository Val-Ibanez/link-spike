import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useFlavorStore, useCurrentConfig } from '../../stores';

interface ThemeContextType {
  theme: any;
  tenantConfig: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Usar Zustand para el estado del flavor
  const { currentFlavor, setFlavor, refreshConfig } = useFlavorStore();
  const currentConfig = useCurrentConfig();

  useEffect(() => {
    const initializeFlavor = async () => {
      try {
        // Si no hay flavor configurado, usar el por defecto
        if (!currentFlavor) {
          await setFlavor('bancoSantaCruz');
        } else {
          // Refrescar configuración del flavor actual
          await refreshConfig();
        }
      } catch (error) {
        console.error('❌ Error al inicializar flavor:', error);
      }
    };

    initializeFlavor();
  }, [currentFlavor, setFlavor, refreshConfig]);

  if (!currentConfig) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando configuración del tema...</Text>
      </View>
    );
  }

  const contextValue: ThemeContextType = {
    theme: currentConfig.theme,
    tenantConfig: currentConfig,
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
    // Fallback usando Zustand directamente
    const currentConfig = useCurrentConfig();
    if (!currentConfig) {
      throw new Error('useTheme debe ser usado dentro de ThemeProvider');
    }
    
    return {
      theme: currentConfig.theme,
      tenantConfig: currentConfig,
    };
  }
  return context;
};

// Hook para acceso rápido solo al tema
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme;
};
