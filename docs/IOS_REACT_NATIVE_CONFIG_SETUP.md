# 🍎 Configuración de iOS con React Native Config y Flavors

## 📋 Resumen

Esta documentación explica cómo configurar correctamente React Native Config en iOS para trabajar con el sistema de flavors de marca blanca.

## 🚀 Configuración Rápida

### 1. Verificar configuración actual
```bash
npm run ios:verify-config
```

### 2. Configurar un flavor específico
```bash
# Para Banco Entre Ríos
npm run ios:config:banco-entre-rios

# Para Banco Santa Cruz
npm run ios:config:banco-santa-cruz

# Para Banco Santa Fe
npm run ios:config:banco-santa-fe
```

### 3. Ejecutar la app con un flavor
```bash
# Para Banco Entre Ríos
npm run ios:banco-entre-rios

# Para Banco Santa Cruz
npm run ios:banco-santa-cruz

# Para Banco Santa Fe
npm run ios:banco-santa-fe
```

## 🔧 Solución de Problemas

### Si el build falla:
```bash
# Limpiar y reinstalar pods
npm run ios:clean-pods

# Verificar configuración
npm run ios:verify-config
```

## 📁 Estructura de Archivos

### Archivos de Configuración
```
ios/Config/
├── BancoEntreRios.xcconfig      # Configuración para Banco Entre Ríos
├── BancoSantaCruz.xcconfig      # Configuración para Banco Santa Cruz
└── BancoSantaFe.xcconfig        # Configuración para Banco Santa Fe
```

### Archivos de Entorno
```
.env.bancoEntreRios              # Variables para Banco Entre Ríos
.env.bancoSantaCruz              # Variables para Banco Santa Cruz
.env.bancoSantaFe                # Variables para Banco Santa Fe
.env                             # Archivo activo (se copia automáticamente)
```

## ⚙️ Configuración de React Native Config

### react-native.config.js
```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
  dependencies: {
    'react-native-config': {
      platforms: {
        ios: {
          sourceDir: '../node_modules/react-native-config/ios',
          podspec: 'react-native-config.podspec',
        },
      },
    },
  },
  flavors: {
    bancoEntreRios: {
      ios: {
        bundleId: 'com.myreactnativeapp.bancoentrerios',
        appName: 'Banco Entre Ríos',
        xcconfig: 'ios/Config/BancoEntreRios.xcconfig',
      },
    },
    // ... otros flavors
  },
};
```

## 📱 Configuración de Xcode

### 1. Schemes
Cada flavor debe tener su propio scheme en Xcode:
- `BancoEntreRios`
- `BancoSantaCruz`
- `BancoSantaFe`

### 2. Configuraciones (.xcconfig)
Cada archivo `.xcconfig` debe contener:
```xcconfig
PRODUCT_BUNDLE_IDENTIFIER = com.myreactnativeapp.bancoentrerios
PRODUCT_NAME = Banco Entre Ríos
ENVFILE = $(SRCROOT)/../.env.bancoEntreRios
```

### 3. Build Settings
- **Product Bundle Identifier**: Configurado por `.xcconfig`
- **Product Name**: Configurado por `.xcconfig`
- **Info.plist File**: `MyReactNativeApp/Info.plist`
- **Asset Catalog App Icon Set Name**: `AppIcon.bancoEntreRios`

## 🔄 Flujo de Trabajo

### Desarrollo
1. **Seleccionar flavor**: `npm run ios:config:banco-entre-rios`
2. **Ejecutar app**: `npm run ios:banco-entre-rios`
3. **Cambiar flavor**: `npm run ios:config:banco-santa-cruz`
4. **Ejecutar app**: `npm run ios:banco-santa-cruz`

### Build
1. **Preparar entorno**: El script copia automáticamente el `.env` correcto
2. **Configurar Xcode**: Usa el `.xcconfig` correspondiente
3. **Build**: React Native Config lee las variables del `.env` activo

## 🧪 Testing

### Verificar Variables de Entorno
```typescript
import Config from 'react-native-config';

console.log('FLAVOR:', Config.FLAVOR);
console.log('API_BASE_URL:', Config.API_BASE_URL);
```

### Verificar Flavor Detectado
```typescript
import { getFlavorNativeSync } from './src/main/core/utils/FlavorDetector';

const flavor = getFlavorNativeSync();
console.log('Flavor detectado:', flavor);
```

## 🚨 Problemas Comunes

### 1. Variables de entorno no se leen
- **Solución**: Verificar que el archivo `.env` existe y tiene contenido
- **Comando**: `npm run ios:verify-config`

### 2. Build falla con error de configuración
- **Solución**: Limpiar y reinstalar pods
- **Comando**: `npm run ios:clean-pods`

### 3. Flavor incorrecto detectado
- **Solución**: Verificar que el `.xcconfig` esté configurado correctamente
- **Comando**: `npm run ios:config:[flavor]`

### 4. App no se instala
- **Solución**: Verificar que el Bundle ID sea único por flavor
- **Comando**: `npm run ios:verify-config`

## 📚 Referencias

- [React Native Config Documentation](https://github.com/luggit/react-native-config)
- [iOS Configuration Files](https://developer.apple.com/library/archive/documentation/DeveloperTools/Reference/XcodeBuildSettingRef/1-Build_Setting_Reference/build_setting_ref.html)
- [Xcode Schemes](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/Managing_Schemes.html)

## ✅ Checklist de Verificación

- [ ] `react-native-config` instalado en `package.json`
- [ ] Archivos `.env.[flavor]` existen para cada flavor
- [ ] Archivos `.xcconfig` existen y están configurados
- [ ] Schemes de Xcode configurados para cada flavor
- [ ] Bundle IDs únicos por flavor
- [ ] Scripts de npm funcionando correctamente
- [ ] Build de iOS exitoso para todos los flavors
- [ ] Variables de entorno leyéndose correctamente en la app
