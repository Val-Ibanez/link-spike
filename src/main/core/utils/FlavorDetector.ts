import { NativeModules, Platform } from "react-native";
import Config from "react-native-config";

// 🎯 Flavors conocidos
const KNOWN_FLAVORS = ["bancoSantaCruz", "bancoEntreRios", "bancoSantaFe"] as const;
export type Flavor = typeof KNOWN_FLAVORS[number];

// 🎯 Flavor por defecto
const DEFAULT_FLAVOR: Flavor = "bancoSantaCruz";

// 🔍 Detecta flavor en iOS según el bundleIdentifier
function detectIosFlavor(): Flavor {
  const bundleId = NativeModules.PlatformConstants?.bundleIdentifier ?? "";
  console.log("🔍 FlavorDetector iOS: Bundle ID nativo:", bundleId);

  const detected = KNOWN_FLAVORS.find((flavor) => bundleId.includes(flavor));
  if (detected) {
    console.log("✅ FlavorDetector iOS: Detectado", detected);
    return detected;
  }

  // Fallback: intentar por Config
  const configFlavor = Config.FLAVOR as Flavor | undefined;
  if (configFlavor && KNOWN_FLAVORS.includes(configFlavor)) {
    console.log("✅ FlavorDetector iOS: Detectado por Config:", configFlavor);
    return configFlavor;
  }

  console.warn("⚠️ FlavorDetector iOS: No se pudo detectar flavor, usando default");
  return DEFAULT_FLAVOR;
}

// ⚡ Función sincrónica
export function getFlavorNativeSync(): Flavor {
  try {
    if (Platform.OS === "android") {
      console.log("🔍 FlavorDetector ANDROID: Llamando a FlavorModule.getConstants()");
      const flavor = NativeModules.FlavorModule.getConstants?.()?.FLAVOR as Flavor | undefined;

      if (flavor && KNOWN_FLAVORS.includes(flavor)) {
        console.log("✅ FlavorDetector ANDROID: Detectado (sync):", flavor);
        return flavor;
      }
    } else if (Platform.OS === "ios") {
      return detectIosFlavor();
    }
  } catch (error) {
    console.error("❌ Error en getFlavorNativeSync:", error);
  }

  return DEFAULT_FLAVOR;
}

// ⏳ Función async
export async function getFlavorNative(): Promise<Flavor> {
  try {
    if (Platform.OS === "android") {
      console.log("🔍 FlavorDetector ANDROID: Llamando a FlavorModule.getFlavor()");
      const flavor = (await NativeModules.FlavorModule.getFlavor?.()) as Flavor | undefined;

      if (flavor && KNOWN_FLAVORS.includes(flavor)) {
        console.log("✅ FlavorDetector ANDROID: Detectado:", flavor);
        return flavor;
      }
    } else if (Platform.OS === "ios") {
      return detectIosFlavor();
    }
  } catch (error) {
    console.error("❌ Error en getFlavorNative:", error);
  }

  return DEFAULT_FLAVOR;
}
