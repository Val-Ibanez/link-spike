import { create } from 'zustand'

// 🏦 Feature Flags Store - Maneja las feature flags esenciales de la aplicación
interface FeatureFlagsState {
  // Estado
  enabledFeatures: string[]
  
  // Acciones
  setEnabledFeatures: (features: string[]) => void
  clearFeatures: () => void
}

export const useFeatureFlagsStore = create<FeatureFlagsState>()(
  (set) => ({
    // Estado inicial
    enabledFeatures: [],

    // ✅ ACCIÓN: Establecer features habilitadas
    setEnabledFeatures: (features: string[]) => set({ enabledFeatures: features }),
    
    // ✅ ACCIÓN: Limpiar features
    clearFeatures: () => set({ enabledFeatures: [] }),
  })
)

// 🎯 Hooks optimizados - Solo seleccionan lo que necesitan
export const useEnabledFeatures = () => useFeatureFlagsStore((state) => state.enabledFeatures)

export const useFeatureFlagsActions = () => useFeatureFlagsStore((state) => ({
  setEnabledFeatures: state.setEnabledFeatures,
  clearFeatures: state.clearFeatures
}))

// 🎯 Hook combinado optimizado (solo si realmente necesitas todo)
export const useFeatureFlags = () => useFeatureFlagsStore((state) => ({
  enabledFeatures: state.enabledFeatures,
  setEnabledFeatures: state.setEnabledFeatures,
  clearFeatures: state.clearFeatures
}))
