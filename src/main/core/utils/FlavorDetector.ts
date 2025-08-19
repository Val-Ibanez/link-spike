import { NativeModules, Platform } from "react-native";

// Función sincrónica usando getConstants
export function getFlavorNativeSync(): string {
  if (Platform.OS === "android") {
    try {
      console.log('🔍 FlavorDetector: Llamando a FlavorModule.getConstants()');
      const flavor = NativeModules.FlavorModule.getConstants()?.FLAVOR;
      console.log('✅ FlavorDetector: Flavor detectado (sync):', flavor);
      return flavor || 'bancoEntreRios';
    } catch (error) {
      console.error('❌ Error al obtener flavor nativo (sync):', error);
      return 'bancoEntreRios'; // fallback
    }
  }
  return 'bancoEntreRios'; // iOS fallback
}

// Función async (mantenemos para compatibilidad)
export async function getFlavorNative(): Promise<string> {
  if (Platform.OS === "android") {
    try {
      console.log('🔍 FlavorDetector: Llamando a FlavorModule.getFlavor()');
      const flavor = await NativeModules.FlavorModule.getFlavor();
      console.log('✅ FlavorDetector: Flavor detectado:', flavor);
      return flavor;
    } catch (error) {
      console.error('❌ Error al obtener flavor nativo:', error);
      return 'bancoEntreRios'; // fallback
    }
  }
  return 'bancoEntreRios'; // iOS fallback
}
