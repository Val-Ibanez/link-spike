import { create } from 'zustand'

// 🏦 Feature Flags Config Store - Maneja la lógica de feature flags basada en configuración
interface FeatureFlagsConfigState {
  // Estado
  qrPaymentsEnabled: boolean
  installmentsEnabled: boolean
  contactlessPaymentsEnabled: boolean
  
  // Acciones
  updateFeatureFlags: (tenantFeatures: any) => void
  setQrPaymentsEnabled: (enabled: boolean) => void
  setInstallmentsEnabled: (enabled: boolean) => void
  setContactlessPaymentsEnabled: (enabled: boolean) => void
}

export const useFeatureFlagsConfigStore = create<FeatureFlagsConfigState>()(
  (set) => ({
    // Estado inicial
    qrPaymentsEnabled: false,
    installmentsEnabled: false,
    contactlessPaymentsEnabled: false,

    // ✅ ACCIÓN: Actualizar feature flags desde la configuración
    // Ahora recibe las features como parámetro en lugar de acceder directamente al store
    updateFeatureFlags: (tenantFeatures: any) => {
      try {
        if (tenantFeatures) {
          set({
            qrPaymentsEnabled: tenantFeatures?.qrPayments === true,
            installmentsEnabled: tenantFeatures?.installments === true,
            contactlessPaymentsEnabled: tenantFeatures?.contactlessPayments === true,
          });
        }
      } catch (error) {
        console.error('❌ Error al actualizar feature flags:', error);
      }
    },

    // ✅ ACCIONES: Establecer flags individuales
    setQrPaymentsEnabled: (enabled: boolean) => set({ qrPaymentsEnabled: enabled }),
    setInstallmentsEnabled: (enabled: boolean) => set({ installmentsEnabled: enabled }),
    setContactlessPaymentsEnabled: (enabled: boolean) => set({ contactlessPaymentsEnabled: enabled }),
  })
)

// 🎯 Hooks optimizados - Solo seleccionan lo que necesitan
export const useQrPaymentsEnabled = () => useFeatureFlagsConfigStore((state) => state.qrPaymentsEnabled)
export const useInstallmentsEnabled = () => useFeatureFlagsConfigStore((state) => state.installmentsEnabled)
export const useContactlessPaymentsEnabled = () => useFeatureFlagsConfigStore((state) => state.contactlessPaymentsEnabled)

// 🎯 Selectores individuales para acciones - Referencias estables
export const useUpdateFeatureFlags = () => useFeatureFlagsConfigStore((state) => state.updateFeatureFlags)
export const useSetQrPaymentsEnabled = () => useFeatureFlagsConfigStore((state) => state.setQrPaymentsEnabled)
export const useSetInstallmentsEnabled = () => useFeatureFlagsConfigStore((state) => state.setInstallmentsEnabled)
export const useSetContactlessPaymentsEnabled = () => useFeatureFlagsConfigStore((state) => state.setContactlessPaymentsEnabled)

// 🎯 Hooks de acciones (mantener para compatibilidad, pero usar selectores individuales es mejor)
export const useFeatureFlagsConfigActions = () => useFeatureFlagsConfigStore((state) => ({
  updateFeatureFlags: state.updateFeatureFlags,
  setQrPaymentsEnabled: state.setQrPaymentsEnabled,
  setInstallmentsEnabled: state.setInstallmentsEnabled,
  setContactlessPaymentsEnabled: state.setContactlessPaymentsEnabled
}))

// 🎯 Hook combinado optimizado
export const useAllFeatureFlags = () => useFeatureFlagsConfigStore((state) => ({
  qrEnabled: state.qrPaymentsEnabled,
  installmentsEnabled: state.installmentsEnabled,
  contactlessEnabled: state.contactlessPaymentsEnabled,
  updateFeatureFlags: state.updateFeatureFlags
}))
