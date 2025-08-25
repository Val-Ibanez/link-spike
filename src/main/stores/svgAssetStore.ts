import { create } from 'zustand'
import { useConfigStore } from './configStore'

// 🏦 SVG Asset Store - Maneja los assets SVG de la aplicación
interface SvgAssetState {
  // Estado
  currentLogoType: string | null
  
  // Acciones
  setCurrentLogoType: (logoType: string) => void
  getCurrentLogoType: () => string
  getLogoType: (flavor: string) => string
  isValidLogoType: (logoType: string) => boolean
}

export const useSvgAssetStore = create<SvgAssetState>()(
  (set, get) => ({
    // Estado inicial
    currentLogoType: null,

    // ✅ ACCIÓN: Establecer logo type actual
    setCurrentLogoType: (logoType: string) => set({ currentLogoType: logoType }),

    // ✅ ACCIÓN: Obtener logo type actual
    getCurrentLogoType: () => {
      const { currentLogoType } = get();
      if (currentLogoType) return currentLogoType;

      // Obtener flavor del configStore
      const configStore = useConfigStore.getState();
      const detectedFlavor = configStore.detectedFlavor;
      
      if (detectedFlavor) {
        const logoType = get().getLogoType(detectedFlavor);
        set({ currentLogoType: logoType });
        return logoType;
      }
      
      return 'bancoSantaCruz'; // Fallback
    },

    // ✅ ACCIÓN: Obtener logo type por flavor
    getLogoType: (flavor: string) => {
      const flavorToLogoType = {
        bancoSantaCruz: 'bancoSantaCruz',
        bancoEntreRios: 'bancoEntreRios',
        bancoSantaFe: 'bancoSantaFe',
        link: 'link',
      } as const;

      return flavorToLogoType[flavor as keyof typeof flavorToLogoType] || 'bancoSantaCruz';
    },

    // ✅ ACCIÓN: Verificar si un logo type es válido
    isValidLogoType: (logoType: string) => {
      const validTypes = ['bancoSantaCruz', 'bancoEntreRios', 'bancoSantaFe', 'link'];
      return validTypes.includes(logoType);
    },
  })
)

// 🎯 Hooks optimizados
export const useCurrentLogoType = () => useSvgAssetStore((state) => state.currentLogoType)

export const useSvgAssetActions = () => useSvgAssetStore((state) => ({
  setCurrentLogoType: state.setCurrentLogoType,
  getCurrentLogoType: state.getCurrentLogoType,
  getLogoType: state.getLogoType,
  isValidLogoType: state.isValidLogoType
}))

// 🎯 Hook combinado optimizado
export const useSvgAsset = () => useSvgAssetStore((state) => ({
  currentLogoType: state.currentLogoType,
  setCurrentLogoType: state.setCurrentLogoType,
  getCurrentLogoType: state.getCurrentLogoType,
  getLogoType: state.getLogoType,
  isValidLogoType: state.isValidLogoType
}))
