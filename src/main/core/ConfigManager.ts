import Config from 'react-native-config';
import { getFlavorConfig } from './FlavorConfig';
import { TenantConfig } from './types/tenant';

class ConfigManager {
  private currentTenant: TenantConfig | null = null;

  getCurrentTenant(): TenantConfig {
    if (this.currentTenant) return this.currentTenant;

    // Tomamos el flavor de las env vars
    const flavor = Config.FLAVOR;
    
    if (!flavor) {
      console.error('❌ Config.FLAVOR es undefined - react-native-config no está funcionando');
      throw new Error('FLAVOR no configurado - verificar react-native-config y BuildConfig.java');
    }

    console.log(`🔍 Config.FLAVOR detectado: ${flavor}`);

    const tenantConfig = getFlavorConfig(flavor);
    if (!tenantConfig) {
      throw new Error(`No se encontró configuración para flavor: ${flavor}`);
    }

    this.currentTenant = tenantConfig;
    return tenantConfig;
  }

  getFlavorConfig(flavorName: string): TenantConfig | null {
    return getFlavorConfig(flavorName);
  }

  getAppInfo() {
    const config = this.getCurrentTenant();
    return {
      displayName: config.displayName,
      flavor: Config.FLAVOR || 'NO_DETECTADO',
      bundleId: Config.BUNDLE_ID || 'com.myreactnativeapp',
      version: Config.VERSION_NAME || '1.0.0',
      buildNumber: Config.BUILD_NUMBER || '1',
      apiBaseUrl: config.api.baseUrl,
      theme: config.theme,
    };
  }

  // Métodos de conveniencia para acceder a configuraciones específicas
  getTheme() {
    return this.getCurrentTenant().theme;
  }
  
  getApiBaseUrl(): string {
    return this.getCurrentTenant().api.baseUrl;
  }
  
  isFeatureEnabled(feature: keyof TenantConfig['features']): boolean {
    const features = this.getCurrentTenant().features;
    return features?.[feature] === true;
  }
  
  getSupportInfo() {
    return this.getCurrentTenant().support;
  }
  
  getPaymentConfig() {
    return this.getCurrentTenant().payment;
  }

  getVersionInfo() {
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
}

export const configManager = new ConfigManager();
