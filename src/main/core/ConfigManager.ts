import { TenantConfig, Environment } from './types/tenant';
import Config from 'react-native-config';
import { getCurrentFlavorConfig, getFlavorConfig } from './FlavorConfig';

// Configuración por defecto como fallback
const defaultFlavor: TenantConfig = {
    id: 'default',
    name: 'default',
    displayName: 'Default Bank',
    theme: {
      primary: '#0066CC',
      secondary: '#004499',
      accent: '#FF6B35',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#212529',
      textSecondary: '#6C757D',
      error: '#DC3545',
      warning: '#FFC107',
      success: '#28A745',
    },
    logo: {
      main: 'assets/images/logo-main.png',
      white: 'assets/images/logo-white.png',
      dark: 'assets/images/logo-dark.png',
    },
    api: {
      baseUrl: 'https://api.default.com',
      version: 'v1',
      timeout: 30000,
    },
    features: {
      cashAdvance: true,
      qrPayments: true,
      contactlessPayments: true,
      installments: true,
      reports: true,
      multiCurrency: false,
      offlineMode: true,
    },
    payment: {
      supportedCards: ['VISA', 'MASTERCARD'],
      maxAmount: 50000,
      minAmount: 100,
      currencies: ['USD'],
      defaultCurrency: 'USD',
    },
    support: {
      email: 'support@default.com',
      phone: '+1 234 567 8900',
      website: 'https://www.default.com',
    },
  };

// Configuraciones específicas para cada flavor
const flavorConfigs: Record<string, TenantConfig> = {
  bancoEntreRios: {
    id: 'banco-entre-rios',
    name: 'bancoEntreRios',
    displayName: 'Banco Entre Ríos',
    theme: {
      primary: '#8B0000',      // Rojo oscuro
      secondary: '#B22222',    // Rojo medio
      accent: '#DC143C',       // Rojo carmesí
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
      error: '#DC2626',
      warning: '#F59E0B',
      success: '#059669',
    },
    logo: {
      main: 'assets/images/logo-banco-entrerios.svg',
      white: 'assets/images/logo-banco-entrerios.svg',
      dark: 'assets/images/logo-banco-entrerios.svg',
    },
    api: {
      baseUrl: 'https://api.bancoentrerios.com',
      version: 'v2',
      timeout: 30000,
    },
    features: {
      cashAdvance: true,
      qrPayments: true,
      contactlessPayments: true,
      installments: true,
      reports: true,
      multiCurrency: false,
      offlineMode: true,
    },
    payment: {
      supportedCards: ['VISA', 'MASTERCARD'],
      maxAmount: 50000,
      minAmount: 100,
      currencies: ['ARS'],
      defaultCurrency: 'ARS',
    },
    support: {
      email: 'soporte@bancoentrerios.com',
      phone: '+54 11 4000-0000',
      website: 'https://www.bancoentrerios.com',
    },
  },
  bancoSantaCruz: {
    id: 'banco-santa-cruz',
    name: 'bancoSantaCruz',
    displayName: 'Banco Santa Cruz',
    theme: {
      primary: '#0F4C75',
      secondary: '#3282B8',
      accent: '#BBE1FA',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#1E293B',
      textSecondary: '#64748B',
      error: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981',
    },
    logo: {
      main: 'assets/images/logo-banco-santacruz.svg',
      white: 'assets/images/logo-banco-santacruz.svg',
      dark: 'assets/images/logo-banco-santacruz.svg',
    },
    api: {
      baseUrl: 'https://api.bancosantacruz.com',
      version: 'v2',
      timeout: 30000,
    },
    features: {
      cashAdvance: true,
      qrPayments: true,
      contactlessPayments: true,
      installments: true,
      reports: true,
      multiCurrency: false,
      offlineMode: true,
    },
    payment: {
      supportedCards: ['VISA', 'MASTERCARD'],
      maxAmount: 50000,
      minAmount: 100,
      currencies: ['ARS'],
      defaultCurrency: 'ARS',
    },
    support: {
      email: 'soporte@bancosantacruz.com',
      phone: '+54 11 4000-0001',
      website: 'https://www.bancosantacruz.com',
    },
  },
  bancoSantaFe: {
    id: 'banco-santa-fe',
    name: 'bancoSantaFe',
    displayName: 'Banco Santa Fe',
    theme: {
      primary: '#1E40AF',
      secondary: '#3B82F6',
      accent: '#60A5FA',
      background: '#F1F5F9',
      surface: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#475569',
      error: '#DC2626',
      warning: '#F59E0B',
      success: '#059669',
    },
    logo: {
      main: 'assets/images/logo-banco-santafe.svg',
      white: 'assets/images/logo-banco-santafe.svg',
      dark: 'assets/images/logo-banco-santafe.svg',
    },
    api: {
      baseUrl: 'https://api.bancosantafe.com',
      version: 'v2',
      timeout: 30000,
    },
    features: {
      cashAdvance: true,
      qrPayments: true,
      contactlessPayments: true,
      installments: true,
      reports: true,
      multiCurrency: false,
      offlineMode: true,
    },
    payment: {
      supportedCards: ['VISA', 'MASTERCARD'],
      maxAmount: 50000,
      minAmount: 100,
      currencies: ['ARS'],
      defaultCurrency: 'ARS',
    },
    support: {
      email: 'soporte@bancosantafe.com',
      phone: '+54 11 4000-0002',
      website: 'https://www.bancosantafe.com',
    },
  },
};

