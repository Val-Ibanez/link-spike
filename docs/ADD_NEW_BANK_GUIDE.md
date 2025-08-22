# Guía para Agregar un Nuevo Banco - Proyecto Marca Blanca

Esta guía te explica paso a paso cómo agregar un nuevo banco a tu proyecto React Native con configuración de flavors para marca blanca.

## ⚠️ IMPORTANTE: Errores Comunes y Soluciones

**ANTES DE CONTINUAR, lee esta sección para evitar errores críticos:**

### ❌ ERROR CRÍTICO: Package en AndroidManifest.xml
**NO incluyas el atributo `package` en el AndroidManifest.xml del flavor.**
Esto causará el error:
```
Overlay manifest:package attribute declared at AndroidManifest.xml:2:5-40 value=(com.myreactnativeapp.[nombrebanco]) does not match the module's namespace (com.myreactnativeapp)
```

### ✅ SOLUCIÓN CORRECTA:
- **NO usar:** `<manifest package="com.myreactnativeapp.[nombrebanco]">`
- **SÍ usar:** `<manifest xmlns:android="http://schemas.android.com/apk/res/android">`

### ❌ ERROR CRÍTICO: MainActivity y MainApplication incompletos
Los archivos deben ser **completos** y **consistentes** con los otros flavors existentes.

## 📋 Prerrequisitos

- Tener acceso al proyecto React Native
- Conocimientos básicos de la estructura del proyecto
- Editor de código (VS Code recomendado)
- Terminal con acceso a comandos de React Native

## 🏗️ Estructura del Proyecto

El proyecto utiliza una arquitectura de flavors que permite crear múltiples versiones de la misma aplicación con diferentes configuraciones:

```
MyReactNativeApp/
├── flavors/                    # Configuraciones de cada banco
│   ├── bancoEntreRios/        # Ejemplo de banco existente
│   ├── bancoSantaCruz/        # Ejemplo de banco existente
│   ├── bancoSantaFe/          # Ejemplo de banco existente
│   └── [NUEVO_BANCO]/         # Tu nuevo banco aquí
├── android/app/src/            # Configuraciones Android por flavor
├── ios/Config/                 # Configuraciones iOS por flavor
└── src/main/core/configs/      # Configuraciones JS/TS de cada banco
```

## 🚀 Pasos para Agregar un Nuevo Banco

### Paso 1: Crear la Estructura de Directorios

Crea la estructura de carpetas para tu nuevo banco:

```bash
# Reemplaza [NOMBRE_BANCO] con el nombre de tu banco (ej: link)
mkdir -p flavors/[NOMBRE_BANCO]/assets/fonts
mkdir -p flavors/[NOMBRE_BANCO]/assets/icons/android
mkdir -p flavors/[NOMBRE_BANCO]/assets/icons/ios
mkdir -p flavors/[NOMBRE_BANCO]/assets/images
mkdir -p flavors/[NOMBRE_BANCO]/config
```

**Ejemplo para "Link":**
```bash
mkdir -p flavors/link/assets/fonts
mkdir -p flavors/link/assets/icons/android
mkdir -p flavors/link/assets/icons/ios
mkdir -p flavors/link/assets/images
mkdir -p flavors/link/config
```

### Paso 2: Crear Archivos de Configuración del Flavor

#### 2.1 Archivo `flavor.json`

Crea el archivo principal de configuración del flavor:

