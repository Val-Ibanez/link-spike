import { useCallback } from 'react'
import { useFlavorStore, useCurrentFlavor, useCurrentConfig } from './flavorStore'
import { useAppStore, useAppSettings } from './appStore'
import { useUserStore, useUser, useIsAuthenticated } from './userStore'
import { usePaymentStore, useTransactions, usePaymentConfig } from './paymentStore'

// 🏦 Hook Combinado - Integra todos los stores de Zustand
export const useApp = () => {
  // Flavor Store
  const currentFlavor = useCurrentFlavor()
  const currentConfig = useCurrentConfig()
  const { refreshConfig } = useFlavorStore()

  // App Store
  const appSettings = useAppSettings()
  const { setTheme, setLanguage, toggleNotifications } = useAppStore()

  // User Store
  const user = useUser()
  const isAuthenticated = useIsAuthenticated()
  const { login, logout, updateUser } = useUserStore()

  // Payment Store
  const transactions = useTransactions()
  const paymentConfig = usePaymentConfig()
  const { addTransaction, clearTransactions } = usePaymentStore()

  // Acciones combinadas
  const initializeApp = useCallback(async () => {
    try {
      // Los flavors se detectan automáticamente
      console.log('🚀 initializeApp: Los flavors se detectan automáticamente')
      
      // Refrescar configuración
      await refreshConfig()
    } catch (error) {
      console.error('❌ Error inicializando app:', error)
    }
  }, [refreshConfig])

  // Función removida: changeFlavor - Los flavors se detectan automáticamente

  return {
    // Estado
    currentFlavor,
    currentConfig,
    user,
    isAuthenticated,
    transactions,
    paymentConfig,
    appSettings,
    
    // Acciones
    initializeApp,
    login,
    logout,
    updateUser,
    addTransaction,
    setTheme,
    setLanguage,
    toggleNotifications,
    
    // Helpers
    isFirstLaunch: useAppStore((state) => state.isFirstLaunch),
    isOnboarded: useAppStore((state) => state.isOnboarded),
    currentScreen: useAppStore((state) => state.currentScreen),
    isLoading: useFlavorStore((state) => state.isLoading)
  }
}

// 🎯 Hook para configuración del flavor actual
export const useFlavorConfig = () => {
  const currentConfig = useCurrentConfig()
  const currentFlavor = useCurrentFlavor()
  
  return {
    config: currentConfig,
    flavor: currentFlavor,
    theme: currentConfig?.theme,
    features: currentConfig?.features,
    logo: currentConfig?.logo,
    api: currentConfig?.api,
    payment: currentConfig?.payment,
    support: currentConfig?.support
  }
}
