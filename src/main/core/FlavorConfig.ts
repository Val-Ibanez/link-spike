import { Platform } from 'react-native';
import Config from 'react-native-config';
import { TenantConfig } from './types/tenant';

// 🏦 Configuración de Flavors - Arquitectura Estándar de React Native

export interface FlavorConfig {
  displayName: string;
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
  logo: {
    main: string;
    white: string;
    dark: string;
  };
  features: {
    cashAdvance: boolean;
    qrPayments: boolean;
    contactlessPayments: boolean;
    installments: boolean;
    reports: boolean;
    multiCurrency: boolean;
    offlineMode: boolean;
    dashboardVariant?: 'modern' | 'classic' | 'santacruz' | 'minimal';
    showQuickActions?: boolean;
    showTransactionHistory?: boolean;
    showAccountBalance?: boolean;
    compactView?: boolean;
    showPromotions?: boolean;
    showSecurityAlerts?: boolean;
    showProductCategories?: boolean;
    heroSection?: boolean;
  };
  api: {
    baseUrl: string;
    version: string;
    timeout: number;
  };
  payment: {
    supportedCards: string[];
    maxAmount: number;
    minAmount: number;
    currencies: string[];
    defaultCurrency: string;
  };
  support: {
    email: string;
    phone: string;
    website: string;
  };
}

// Función para obtener la configuración del flavor actual

  // Configuraciones específicas para cada flavor
  export const flavorConfigs: Record<string, TenantConfig> = {
    bancoEntreRios: {
      displayName: 'Banco Entre Ríos',
      theme: {
        primary: '#bd1515',
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
      logo: {
        main: 'flavors/bancoEntreRios/assets/images/logo-banco-entrerios.svg',
        white: 'flavors/bancoEntreRios/assets/images/logo-banco-entrerios-white.svg',
        dark: 'flavors/bancoEntreRios/assets/images/logo-banco-entrerios-dark.svg',
      },
      features: {
        cashAdvance: true,
        qrPayments: true,
        contactlessPayments: true,
        installments: true,
        reports: true,
        multiCurrency: false,
        offlineMode: true,
        dashboardVariant: 'modern',
        showQuickActions: true,
        showTransactionHistory: true,
        showAccountBalance: true,
        compactView: false,
        showPromotions: true,
        showSecurityAlerts: true,
        showProductCategories: false,
        heroSection: true,
      },
      api: {
        baseUrl: 'https://api.bancoentrerios.com',
        version: 'v2',
        timeout: 30000,
      },
      payment: {
        supportedCards: ['Visa', 'Mastercard', 'American Express'],
        maxAmount: 1000000,
        minAmount: 100,
        currencies: ['ARS', 'USD'],
        defaultCurrency: 'ARS',
      },
      support: {
        email: 'soporte@bancoentrerios.com',
        phone: '+54 11 4000-0000',
        website: 'https://www.bancoentrerios.com',
      },
    },
    bancoSantaCruz: {
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
        main: 'flavors/bancoSantaCruz/assets/images/logo-banco-santacruz.svg',
        white: 'flavors/bancoSantaCruz/assets/images/logo-banco-santacruz-white.svg',
        dark: 'flavors/bancoSantaCruz/assets/images/logo-banco-santacruz-dark.svg',
      },
      features: {
        cashAdvance: true,
        qrPayments: true,
        contactlessPayments: true,
        installments: true,
        reports: true,
        multiCurrency: false,
        offlineMode: true,
        dashboardVariant: 'modern',
        showQuickActions: true,
        showTransactionHistory: true,
        showAccountBalance: true,
        compactView: false,
        showPromotions: true,
        showSecurityAlerts: true,
        showProductCategories: false,
        heroSection: true,
      },
      api: {
        baseUrl: 'https://api.bancosantacruz.com',
        version: 'v2',
        timeout: 30000,
      },
      payment: {
        supportedCards: ['Visa', 'Mastercard', 'American Express'],
        maxAmount: 1000000,
        minAmount: 100,
        currencies: ['ARS', 'USD'],
        defaultCurrency: 'ARS',
      },
      support: {
        email: 'soporte@bancosantacruz.com',
        phone: '+54 11 4000-0001',
        website: 'https://www.bancosantacruz.com',
      },
    },
    bancoSantaFe: {
      displayName: 'Banco Santa Fe',
      theme: {
        primary: '#8B0000',
        secondary: '#DC143C',
        accent: '#FFD700',
        background: '#FFF8DC',
        surface: '#FFFFFF',
        text: '#2F2F2F',
        textSecondary: '#696969',
        error: '#FF0000',
        warning: '#FFA500',
        success: '#32CD32',
      },
      logo: {
        main: 'flavors/bancoSantaFe/assets/images/logo-banco-santafe.svg',
        white: 'flavors/bancoSantaFe/assets/images/logo-banco-santafe-white.svg',
        dark: 'flavors/bancoSantaFe/assets/images/logo-banco-santafe-dark.svg',
      },
      features: {
        cashAdvance: true,
        qrPayments: true,
        contactlessPayments: true,
        installments: true,
        reports: true,
        multiCurrency: false,
        offlineMode: true,
        dashboardVariant: 'modern',
        showQuickActions: true,
        showTransactionHistory: true,
        showAccountBalance: true,
        compactView: false,
        showPromotions: true,
        showSecurityAlerts: true,
        showProductCategories: false,
        heroSection: true,
      },
      api: {
        baseUrl: 'https://api.bancosantafe.com',
        version: 'v2',
        timeout: 30000,
      },
      payment: {
        supportedCards: ['Visa', 'Mastercard', 'American Express'],
        maxAmount: 1000000,
        minAmount: 100,
        currencies: ['ARS', 'USD'],
        defaultCurrency: 'ARS',
      },
      support: {
        email: 'soporte@bancosantafe.com',
        phone: '+54 11 4000-0002',
        website: 'https://www.bancosantafe.com',
      },
    },
  };

  
// Devuelve la config de un flavor
export function getFlavorConfig(flavorName: string): TenantConfig | null {
  return flavorConfigs[flavorName] || null;
}