```json:flavors/[NOMBRE_BANCO]/config/flavor.json
{
  "id": "[id-unico-banco]",
  "name": "[nombreBanco]",
  "displayName": "[Nombre del Banco]",
  "bundleId": {
    "android": "com.myreactnativeapp.[nombrebanco]",
    "ios": "com.myreactnativeapp.[nombrebanco]"
  },
  "theme": {
    "primary": "#0066CC",
    "secondary": "#4A90E2",
    "accent": "#FF6B35",
    "background": "#FAFAFA",
    "surface": "#FFFFFF",
    "text": "#1F2937",
    "textSecondary": "#6B7280",
    "error": "#DC2626",
    "warning": "#F59E0B",
    "success": "#059669"
  },
  "features": {
    "qrPayments": true,
    "contactlessPayments": true,
    "installments": true,
    "multiCurrency": true,
    "investment": true,
    "offlineMode": true,
    "dashboardVariant": "premium"
  },
  "api": {
    "baseUrl": "https://api.[nombrebanco].com",
    "version": "v2",
    "timeout": 30000
  },
  "support": {
    "email": "soporte@[nombrebanco].com",
    "phone": "+54 11 4000-0000",
    "website": "https://www.[nombrebanco].com",
    "chat": true,
    "whatsapp": "+54 9 11 1234-5678"
  },
  "assets": {
    "logo": "assets/images/logo-[nombrebanco].svg",
    "icon": "assets/icons/app-icon.png",
    "splash": "assets/images/splash-screen.png"
  }
}
```

#### 2.2 Archivo `build.json`

```json:flavors/[NOMBRE_BANCO]/config/build.json
{
  "android": {
    "packageName": "com.myreactnativeapp.[nombrebanco]",
    "appName": "[Nombre del Banco]",
    "versionCode": 1,
    "versionName": "1.0.0",
    "bundleIds": {
      "android": "com.myreactnativeapp.[nombrebanco]"
    },
    "appNames": {
      "android": "[Nombre del Banco]"
    },
    "versioning": {
      "versionName": "1.0.0",
      "versionCode": "1",
      "buildNumber": "1"
    },
    "environments": {
      "development": {
        "apiBaseUrl": "https://api.[nombrebanco].com"
      }
    },
    "keystore": {
      "android": "../keystores/[nombrebanco].keystore"
    }
  },
  "ios": {
    "bundleId": "com.myreactnativeapp.[nombrebanco]",
    "appName": "[Nombre del Banco]",
    "version": "1.0.0",
    "build": "1"
  }
}
```

#### 2.3 Archivo `config.json`

```json:flavors/[NOMBRE_BANCO]/config/config.json
{
  "id": "[id-unico-banco]",
  "name": "[nombreBanco]",
  "displayName": "[Nombre del Banco]",
  "theme": {
    "primary": "#0066CC",
    "secondary": "#4A90E2",
    "accent": "#FF6B35",
    "background": "#FAFAFA",
    "surface": "#FFFFFF",
    "text": "#1F2937",
    "textSecondary": "#6B7280",
    "error": "#DC2626",
    "warning": "#F59E0B",
    "success": "#059669",
    "textTertiary": "#9CA3AF",
    "border": "#E5E7EB",
    "shadow": "rgba(0, 0, 0, 0.05)"
  },
  "logo": {
    "main": "assets/images/logo-main.png",
    "white": "assets/images/logo-white.png",
    "dark": "assets/images/logo-dark.png"
  },
  "api": {
    "baseUrl": "https://api.[nombrebanco].com",
    "version": "v1",
    "timeout": 30000
  },
  "features": {
    "cashAdvance": true,
    "qrPayments": true,
    "contactlessPayments": true,
    "installments": true,
    "reports": true,
    "multiCurrency": true,
    "offlineMode": true,
    "dashboardVariant": "premium",
    "showQuickActions": true,
    "showTransactionHistory": true,
    "showAccountBalance": true,
    "compactView": false,
    "showPromotions": true,
    "showSecurityAlerts": true,
    "showProductCategories": true,
    "heroSection": true
  },
  "payment": {
    "supportedCards": ["VISA", "MASTERCARD", "AMEX"],
    "maxAmount": 100000,
    "minAmount": 50,
    "currencies": ["ARS", "USD"],
    "defaultCurrency": "ARS"
  },
  "support": {
    "email": "soporte@[nombrebanco].com",
    "phone": "+54 11 4000-0000",
    "website": "https://www.[nombrebanco].com"
  }
}
```

