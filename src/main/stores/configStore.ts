import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Config from 'react-native-config'
import { Platform } from 'react-native'
import { getFlavorConfig } from '../core/FlavorConfig'
import { TenantConfig } from '../core/types/tenant'
import { getFlavorNativeSync } from '../core/utils/FlavorDetector'

// 🏦 Config Store - Maneja la configuración de la aplicación
interface ConfigState {
  // Estado
  currentTenant: TenantConfig | null
  appInfo: {
    displayName: string
    flavor: string
    bundleId: string
    version: string
    buildNumber: string
    apiBaseUrl: string
    theme: any
    environment: string
  } | null
  detectedFlavor: string | null
  
  // Acciones
  initializeConfig: () => Promise<void>
  setCurrentTenant: (tenant: TenantConfig) => void
  setAppInfo: (info: ConfigState['appInfo']) => void
  setDetectedFlavor: (flavor: string) => void
  refreshConfig: () => Promise<void>
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentTenant: null,
      appInfo: null,
      detectedFlavor: null,

      // ✅ ACCIÓN: Inicializar configuración (se llama una sola vez)
      initializeConfig: async () => {
        try {
          console.log('🚀 ConfigStore: Inicializando configuración...');
          
          // Detectar flavor una sola vez
          const flavor = getFlavorNativeSync();
          console.log(`🔍 ConfigStore: Flavor detectado: ${flavor}`);
          
          // Obtener configuración del tenant
          const tenantConfig = getFlavorConfig(flavor);
          if (!tenantConfig) {
            throw new Error(`No se encontró configuración para flavor: ${flavor}`);
          }
          
          // Crear appInfo
          const appInfo = {
            displayName: tenantConfig.displayName,
            flavor: flavor,
            bundleId: Config.BUNDLE_ID || 'com.myreactnativeapp',
            version: Config.VERSION_NAME || '1.0.0',
            buildNumber: Config.BUILD_NUMBER || '1',
            apiBaseUrl: tenantConfig.api.baseUrl,
            theme: tenantConfig.theme,
            environment: 'prueba'
          };
          
          // ✅ ACTUALIZAR ESTADO UNA SOLA VEZ
          set({
            detectedFlavor: flavor,
            currentTenant: tenantConfig,
            appInfo: appInfo
          });
          
          // ✅ ACTUALIZAR FEATURE FLAGS DESPUÉS DE CONFIGURAR EL TENANT
          // Esto se hace aquí para evitar llamadas separadas
          try {
            // ✅ PASAR FEATURES COMO PARÁMETRO en lugar de acceder directamente al store
            const { useFeatureFlagsConfigStore } = require('./featureFlagsConfigStore');
            const featureFlagsStore = useFeatureFlagsConfigStore.getState();
            featureFlagsStore.updateFeatureFlags(tenantConfig.features);
            console.log('✅ ConfigStore: Feature flags actualizados');
          } catch (featureFlagsError) {
            console.warn('⚠️ ConfigStore: No se pudieron actualizar feature flags:', featureFlagsError);
          }
          
          console.log(`✅ ConfigStore: Configuración inicializada para ${tenantConfig.displayName}`);
        } catch (error) {
          console.error('❌ ConfigStore: Error al inicializar:', error);
          throw error;
        }
      },

      // ✅ ACCIÓN: Establecer tenant actual
      setCurrentTenant: (tenant: TenantConfig) => {
        set({ currentTenant: tenant });
      },

      // ✅ ACCIÓN: Establecer información de la app
      setAppInfo: (info: ConfigState['appInfo']) => {
        set({ appInfo: info });
      },

      // ✅ ACCIÓN: Establecer flavor detectado
      setDetectedFlavor: (flavor: string) => {
        set({ detectedFlavor: flavor });
      },

      // ✅ ACCIÓN: Refrescar configuración
      refreshConfig: async () => {
        console.log('🔄 ConfigStore: Refrescando configuración...');
        set({ currentTenant: null, appInfo: null, detectedFlavor: null });
        await get().initializeConfig();
      },
    }),
    {
      name: 'config-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentTenant: state.currentTenant,
        detectedFlavor: state.detectedFlavor
      })
    }
  )
)

// 🎯 Hooks optimizados - Solo seleccionan lo que necesitan
export const useCurrentTenant = () => useConfigStore((state) => state.currentTenant)
export const useAppInfo = () => useConfigStore((state) => state.appInfo)
export const useDetectedFlavor = () => useConfigStore((state) => state.detectedFlavor)

// 🎯 Selectores individuales para acciones - Referencias estables
export const useInitializeConfig = () => useConfigStore((state) => state.initializeConfig)
export const useSetCurrentTenant = () => useConfigStore((state) => state.setCurrentTenant)
export const useSetAppInfo = () => useConfigStore((state) => state.setAppInfo)
export const useSetDetectedFlavor = () => useConfigStore((state) => state.setDetectedFlavor)
export const useRefreshConfig = () => useConfigStore((state) => state.refreshConfig)

// 🎯 Hooks de acciones (mantener para compatibilidad, pero usar selectores individuales es mejor)
export const useConfigActions = () => useConfigStore((state) => ({
  initializeConfig: state.initializeConfig,
  setCurrentTenant: state.setCurrentTenant,
  setAppInfo: state.setAppInfo,
  setDetectedFlavor: state.setDetectedFlavor,
  refreshConfig: state.refreshConfig
}))

// 🎯 Hook combinado optimizado (solo si realmente necesitas todo)
export const useConfig = () => useConfigStore((state) => ({
  currentTenant: state.currentTenant,
  appInfo: state.appInfo,
  detectedFlavor: state.detectedFlavor,
  initializeConfig: state.initializeConfig,
  setCurrentTenant: state.setCurrentTenant,
  setAppInfo: state.setAppInfo,
  setDetectedFlavor: state.setDetectedFlavor,
  refreshConfig: state.refreshConfig
}))
