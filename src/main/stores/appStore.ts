import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 🏦 App Store - Estado general de la aplicación
interface AppState {
  // Estado de la app
  isFirstLaunch: boolean
  isOnboarded: boolean
  currentScreen: string
  appVersion: string
  buildNumber: string
  
  // Configuración del usuario
  language: string
  theme: 'light' | 'dark' | 'auto'
  notifications: boolean
  biometrics: boolean
  
  // Acciones
  setFirstLaunch: (value: boolean) => void
  setOnboarded: (value: boolean) => void
  setCurrentScreen: (screen: string) => void
  setLanguage: (lang: string) => void
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  toggleNotifications: () => void
  toggleBiometrics: () => void
  resetApp: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      isFirstLaunch: true,
      isOnboarded: false,
      currentScreen: 'Dashboard',
      appVersion: '1.0.0',
      buildNumber: '1',
      
      // Configuración por defecto
      language: 'es',
      theme: 'auto',
      notifications: true,
      biometrics: false,

      // Acciones
      setFirstLaunch: (value: boolean) => set({ isFirstLaunch: value }),
      setOnboarded: (value: boolean) => set({ isOnboarded: value }),
      setCurrentScreen: (screen: string) => set({ currentScreen: screen }),
      setLanguage: (lang: string) => set({ language: lang }),
      setTheme: (theme: 'light' | 'dark' | 'auto') => set({ theme }),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      toggleBiometrics: () => set((state) => ({ biometrics: !state.biometrics })),
      resetApp: () => set({
        isFirstLaunch: true,
        isOnboarded: false,
        currentScreen: 'Dashboard',
        language: 'es',
        theme: 'auto',
        notifications: true,
        biometrics: false
      })
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isFirstLaunch: state.isFirstLaunch,
        isOnboarded: state.isOnboarded,
        language: state.language,
        theme: state.theme,
        notifications: state.notifications,
        biometrics: state.biometrics
      })
    }
  )
)

// 🎯 Hooks de conveniencia
export const useAppSettings = () => useAppStore((state) => ({
  language: state.language,
  theme: state.theme,
  notifications: state.notifications,
  biometrics: state.biometrics
}))

export const useAppActions = () => useAppStore((state) => ({
  setFirstLaunch: state.setFirstLaunch,
  setOnboarded: state.setOnboarded,
  setCurrentScreen: state.setCurrentScreen,
  setLanguage: state.setLanguage,
  setTheme: state.setTheme,
  toggleNotifications: state.toggleNotifications,
  toggleBiometrics: state.toggleBiometrics,
  resetApp: state.resetApp
}))