### Paso 3: Actualizar `react-native.config.js`

```javascript:react-native.config.js
// ... existing code ...
  flavors: {
    bancoEntreRios: {
      // ... configuración existente ...
    },
    bancoSantaCruz: {
      // ... configuración existente ...
    },
    bancoSantaFe: {
      // ... configuración existente ...
    },
    [nombreBanco]: {
      ios: {
        bundleId: 'com.myreactnativeapp.[nombrebanco]',
        appName: '[Nombre del Banco]',
        xcconfig: 'ios/Config/[NombreBanco].xcconfig',
      },
      android: {
        packageName: 'com.myreactnativeapp.[nombrebanco]',
        appName: '[Nombre del Banco]',
      },
    },
  },
// ... existing code ...
```

### Paso 4: Actualizar `FlavorConfig.ts`

**CRÍTICO:** Agregar la importación y configuración del nuevo banco:

```typescript:src/main/core/FlavorConfig.ts
import bancoEntreRios from '../../../flavors/bancoEntreRios/config/config.json';
import bancoSantaCruz from '../../../flavors/bancoSantaCruz/config/config.json';
import bancoSantaFe from '../../../flavors/bancoSantaFe/config/config.json';
import [nombreBanco] from '../../../flavors/[nombreBanco]/config/config.json'; // ← AGREGAR ESTA LÍNEA
import Config from 'react-native-config';

import { TenantConfig } from './types/tenant';

const flavorConfigs = {
  bancoEntreRios,
  bancoSantaCruz,
  bancoSantaFe,
  [nombreBanco], // ← AGREGAR ESTA LÍNEA
} as Record<string, TenantConfig>;
```

### Paso 5: Actualizar `ThemeProvider.tsx`

**CRÍTICO:** Agregar el nuevo banco a la lista de flavors disponibles:

```typescript:src/main/core/themes/ThemeProvider.tsx
// ... existing code ...
        // Fallback: usar el primer flavor disponible dinámicamente
        const allFlavors = ['bancoSantaCruz', 'bancoSantaFe', 'bancoEntreRios', '[nombreBanco]']; // ← AGREGAR AQUÍ
        const fallbackConfig = allFlavors.map(f => configManager.getFlavorConfig(f)).find(Boolean)!;
// ... existing code ...

// En el hook useTheme también:
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback sincrónico si no hay contexto - usar el primer flavor disponible
    const allFlavors = ['bancoSantaCruz', 'bancoSantaFe', 'bancoEntreRios', '[nombreBanco]']; // ← AGREGAR AQUÍ
    const fallbackConfig = allFlavors.map(f => configManager.getFlavorConfig(f)).find(Boolean)!;
    
    console.warn('⚠️ useTheme() llamado fuera del ThemeProvider - usando fallback:', fallbackConfig.displayName);
    return {
      theme: fallbackConfig.theme,
      tenantConfig: fallbackConfig,
    };
  }
  return context;
};
```

### Paso 6: Crear Archivos de Configuración iOS

#### 6.1 Archivo principal `.xcconfig`

```xcconfig:ios/Config/[NombreBanco].xcconfig
PRODUCT_BUNDLE_IDENTIFIER = com.myreactnativeapp.[nombrebanco]
PRODUCT_NAME = [Nombre del Banco]
DISPLAY_NAME = [Nombre del Banco]
PRODUCT_BUNDLE_NAME = [Nombre del Banco]
```

#### 6.2 Archivo Debug

```xcconfig:ios/Config/Debug-[nombreBanco].xcconfig
#include "[NombreBanco].xcconfig"
CONFIGURATION = Debug
```

#### 6.3 Archivo Release

```xcconfig:ios/Config/Release-[nombreBanco].xcconfig
#include "[NombreBanco].xcconfig"
CONFIGURATION = Release
```

