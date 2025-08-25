// 🏦 FeatureFlags - Wrapper de compatibilidad para migración gradual
// TODO: Migrar todos los usos a useFeatureFlagsStore y eliminar este archivo

import { useFeatureFlagsConfigStore } from '../../stores/featureFlagsConfigStore';

// Exportar la instancia del store para compatibilidad
export const featureFlags = {
  // Feature Flag 1: Pagos QR
  isQrPaymentsEnabled: () => {
    // Usar el store directamente para evitar re-renders
    const store = useFeatureFlagsConfigStore.getState();
    return store.qrPaymentsEnabled;
  },
  
  // Feature Flag 2: Pagos en Cuotas
  isInstallmentsEnabled: () => {
    const store = useFeatureFlagsConfigStore.getState();
    return store.installmentsEnabled;
  },
  
  // Feature Flag 3: Pagos Sin Contacto
  isContactlessPaymentsEnabled: () => {
    const store = useFeatureFlagsConfigStore.getState();
    return store.contactlessPaymentsEnabled;
  },
  
  // Método para obtener todas las features habilitadas (solo las esenciales)
  getEnabledFeatures: () => {
    const store = useFeatureFlagsConfigStore.getState();
    const features = [];
    
    if (store.qrPaymentsEnabled) features.push('qrPayments');
    if (store.installmentsEnabled) features.push('installments');
    if (store.contactlessPaymentsEnabled) features.push('contactlessPayments');
    
    return features;
  },
};