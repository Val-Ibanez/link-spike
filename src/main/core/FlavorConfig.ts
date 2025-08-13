import { Platform } from 'react-native';

// 🏦 Configuración de Flavors - Arquitectura Estándar de React Native

export interface FlavorConfig {
  id: string;
  name: string;
  displayName: string;
  bundleId: {
    android: string;
    ios: string;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
    warning: string;
    success: string;
  };
  features: {
    qrPayments: boolean;
    contactlessPayments: boolean;
    installments: boolean;
    multiCurrency: boolean;
    investment: boolean;
    offlineMode: boolean;
    dashboardVariant: 'standard' | 'compact' | 'extended';
  };
  api: {
    baseUrl: string;
    version: string;
    timeout: number;
  };
  support: {
    email: string;
    phone: string;
    website: string;
    chat: boolean;
    whatsapp?: string;
  };
  assets: {
    logo: string;
    icon: string;
    splash: string;
  };
}

// Función para obtener la configuración del flavor actual
export function getCurrentFlavorConfig(): FlavorConfig {
  // En un proyecto real, esto se determinaría por build variant
  // Por ahora, retornamos una configuración por defecto
  return {
    id: 'banco-entre-rios',
    name: 'bancoEntreRios',
    displayName: 'Banco Entre Ríos',
    bundleId: {
      android: 'com.myreactnativeapp.bancoentrerios',
      ios: 'com.myreactnativeapp.bancoentrerios',
    },
    theme: {
      primary: '#1B365D',
      secondary: '#2E5984',
      accent: '#F59E0B',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
      error: '#DC2626',
      warning: '#F59E0B',
      success: '#059669',
    },
    features: {
      qrPayments: true,
      contactlessPayments: true,
      installments: true,
      multiCurrency: false,
      investment: false,
      offlineMode: true,
      dashboardVariant: 'standard',
    },
    api: {
      baseUrl: 'https://api.bancoentrerios.com',
      version: 'v2',
      timeout: 30000,
    },
    support: {
      email: 'soporte@bancoentrerios.com',
      phone: '+54 11 4000-0000',
      website: 'https://www.bancoentrerios.com',
      chat: true,
      whatsapp: '+54 9 11 1234-5678',
    },
    assets: {
      logo: 'flavors/bancoEntreRios/assets/images/logo-banco-entrerios.svg',
      icon: 'flavors/bancoEntreRios/assets/icons/app-icon.png',
      splash: 'flavors/bancoEntreRios/assets/images/splash-screen.png',
    },
  };
}

// Función para obtener configuración de un flavor específico
export async function getFlavorConfig(flavorName: string): Promise<FlavorConfig | null> {
  try {
    // En un proyecto real, esto leería desde flavors/[flavorName]/config/flavor.json
    // Por ahora retornamos null para evitar errores de importación
    return null;
  } catch (error) {
    console.warn(`No se pudo cargar la configuración del flavor: ${flavorName}`, error);
    return null;
  }
}

// Función para obtener todos los flavors disponibles
export function getAvailableFlavors(): string[] {
  return ['bancoEntreRios', 'bancoSantaCruz', 'bancoSantaFe'];
}

// Función para verificar si una feature está habilitada
export function isFeatureEnabled(featureName: keyof FlavorConfig['features']): boolean {
  const config = getCurrentFlavorConfig();
  return Boolean(config.features[featureName]);
}

// Función para obtener el tema actual
export function getCurrentTheme() {
  const config = getCurrentFlavorConfig();
  return config.theme;
}

// Función para obtener la configuración de API
export function getApiConfig() {
  const config = getCurrentFlavorConfig();
  return config.api;
}

// Función para obtener el bundle ID actual
export function getCurrentBundleId(): string {
  const config = getCurrentFlavorConfig();
  return Platform.select({
    android: config.bundleId.android,
    ios: config.bundleId.ios,
  }) || config.bundleId.android;
}

export default getCurrentFlavorConfig;

