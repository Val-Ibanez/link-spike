import { NativeModules, Platform } from "react-native";

// 🎯 CONFIGURACIÓN CENTRALIZADA DE FLAVORS
const FLAVOR_CONFIG = {
  // Mapeo de patrones de package name/bundle ID a nombres de flavor
  patterns: {
    'bancosantacruz': 'bancoSantaCruz',
    'bancoentrerios': 'bancoEntreRios',
    'bancosantafe': 'bancoSantaFe',
    'link': 'link', // Fácil agregar nuevos bancos aquí
    // Agregar más bancos aquí...
  },
  
  // Fallback por defecto
  defaultFlavor: 'bancoSantaFe',
  
  // Configuración por plataforma
  platformConfig: {
    android: {
      moduleName: 'FlavorModule',
      methodName: 'getConstants',
      fallbackMethod: 'getFlavor',
      identifierKey: 'packageName',
    },
    ios: {
      identifierKey: 'bundleIdentifier',
    },
  },
} as const;

// 🎯 TIPOS TYPESCRIPT
type FlavorName = typeof FLAVOR_CONFIG.patterns[keyof typeof FLAVOR_CONFIG.patterns];
type PlatformType = keyof typeof FLAVOR_CONFIG.platformConfig;

// 🔍 FUNCIÓN PARA DETECTAR FLAVOR POR PATRÓN
function detectFlavorByPattern(identifier: string): FlavorName | null {
  const normalizedIdentifier = identifier.toLowerCase();
  
  for (const [pattern, flavorName] of Object.entries(FLAVOR_CONFIG.patterns)) {
    if (normalizedIdentifier.includes(pattern.toLowerCase())) {
      console.log(`✅ FlavorDetector: Detectado ${flavorName} por patrón "${pattern}"`);
      return flavorName as FlavorName;
    }
  }
  
  return null;
}

// 📱 FUNCIÓN PARA DETECTAR FLAVOR EN ANDROID
function detectAndroidFlavor(): FlavorName {
  try {
    console.log('🔍 FlavorDetector ANDROID: Llamando a FlavorModule.getConstants()');
    
    // Intentar obtener flavor del módulo nativo
    const flavor = NativeModules.FlavorModule.getConstants()?.FLAVOR;
    if (flavor) {
      console.log('✅ FlavorDetector ANDROID: Flavor detectado (sync):', flavor);
      return flavor;
    }
    
    // Fallback: detectar por package name
    console.log('⚠️ FlavorDetector ANDROID: No se pudo detectar flavor, usando package name');
    const packageName = NativeModules.PlatformConstants?.packageName || '';
    console.log('🔍 FlavorDetector ANDROID: Package name:', packageName);
    
    const detectedFlavor = detectFlavorByPattern(packageName);
    if (detectedFlavor) {
      return detectedFlavor;
    }
    
  } catch (error) {
    console.error('❌ Error al obtener flavor nativo (sync):', error);
  }
  
  return FLAVOR_CONFIG.defaultFlavor;
}

// 🍎 FUNCIÓN PARA DETECTAR FLAVOR EN IOS
function detectIOSFlavor(): FlavorName {
  try {
    console.log("🔍 FlavorDetector iOS: Detectando por Bundle ID");
    
    const bundleId = NativeModules.PlatformConstants?.bundleIdentifier ?? "";
    console.log("🔍 FlavorDetector iOS: Bundle ID nativo:", bundleId);
    
    const detectedFlavor = detectFlavorByPattern(bundleId);
    if (detectedFlavor) {
      return detectedFlavor;
    }
    
    console.warn("⚠️ FlavorDetector iOS: No se pudo detectar flavor del bundle ID, usando fallback");
    
  } catch (error) {
    console.error("❌ Error al detectar flavor en iOS:", error);
  }
  
  return FLAVOR_CONFIG.defaultFlavor;
}

// 🚀 FUNCIÓN PRINCIPAL SINCRÓNICA
export function getFlavorNativeSync(): FlavorName {
  if (Platform.OS === "android") {
    return detectAndroidFlavor();
  } else if (Platform.OS === "ios") {
    return detectIOSFlavor();
  }
  
  return FLAVOR_CONFIG.defaultFlavor;
}

// 🔄 FUNCIÓN ASYNC (mantenemos para compatibilidad)
export async function getFlavorNative(): Promise<FlavorName> {
  if (Platform.OS === "android") {
    try {
      console.log('🔍 FlavorDetector ANDROID: Llamando a FlavorModule.getFlavor()');
      const flavor = await NativeModules.FlavorModule.getFlavor();
      console.log('✅ FlavorDetector ANDROID: Flavor detectado:', flavor);
      return flavor;
    } catch (error) {
      console.error('❌ Error al obtener flavor nativo:', error);
      return detectAndroidFlavor(); // Usar la función sincrónica como fallback
    }
  } else if (Platform.OS === "ios") {
    return detectIOSFlavor();
  }
  
  return FLAVOR_CONFIG.defaultFlavor;
}

// ➕ FUNCIÓN PARA AGREGAR NUEVOS FLAVORS DINÁMICAMENTE
export function addFlavorPattern(pattern: string, flavorName: string): void {
  if (FLAVOR_CONFIG.patterns[pattern as keyof typeof FLAVOR_CONFIG.patterns]) {
    console.warn(`⚠️ FlavorDetector: El patrón "${pattern}" ya existe`);
    return;
  }
  
  // Agregar el nuevo patrón al mapeo
  (FLAVOR_CONFIG.patterns as any)[pattern] = flavorName;
  console.log(`✅ FlavorDetector: Agregado nuevo patrón "${pattern}" -> "${flavorName}"`);
}

// 🔍 FUNCIÓN PARA OBTENER TODOS LOS FLAVORS DISPONIBLES
export function getAvailableFlavors(): string[] {
  return Object.values(FLAVOR_CONFIG.patterns);
}

// 🎨 FUNCIÓN PARA OBTENER CONFIGURACIÓN DEL FLAVOR ACTUAL
export function getCurrentFlavorConfig() {
  const currentFlavor = getFlavorNativeSync();
  return {
    currentFlavor,
    availableFlavors: getAvailableFlavors(),
    defaultFlavor: FLAVOR_CONFIG.defaultFlavor,
  };
}