### Paso 7: Crear Archivos de Configuración Android

#### 7.1 AndroidManifest.xml ⚠️ CRÍTICO

**IMPORTANTE:** NO incluir el atributo `package`:

```xml:android/app/src/[nombreBanco]/AndroidManifest.xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:name="com.myreactnativeapp.[nombrebanco].MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@style/AppTheme"
        tools:replace="android:name">

        <activity
            android:name="com.myreactnativeapp.[nombrebanco].MainActivity"
            android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
            android:launchMode="singleTask"
            android:windowSoftInputMode="adjustResize"
            android:exported="true"
            tools:replace="android:name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

#### 7.2 MainActivity.kt ⚠️ CRÍTICO

**IMPORTANTE:** Debe ser completo y consistente con otros flavors:

```kotlin:android/app/src/[nombreBanco]/java/com/myreactnativeapp/[nombrebanco]/MainActivity.kt
package com.myreactnativeapp.[nombrebanco]

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "MyReactNativeApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

#### 7.3 MainApplication.kt ⚠️ CRÍTICO

**IMPORTANTE:** Debe incluir todos los packages necesarios:

```kotlin:android/app/src/[nombreBanco]/java/com/myreactnativeapp/[nombrebanco]/MainApplication.kt
package com.myreactnativeapp.[nombrebanco]

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.lugg.RNCConfig.RNCConfigPackage
import com.myreactnativeapp.FlavorPackage

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
              add(RNCConfigPackage())
              add(FlavorPackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = true // Hardcoded for now

        override val isNewArchEnabled: Boolean = false // Hardcoded for now
        override val isHermesEnabled: Boolean = true // Hardcoded for now
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}
```

#### 7.4 strings.xml

```xml:android/app/src/[nombreBanco]/res/values/strings.xml
<resources>
    <string name="app_name">[Nombre del Banco]</string>
</resources>
```

### Paso 8: Actualizar `android/app/build.gradle`

```gradle:android/app/build.gradle
// ... existing code ...

project.ext.envConfigFiles = [
    debug: ".env",
    release: ".env",
    bancoEntreRiosDebug: ".env.bancoEntreRios",
    bancoEntreRiosRelease: ".env.bancoEntreRios",
    bancoSantaCruzDebug: ".env.bancoSantaCruz",
    bancoSantaCruzRelease: ".env.bancoSantaCruz",
    bancoSantaFeDebug: ".env.bancoSantaFe",
    bancoSantaFeRelease: ".env.bancoSantaFe",
    [nombreBanco]Debug: ".env.[nombreBanco]", // ← AGREGAR ESTA LÍNEA
    [nombreBanco]Release: ".env.[nombreBanco]", // ← AGREGAR ESTA LÍNEA
]

// ... existing code ...

signingConfigs {
    // ... existing configs ...
    [nombreBanco] {
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
    }
}

// ... existing code ...

productFlavors {
    // ... existing flavors ...
    [nombreBanco] {
        applyFlavorConfig
    }
}

// ... existing code ...

productFlavors.all { flavor ->
    // ... existing code ...
    if (flavor.name == '[nombreBanco]') {
        flavor.signingConfig signingConfigs.[nombreBanco]
    }
}

// ... existing code ...

sourceSets {
    // ... existing sourceSets ...
    [nombreBanco] {
        manifest.srcFile "src/[nombreBanco]/AndroidManifest.xml"
        java.srcDirs = ["src/[nombreBanco]/java"]
        res.srcDirs = ["src/[nombreBanco]/res"]
        assets.srcDirs = ["src/[nombreBanco]/assets"]
    }
}
```

### Paso 9: Crear Keystore

```bash
# Crear directorio si no existe
mkdir -p android/keystores

# Crear archivo keystore (placeholder - reemplazar con keystore real)
touch android/keystores/[nombreBanco].keystore
```

### Paso 10: Actualizar `package.json`