// Función para obtener configuración actual basada en react-native-config
const getCurrentFlavorConfigFromEnv = (): TenantConfig => {
  const flavor = Config.FLAVOR || 'bancoEntreRios';
  console.log('🔍 FLAVOR desde react-native-config:', flavor);
  console.log('🔍 Config.FLAVOR raw:', Config.FLAVOR);
  console.log('🔍 Config keys disponibles:', Object.keys(Config));
  
  // Retornar la configuración específica del flavor si existe
  if (flavorConfigs[flavor]) {
    console.log('✅ Usando configuración para flavor:', flavor);
    console.log('✅ Tema del flavor:', flavorConfigs[flavor].theme.primary);
    return flavorConfigs[flavor];
  }
  
  // Fallback a la configuración por defecto
  console.log('⚠️ Flavor no encontrado, usando configuración por defecto');
  return defaultFlavor;
};

const environment: Environment = {
  name: 'development' as Environment['name'],
  debug: true,
  analytics: false,
  crashReporting: false,
};

export class ConfigManager {
  private static instance: ConfigManager;
  
  private constructor() {}
  
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
  
  public getTenantConfig(): TenantConfig {
    return getCurrentFlavorConfigFromEnv();
  }
  
  public getCurrentTenant(): TenantConfig {
    return getCurrentFlavorConfigFromEnv();
  }
  
  public getEnvironment(): Environment {
    return environment;
  }
  
  public getCurrentEnvironment(): Environment {
    return environment;
  }
  
  // Métodos de conveniencia
  public getTheme() {
    return getCurrentFlavorConfigFromEnv().theme;
  }
  
  public getApiBaseUrl(): string {
    return getCurrentFlavorConfigFromEnv().api.baseUrl;
  }
  
  public isFeatureEnabled(feature: keyof TenantConfig['features']): boolean {
    const features = getCurrentFlavorConfigFromEnv().features;
    return features[feature] === true;
  }
  
  public getSupportInfo() {
    return getCurrentFlavorConfigFromEnv().support;
  }
  
  public getPaymentConfig() {
    return getCurrentFlavorConfigFromEnv().payment;
  }
  
  public getAppInfo() {
    const config = getCurrentFlavorConfigFromEnv();
    return {
      id: config.id,
      name: config.name,
      displayName: config.displayName,
      flavor: Config.FLAVOR || 'bancoEntreRios',
      environment: environment.name,
      bundleId: Config.BUNDLE_ID || 'com.myreactnativeapp',
      version: this.getVersionInfo(),
    };
  }

  public getVersionInfo() {
    return {
      versionName: Config.VERSION_NAME || '1.0.0',
      versionCode: Config.VERSION_CODE || '1',
      buildNumber: Config.BUILD_NUMBER || '1', 
      releaseStage: Config.RELEASE_STAGE || 'dev',
      fullVersion: `${Config.VERSION_NAME || '1.0.0'} (${Config.BUILD_NUMBER || '1'})`,
      isProduction: Config.RELEASE_STAGE === 'prod',
      isDevelopment: Config.RELEASE_STAGE === 'dev',
    };
  }
  
  public getAvailableFlavors(): string[] {
    return ['bancoEntreRios', 'bancoSantaCruz', 'bancoSantaFe'];
  }
}

export const configManager = ConfigManager.getInstance();