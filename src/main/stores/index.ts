// 🏦 Stores Index - Exporta todos los stores de Zustand

// Stores principales
export { useFlavorStore } from './flavorStore'
export { useAppStore } from './appStore'
export { useUserStore } from './userStore'
export { usePaymentStore } from './paymentStore'
export { useConfigStore } from './configStore'
export { useSvgAssetStore } from './svgAssetStore'
export { useFeatureFlagsStore } from './featureFlagsStore'
export { useFeatureFlagsConfigStore } from './featureFlagsConfigStore'

// Hook combinado principal
export { useApp, useFlavorConfig } from './useApp'

// Hooks de conveniencia del Flavor Store
export { 
  useCurrentFlavor, 
  useCurrentConfig, 
  useFlavorLoading, 
  useFlavorActions 
} from './flavorStore'

// Hooks de conveniencia del App Store
export { 
  useAppSettings, 
  useAppActions 
} from './appStore'

// Hooks de conveniencia del User Store
export { 
  useUser, 
  useIsAuthenticated, 
  useUserLoading, 
  useUserActions 
} from './userStore'

// Hooks de conveniencia del Payment Store
export { 
  useTransactions, 
  useCurrentTransaction, 
  usePaymentLoading, 
  usePaymentError, 
  usePaymentConfig, 
  usePaymentActions 
} from './paymentStore'

// Hooks optimizados del Config Store
export { 
  useCurrentTenant,
  useAppInfo,
  useDetectedFlavor,
  useConfigActions,
  useConfig,
  // ✅ Selectores individuales para acciones - Referencias estables
  useInitializeConfig,
  useSetCurrentTenant,
  useSetAppInfo,
  useSetDetectedFlavor,
  useRefreshConfig
} from './configStore'

// Hooks del Feature Flags Store
export { 
  useEnabledFeatures,
  useFeatureFlagsActions,
  useFeatureFlags
} from './featureFlagsStore'

// Hooks del Feature Flags Config Store
export { 
  useQrPaymentsEnabled,
  useInstallmentsEnabled,
  useContactlessPaymentsEnabled,
  useFeatureFlagsConfigActions,
  useAllFeatureFlags,
  // ✅ Selectores individuales para acciones - Referencias estables
  useUpdateFeatureFlags,
  useSetQrPaymentsEnabled,
  useSetInstallmentsEnabled,
  useSetContactlessPaymentsEnabled
} from './featureFlagsConfigStore'

// Hooks de conveniencia del SVG Asset Store
export { 
  useSvgAsset, 
  useSvgAssetActions 
} from './svgAssetStore'