```json:package.json
{
  "scripts": {
    // ... existing scripts ...
    "android:[nombreBanco]": "react-native run-android --mode=[nombreBanco]Debug",
    "ios:[nombreBanco]": "node scripts/prepare-env.js [nombreBanco] && react-native run-ios --scheme=[NombreBanco]",
    "ios:config:[nombreBanco]": "node scripts/ios-config-setup.js [nombreBanco]"
  }
}
```

### Paso 11: Crear Archivo de Configuración JS/TS

```json:src/main/core/configs/[nombreBanco].json
// Copiar el contenido de flavors/[nombreBanco]/config/config.json
```

## 🔧 Configuración Adicional

### Para Xcode (iOS)

1. Abrir el proyecto en Xcode
2. Agregar el nuevo scheme para tu banco
3. Configurar los targets con los archivos `.xcconfig` correspondientes

### Para Android Studio

1. Sincronizar el proyecto Gradle
2. Verificar que aparezca el nuevo flavor en Build Variants
3. Verificar que no haya errores de compilación

## 🧪 Comandos de Prueba

```bash
# Limpiar y reinstalar dependencias
cd android && ./gradlew clean && cd ..
cd ios && pod install && cd ..

# Probar Android
npm run android:[nombreBanco]

# Probar iOS
npm run ios:[nombreBanco]

# Configurar iOS
npm run ios:config:[nombreBanco]
```

## ❌ Errores Comunes y Soluciones

### Error 1: "No se encontró configuración para flavor: [nombreBanco]"
**Causa:** No se agregó la configuración en `FlavorConfig.ts` o `ThemeProvider.tsx`
**Solución:** Verificar pasos 4 y 5

### Error 2: "Overlay manifest:package attribute declared"
**Causa:** Se incluyó `package` en AndroidManifest.xml
**Solución:** Remover el atributo `package` del manifest

### Error 3: "MainActivity not found" o "MainApplication not found"
**Causa:** Archivos incompletos o incorrectos
**Solución:** Verificar que MainActivity.kt y MainApplication.kt sean completos

### Error 4: "Flavor not detected"
**Causa:** No se actualizó `FlavorDetector.ts`
**Solución:** Verificar que el nuevo banco esté en la lista de patrones

## ✅ Checklist de Verificación

- [ ] Estructura de directorios creada
- [ ] Archivos de configuración del flavor creados
- [ ] `react-native.config.js` actualizado
- [ ] `FlavorConfig.ts` actualizado
- [ ] `ThemeProvider.tsx` actualizado
- [ ] Archivos iOS `.xcconfig` creados
- [ ] `AndroidManifest.xml` creado (SIN atributo package)
- [ ] `MainActivity.kt` creado (completo)
- [ ] `MainApplication.kt` creado (completo)
- [ ] `strings.xml` creado
- [ ] `build.gradle` actualizado
- [ ] Keystore creado
- [ ] `package.json` actualizado
- [ ] Archivo de configuración JS/TS creado
- [ ] Proyecto compila sin errores
- [ ] Flavor se detecta correctamente
- [ ] Aplicación se ejecuta correctamente

## 🎯 Próximos Pasos

Una vez que hayas completado todos los pasos:

1. **Probar la compilación** en ambas plataformas
2. **Verificar la detección del flavor** en la aplicación
3. **Personalizar los assets** (logos, colores, etc.)
4. **Configurar las APIs** específicas del banco
5. **Probar todas las funcionalidades** en el nuevo flavor

## 📞 Soporte

Si encuentras problemas:

1. Revisa esta guía paso a paso
2. Verifica que no hayas incluido el atributo `package` en AndroidManifest.xml
3. Asegúrate de que MainActivity.kt y MainApplication.kt sean completos
4. Verifica que hayas actualizado `FlavorConfig.ts` y `ThemeProvider.tsx`
5. Revisa los logs de compilación para errores específicos

¡Buena suerte con tu nuevo banco! 🚀
