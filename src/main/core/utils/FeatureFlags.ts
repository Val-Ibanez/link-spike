import { configManager } from '../ConfigManager';
import { TenantConfig } from '../types/tenant';

export class FeatureFlags {
  private static instance: FeatureFlags;
  
  private constructor() {}
  
  public static getInstance(): FeatureFlags {
    if (!FeatureFlags.instance) {
      FeatureFlags.instance = new FeatureFlags();
    }
    return FeatureFlags.instance;
  }
  
  public isEnabled(feature: keyof TenantConfig['features']): boolean {
    return configManager.isFeatureEnabled(feature);
  }
  
  // Métodos específicos para features comunes
  public isCashAdvanceEnabled(): boolean {
    return this.isEnabled('cashAdvance');
  }
  
  public isQrPaymentsEnabled(): boolean {
    return this.isEnabled('qrPayments');
  }
  
  public isContactlessPaymentsEnabled(): boolean {
    return this.isEnabled('contactlessPayments');
  }
  
  public isInstallmentsEnabled(): boolean {
    return this.isEnabled('installments');
  }
  
  public isReportsEnabled(): boolean {
    return this.isEnabled('reports');
  }
  
  public isMultiCurrencyEnabled(): boolean {
    return this.isEnabled('multiCurrency');
  }
  
  public isOfflineModeEnabled(): boolean {
    return this.isEnabled('offlineMode');
  }
  
  // Método para obtener todas las features habilitadas
  public getEnabledFeatures(): string[] {
    const tenantConfig = configManager.getCurrentTenant();
    return Object.entries(tenantConfig.features)
      .filter(([_, enabled]) => enabled === true)
      .map(([feature, _]) => feature);
  }
  
  // Método para debugging - listar todas las features y su estado
  public getAllFeatures(): Record<string, boolean> {
    const features = configManager.getCurrentTenant().features;
    const booleanFeatures = Object.entries(features)
      .filter(([_, value]) => typeof value === 'boolean')
      .map(([key, value]) => [key, value as boolean]);
    return Object.fromEntries(booleanFeatures);
  }

  // 🎨 Dashboard Feature Flags
  public getDashboardVariant(): 'modern' | 'classic' | 'santacruz' | 'minimal' {
    const features = configManager.getCurrentTenant().features;
    return (features as any).dashboardVariant || 'modern';
  }

  public shouldShowQuickActions(): boolean {
    return this.isEnabled('showQuickActions' as any);
  }

  public shouldShowTransactionHistory(): boolean {
    return this.isEnabled('showTransactionHistory' as any);
  }

  public shouldShowAccountBalance(): boolean {
    return this.isEnabled('showAccountBalance' as any);
  }

  public isCompactView(): boolean {
    return this.isEnabled('compactView' as any);
  }
}

export const featureFlags = FeatureFlags.getInstance();