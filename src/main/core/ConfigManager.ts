// 🏦 ConfigManager - Wrapper de compatibilidad para migración gradual
// TODO: Migrar todos los usos a useConfigStore y eliminar este archivo
import { useConfigStore } from '../stores/configStore';
import Config from 'react-native-config';

// Exportar la instancia del store para compatibilidad
export const configManager = {
  // ✅ Usar los nuevos hooks del store
  getCurrentTenant: () => {
    const store = useConfigStore.getState();
    return store.currentTenant;
  },
  
  getAppInfo: () => {
    const store = useConfigStore.getState();
    return store.appInfo;
  },
  
  // ✅ Métodos que acceden directamente al estado
  getTheme: () => {
    const store = useConfigStore.getState();
    return store.currentTenant?.theme;
  },
  
  getApiBaseUrl: () => {
    const store = useConfigStore.getState();
    return store.currentTenant?.api.baseUrl;
  },
  
  isFeatureEnabled: (feature: string) => {
    const store = useConfigStore.getState();
    const features = store.currentTenant?.features;
    return features?.[feature as keyof typeof features] === true;
  },
  
  getSupportInfo: () => {
    const store = useConfigStore.getState();
    return store.currentTenant?.support;
  },
  
  getPaymentConfig: () => {
    const store = useConfigStore.getState();
    return store.currentTenant?.payment;
  },
  
  getVersionInfo: () => {
    // Información de versión desde react-native-config
    return {
      versionName: Config.VERSION_NAME || '1.0.0',
      versionCode: Config.VERSION_CODE || '1',
      buildNumber: Config.BUILD_NUMBER || '1',
      releaseStage: Config.RELEASE_STAGE || 'dev',
      fullVersion: `${Config.VERSION_NAME || '1.0.0'} (${Config.BUILD_NUMBER || '1'})`,
      isProduction: Config.RELEASE_STAGE === 'prod',
      isDevelopment: Config.RELEASE_STAGE === 'dev',
    };
  },
};
