export interface TenantConfig {
  // Solo displayName es necesario ya que id y name son redundantes con la key del objeto
  displayName: string;
  
  // Branding
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
  
  // Assets
  logo: {
    main: string;
    white: string;
    dark: string;
  };
  
  // API Configuration
  api: {
    baseUrl: string;
    version: string;
    timeout: number;
  };
  
  // Features
  features: {
    cashAdvance: boolean;
    qrPayments: boolean;
    contactlessPayments: boolean;
    installments: boolean;
    reports: boolean;
    multiCurrency: boolean;
    offlineMode: boolean;
    // 🎨 Dashboard Features
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
  
  // Payment Configuration
  payment: {
    supportedCards: string[];
    maxAmount: number;
    minAmount: number;
    currencies: string[];
    defaultCurrency: string;
  };
  
  // Contact & Support
  support: {
    email: string;
    phone: string;
    website: string;
  };
}

export interface Environment {
  name: 'development' | 'staging' | 'production';
  debug: boolean;
  analytics: boolean;
  crashReporting: boolean;
}