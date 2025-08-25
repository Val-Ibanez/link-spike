import bancoEntreRios from '../../../flavors/bancoEntreRios/config/config.json';
import bancoSantaCruz from '../../../flavors/bancoSantaCruz/config/config.json';
import bancoSantaFe from '../../../flavors/bancoSantaFe/config/config.json';
import link from '../../../flavors/link/config/config.json';
import Config from 'react-native-config';

import { TenantConfig } from './types/tenant';

// Configuraciones de flavors disponibles
const flavorConfigs = {
  bancoEntreRios,
  bancoSantaCruz,
  bancoSantaFe,
  link,
} as Record<string, TenantConfig>;

export function getCurrentFlavor(): TenantConfig | null {
  const flavorName = Config.FLAVOR;
  return flavorName ? getFlavorConfig(flavorName) : null;
}
  
// Devuelve la config de un flavor
export function getFlavorConfig(flavorName: string): TenantConfig | null {
  return flavorConfigs[flavorName] || null;
}