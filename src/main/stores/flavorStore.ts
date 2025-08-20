import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configManager } from '../core/ConfigManager'
import { TenantConfig } from '../core/types/tenant'

// 🏦 Flavor Store - Maneja la configuración del flavor actual
interface FlavorState {
  // Estado actual
  currentFlavor: string
  currentConfig: TenantConfig | null
  isLoading: boolean
  
  // Acciones
  setFlavor: (flavorName: string) => Promise<void>
  refreshConfig: () => Promise<void>
  clearFlavor: () => void
}

export const useFlavorStore = create<FlavorState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentFlavor: 'bancoSantaCruz',
      currentConfig: null,
      isLoading: false,

      // Acción para cambiar de flavor
      setFlavor: async (flavorName: string) => {
        try {
          set({ isLoading: true })
          
          // Obtener configuración del flavor
          const config = configManager.getFlavorConfig(flavorName)
          
          if (!config) {
            throw new Error(`No se encontró configuración para el flavor: ${flavorName}`)
          }

          // Actualizar estado
          set({
            currentFlavor: flavorName,
            currentConfig: config,
            isLoading: false
          })

          console.log(`✅ Flavor cambiado a: ${config.displayName}`)
        } catch (error) {
          console.error('❌ Error al cambiar flavor:', error)
          set({ isLoading: false })
          throw error
        }
      },

      // Acción para refrescar la configuración
      refreshConfig: async () => {
        const { currentFlavor } = get()
        if (currentFlavor) {
          await get().setFlavor(currentFlavor)
        }
      },

      // Acción para limpiar el flavor
      clearFlavor: () => {
        set({
          currentFlavor: '',
          currentConfig: null,
          isLoading: false
        })
      }
    }),
    {
      name: 'flavor-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentFlavor: state.currentFlavor
      })
    }
  )
)

// 🎯 Hooks de conveniencia
export const useCurrentFlavor = () => useFlavorStore((state) => state.currentFlavor)
export const useCurrentConfig = () => useFlavorStore((state) => state.currentConfig)
export const useFlavorLoading = () => useFlavorStore((state) => state.isLoading)
export const useFlavorActions = () => useFlavorStore((state) => ({
  setFlavor: state.setFlavor,
  refreshConfig: state.refreshConfig,
  clearFlavor: state.clearFlavor
}))
