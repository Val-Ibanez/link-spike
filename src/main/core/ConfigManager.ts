import Config from 'react-native-config';
import { getFlavorConfig } from './FlavorConfig';
import { TenantConfig } from './types/tenant';
import { getFlavorNative, getFlavorNativeSync } from './utils/FlavorDetector';

class ConfigManager {
  private currentTenant: TenantConfig | null = null;

  getCurrentTenant(): TenantConfig {
    if (this.currentTenant) return this.currentTenant;

    // Usar getFlavorNativeSync para obtener el flavor del BuildConfig (sincrónico)
    const flavor = getFlavorNativeSync();
    
    console.log(`🔍 ConfigManager.getCurrentTenant() - Flavor detectado: ${flavor}`);

    const tenantConfig = getFlavorConfig(flavor);
    if (!tenantConfig) {
      console.error(`❌ ConfigManager.getCurrentTenant() - No se encontró configuración para flavor: ${flavor}`);
      throw new Error(`No se encontró configuración para flavor: ${flavor}`);
    }

    console.log(`✅ ConfigManager.getCurrentTenant() - Usando configuración para: ${tenantConfig.displayName}`);
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
      flavor: getFlavorNativeSync() || 'NO_DETECTADO',
      bundleId: Config.BUNDLE_ID || 'com.myreactnativeapp',
      version: Config.VERSION_NAME || '1.0.0',
      buildNumber: Config.BUILD_NUMBER || '1',
      apiBaseUrl: config.api.baseUrl,
      theme: config.theme,
      enviroment: 'prueba'
    };
  }

  // Métodos de conveniencia para acceder a configuraciones específicas
  getTheme() {
    const config = this.getCurrentTenant();
    return config.theme;
  }
  
  getApiBaseUrl(): string {
    const config = this.getCurrentTenant();
    return config.api.baseUrl;
  }
  
  isFeatureEnabled(feature: keyof TenantConfig['features']): boolean {
    const config = this.getCurrentTenant();
    const features = config.features;
    return features?.[feature] === true;
  }
  
  getSupportInfo() {
    const config = this.getCurrentTenant();
    return config.support;
  }
  
  getPaymentConfig() {
    const config = this.getCurrentTenant();
    return config.payment;
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
