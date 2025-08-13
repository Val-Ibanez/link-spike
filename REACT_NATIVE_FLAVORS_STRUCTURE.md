# 🏗️ Estructura Estándar de React Native Flavors

## 📁 Estructura del Proyecto

```
MyReactNativeApp/
├── src/                          # Código fuente compartido
│   ├── main/                     # Lógica principal de la app
│   │   ├── components/           # Componentes reutilizables
│   │   ├── screens/              # Pantallas principales
│   │   ├── navigation/           # Configuración de navegación
│   │   ├── hooks/                # Hooks personalizados
│   │   ├── services/             # Servicios y APIs
│   │   ├── core/                 # Configuración y utilidades
│   │   └── design-system/        # Sistema de diseño
│   └── index.ts                  # Punto de entrada de exports
├── flavors/                      # Configuraciones específicas por banco
│   ├── bancoEntreRios/
│   │   ├── assets/               # Assets específicos del banco
│   │   │   ├── images/           # Logos, splash screens
│   │   │   ├── icons/            # Iconos de la app
│   │   │   └── fonts/            # Fuentes personalizadas
│   │   └── config/
│   │       ├── build.json        # Configuración de build
│   │       ├── config.json       # Configuración general
│   │       └── flavor.json       # Configuración del flavor
│   ├── bancoSantaCruz/
│   │   └── [estructura similar]
│   └── bancoSantaFe/
│       └── [estructura similar]
├── android/                      # Configuración Android
│   └── app/
│       └── src/
│           ├── main/             # Código principal
│           ├── bancoEntreRios/   # Recursos específicos del flavor
│           ├── bancoSantaCruz/
│           └── bancoSantaFe/
├── ios/                          # Configuración iOS
│   ├── Config/                   # Archivos .xcconfig
│   └── MyReactNativeApp/
│       └── Resources/            # Recursos por flavor
└── [archivos de configuración]
```

## 🔧 Configuración de Build

### Android (build.gradle)
```gradle
android {
    flavorDimensions "default"
    productFlavors {
        bancoEntreRios {
            dimension "default"
            applicationId "com.myreactnativeapp.bancoentrerios"
            resValue "string", "app_name", "Banco Entre Ríos"
        }
        bancoSantaCruz {
            dimension "default"
            applicationId "com.myreactnativeapp.bancosantacruz"
            resValue "string", "app_name", "Banco Santa Cruz"
        }
        bancoSantaFe {
            dimension "default"
            applicationId "com.myreactnativeapp.bancosantafe"
            resValue "string", "app_name", "Banco Santa Fe"
        }
    }
}
```

### iOS (.xcconfig)
```xcconfig
// BancoEntreRios.xcconfig
PRODUCT_BUNDLE_IDENTIFIER = com.myreactnativeapp.bancoentrerios
PRODUCT_NAME = Banco Entre Ríos
INFOPLIST_FILE = MyReactNativeApp/Resources/bancoEntreRios/InfoPlist.strings
ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon.bancoEntreRios
```

## 📱 Recursos por Flavor

### Android
- `android/app/src/[flavor]/res/values/strings.xml` - Strings específicos
- `android/app/src/[flavor]/res/drawable/` - Imágenes específicas
- `android/app/src/[flavor]/res/mipmap/` - Iconos específicos

### iOS
- `ios/MyReactNativeApp/Resources/[flavor]/InfoPlist.strings` - Strings específicos
- `ios/MyReactNativeApp/Resources/[flavor]/` - Otros recursos

## 🎨 Configuración de Temas y Features

### Archivo flavor.json
```json
{
  "id": "banco-entre-rios",
  "name": "bancoEntreRios",
  "displayName": "Banco Entre Ríos",
  "bundleId": {
    "android": "com.myreactnativeapp.bancoentrerios",
    "ios": "com.myreactnativeapp.bancoentrerios"
  },
  "theme": {
    "primary": "#1B365D",
    "secondary": "#2E5984",
    "accent": "#F59E0B"
  },
  "features": {
    "qrPayments": true,
    "contactlessPayments": true,
    "multiCurrency": false
  }
}
```

## 🚀 Comandos de Build

### Android
```bash
# Debug
npx react-native run-android --mode=bancoEntreRiosDebug
npx react-native run-android --mode=bancoSantaCruzDebug
npx react-native run-android --mode=bancoSantaFeDebug

# Release
npx react-native run-android --mode=bancoEntreRiosRelease
npx react-native run-android --mode=bancoSantaCruzRelease
npx react-native run-android --mode=bancoSantaFeRelease
```

### iOS
```bash
# Debug
npx react-native run-ios --mode=bancoEntreRiosDebug
npx react-native run-ios --mode=bancoSantaCruzDebug
npx react-native run-ios --mode=bancoSantaFeDebug

# Release
npx react-native run-ios --mode=bancoEntreRiosRelease
npx react-native run-ios --mode=bancoSantaCruzRelease
npx react-native run-ios --mode=bancoSantaFeRelease
```

## 🔄 Flujo de Desarrollo

1. **Código compartido**: Escribir en `src/main/`
2. **Personalización por banco**: Configurar en `flavors/[banco]/`
3. **Assets específicos**: Colocar en `flavors/[banco]/assets/`
4. **Build**: Usar comandos específicos por flavor
5. **Testing**: Probar cada flavor por separado

## ✅ Beneficios de esta Estructura

- **Separación clara**: Código compartido vs. específico por banco
- **Mantenibilidad**: Cambios en un banco no afectan a otros
- **Escalabilidad**: Fácil agregar nuevos bancos
- **Estándar**: Sigue las mejores prácticas de React Native
- **Builds independientes**: Cada flavor puede tener su propio proceso de CI/CD

## 🚨 Consideraciones Importantes

- **Metro config**: Configurado para resolver `src/` y `flavors/`
- **Babel**: Configurado con alias para paths
- **TypeScript**: Configurado con paths y includes apropiados
- **Assets**: Cada flavor tiene su propia carpeta de assets
- **Configuración**: Centralizada en archivos JSON por flavor
