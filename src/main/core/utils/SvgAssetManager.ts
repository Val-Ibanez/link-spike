// 🏦 SvgAssetManager - Wrapper de compatibilidad para migración gradual
// TODO: Migrar todos los usos a useSvgAssetStore y eliminar este archivo

import { useSvgAssetStore } from '../../stores/svgAssetStore';

export type LogoType = 'bancoSantaCruz' | 'bancoEntreRios' | 'bancoSantaFe' | 'link';

// Exportar la instancia del store para compatibilidad
export const svgAssetManager = {
  getCurrentLogoType: () => useSvgAssetStore.getState().getCurrentLogoType(),
  getLogoType: (flavor: string) => useSvgAssetStore.getState().getLogoType(flavor),
  isValidLogoType: (logoType: string) => useSvgAssetStore.getState().isValidLogoType(logoType)
};