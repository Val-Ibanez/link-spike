// 🏦 Stores Index - Exporta todos los stores de Zustand

// Stores principales
export { useFlavorStore } from './flavorStore'
export { useAppStore } from './appStore'
export { useUserStore } from './userStore'
export { usePaymentStore } from './paymentStore'

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
