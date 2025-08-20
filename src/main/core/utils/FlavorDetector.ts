import { NativeModules, Platform } from "react-native";

// Función sincrónica usando getConstants
export function getFlavorNativeSync(): string {
  if (Platform.OS === "android") {
    try {
      console.log('🔍 FlavorDetector ANDROID: Llamando a FlavorModule.getConstants()');
      const flavor = NativeModules.FlavorModule.getConstants()?.FLAVOR;
      console.log('✅ FlavorDetector ANDROID: Flavor detectado (sync):', flavor);
      
      // Si no se puede detectar, usar el package name como fallback
      if (!flavor) {
        console.log('⚠️ FlavorDetector ANDROID: No se pudo detectar flavor, usando package name');
        // Intentar detectar por el package name de la app
        const packageName = NativeModules.PlatformConstants?.packageName || '';
        console.log('🔍 FlavorDetector ANDROID: Package name:', packageName);
        
        if (packageName.includes('bancosantacruz')) {
          return 'bancoSantaCruz';
        } else if (packageName.includes('bancoentrerios')) {
          return 'bancoEntreRios';
        } else if (packageName.includes('bancosantafe')) {
          return 'bancoSantaFe';
        }
      }
      
      return flavor || 'bancoSantaFe'; // Fallback al flavor que estamos probando
    } catch (error) {
      console.error('❌ Error al obtener flavor nativo (sync):', error);
      return 'bancoSantaFe'; // fallback al flavor que estamos probando
    }
  } else if (Platform.OS === "ios") {
    try {
      // Para iOS, usar el Bundle Identifier nativo
      const bundleId = NativeModules.PlatformConstants?.bundleIdentifier ?? "";
      console.log("🔍 FlavorDetector iOS: Bundle ID nativo:", bundleId);
      
      // Detectar flavor por Bundle ID
      if (bundleId.includes("bancosantacruz")) {
        console.log("✅ FlavorDetector iOS: Detectado bancoSantaCruz");
        return "bancoSantaCruz";
      } else if (bundleId.includes("bancoentrerios")) {
        console.log("✅ FlavorDetector iOS: Detectado bancoEntreRios");
        return "bancoEntreRios";
      } else if (bundleId.includes("bancosantafe")) {
        console.log("✅ FlavorDetector iOS: Detectado bancoSantaFe");
        return "bancoSantaFe";
      }
      
      console.warn("⚠️ FlavorDetector iOS: No se pudo detectar flavor del bundle ID, usando fallback");
      return "bancoSantaFe"; // fallback al flavor que estamos probando
    } catch (error) {
      console.error("❌ Error al detectar flavor en iOS:", error);
      return "bancoSantaFe"; // fallback al flavor que estamos probando
    }
  }
  return "bancoSantaFe"; // fallback general al flavor que estamos probando
}

// Función async (mantenemos para compatibilidad)
export async function getFlavorNative(): Promise<string> {
  if (Platform.OS === "android") {
    try {
      console.log('🔍 FlavorDetector ANDROID: Llamando a FlavorModule.getFlavor()');
      const flavor = await NativeModules.FlavorModule.getFlavor();
      console.log('✅ FlavorDetector ANDROID: Flavor detectado:', flavor);
      return flavor;
    } catch (error) {
      console.error('❌ Error al obtener flavor nativo:', error);
      return 'bancoSantaFe'; // fallback al flavor que estamos probando
    }
  } else if (Platform.OS === "ios") {
    // Para iOS, usar la función sincrónica
    return getFlavorNativeSync();
  }
  return 'bancoSantaFe'; // fallback general al flavor que estamos probando
}