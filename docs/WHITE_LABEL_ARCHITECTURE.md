# Arquitectura de Marca Blanca - App de Adquirencia

## 🏗️ Estructura del Proyecto

```
MyReactNativeApp/
├── src/                         # Código común compartido
│   ├── main/                    # Funcionalidades principales
│   │   ├── core/               # Tipos, temas, utilidades
│   │   ├── components/         # Componentes UI reutilizables
│   │   ├── services/           # APIs, autenticación, etc.
│   │   └── screens/            # Pantallas de la aplicación
│
├── flavors/                     # Configuraciones por banco
│   ├── bancoEntreRios/
│   │   ├── config/
│   │   │   ├── config.json     # Configuración del banco
│   │   │   └── build.json      # Configuración de build
│   │   └── assets/             # Assets específicos del banco
│   │       ├── images/
│   │       └── fonts/
│   ├── bancoSantaCruz/
│   │   ├── config/
│   │   └── assets/
│   ├── bancoSantaFe/
│   │   ├── config/
│   │   └── assets/
│   └── link/
│       ├── config/
│       └── assets/
│
├── scripts/                     # Scripts de automatización
│   ├── build-release.sh        # Build automático por flavor
│   └── config-manager.js       # Gestor de configuraciones
│
├── android/                     # Configuración Android
├── ios/                        # Configuración iOS
└── docs/                       # Documentación
```

## 🏦 Concepto de Flavors

Cada **flavor** representa un banco diferente con:

- **Configuración única**: Colores, logos, textos, APIs
- **Features específicas**: QR, contactless, multi-moneda, etc.
- **Assets personalizados**: Imágenes, iconos, fuentes
- **Build independiente**: Bundle IDs diferentes, versiones separadas

## 📱 Cómo Funciona

### 1. Build Time Configuration

En lugar de cambiar bancos en runtime, cada app se buildea para un banco específico:

```bash
# Build para Banco Entre Ríos en desarrollo
./scripts/build-release.sh bancoEntreRios development android

# Build para Banco Santa Cruz en producción
./scripts/build-release.sh bancoSantaCruz production android
```

### 2. Configuración Automática

El script de build:

1. **Lee la configuración** del flavor (`flavors/bancoX/config/config.json`)
2. **Configura variables de entorno** con los datos del banco
3. **Copia assets específicos** del flavor al proyecto
4. **Actualiza archivos nativos** (bundle IDs, nombres, colores)
5. **Ejecuta el build** con la configuración correcta

### 3. Apps Independientes

Cada build genera una app completamente independiente:

- **Banco Entre Ríos**: `com.myreactnativeapp.bancoentrerios`
- **Banco Santa Cruz**: `com.myreactnativeapp.bancosantacruz`
- **Banco Santa Fe**: `com.myreactnativeapp.bancosantafe`
- **Link**: `com.myreactnativeapp.link`
- Diferentes iconos, nombres, configuraciones

## 🚀 Comandos Disponibles

### Build por Flavor

```bash
# Scripts rápidos desde package.json
npm run android:banco-entre-rios
npm run android:banco-santa-cruz
npm run android:banco-santa-fe
npm run android:link

# Script directo con más opciones
./scripts/build-release.sh [flavor] [environment] [platform]

# Ejemplos:
./scripts/build-release.sh bancoEntreRios production android
./scripts/build-release.sh bancoSantaCruz development ios
./scripts/build-release.sh bancoSantaFe staging both
```

### Gestión de Versiones

```bash
# Ver estado de versiones
npm run version:status

# Incrementar versión
npm run version:bump bancoEntreRios patch
npm run version:bump bancoSantaCruz minor
npm run version:bump bancoSantaFe major
```

## 🔧 Configuración por Flavor

### Archivo config.json

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
    "primary": "#1E3A8A",
    "secondary": "#3B82F6",
    "surface": "#FFFFFF"
  },
  "features": {
    "qrPayment": true,
    "contactless": true,
    "multiCurrency": false
  }
}
```

### Archivo build.json

```json
{
  "version": "1.0.0",
  "buildNumber": "1",
  "bundleIds": {
    "android": "com.myreactnativeapp.bancoentrerios",
    "ios": "com.myreactnativeapp.bancoentrerios"
  },
  "appName": "Banco Entre Ríos",
  "appIcon": "ic_launcher_banco_entre_rios"
}
```

## 🎨 Personalización de Temas

### Colores por Banco

```typescript
// src/main/core/themes/index.ts
export const themes = {
  bancoEntreRios: {
    primary: '#1E3A8A',    // Azul oscuro
    secondary: '#3B82F6',  // Azul medio
    accent: '#F59E0B'      // Naranja
  },
  bancoSantaCruz: {
    primary: '#059669',    // Verde oscuro
    secondary: '#10B981',  // Verde medio
    accent: '#DC2626'      // Rojo
  },
  bancoSantaFe: {
    primary: '#7C3AED',    // Violeta
    secondary: '#A855F7',  // Violeta medio
    accent: '#F59E0B'      // Naranja
  },
  link: {
    primary: '#1F2937',    // Gris oscuro
    secondary: '#6B7280',  // Gris medio
    accent: '#3B82F6'      // Azul
  }
};
```

## 📱 Gestión de Assets

### Estructura de Assets

```
flavors/bancoEntreRios/assets/
├── images/
│   ├── logo.png
│   ├── splash.png
│   └── onboarding.png
├── fonts/
│   ├── Roboto-Bold.ttf
│   ├── Roboto-Medium.ttf
│   └── Roboto-Regular.ttf
└── icons/
    ├── android/
    └── ios/
```

### Configuración Automática

Los assets se copian automáticamente durante el build:

1. **Android**: `android/app/src/bancoEntreRios/res/`
2. **iOS**: `ios/MyReactNativeApp/Resources/bancoEntreRios/`

## 🚀 Deployment

### Android

```bash
# Generar APK de debug
cd android && ./gradlew assembleBancoEntreRiosDebug

# Generar APK de release
cd android && ./gradlew assembleBancoEntreRiosRelease

# Generar AAB para Play Store
cd android && ./gradlew bundleBancoEntreRiosRelease
```

### iOS

```bash
# Configurar flavor
npm run ios:config:banco-entre-rios

# Ejecutar en simulador
npm run ios:banco-entre-rios

# Build para distribución
xcodebuild -workspace MyReactNativeApp.xcworkspace \
  -scheme BancoEntreRios \
  -configuration Release \
  -archivePath build/BancoEntreRios.xcarchive \
  archive
```

## 🔍 Monitoreo y Testing

### Verificación de Configuración

```bash
# Validar configuraciones
npm run config:validate

# Listar flavors disponibles
npm run config:list

# Comparar configuraciones
npm run config:diff bancoEntreRios bancoSantaCruz
```

### Testing por Flavor

```bash
# Ejecutar tests para flavor específico
FLAVOR=bancoEntreRios npm test

# Ejecutar tests para todos los flavors
npm run test:all
```

## 📚 Mejores Prácticas

### 1. **Nomenclatura Consistente**
- Usar camelCase para nombres de flavors
- Mantener estructura de directorios uniforme
- Seguir convenciones de bundle IDs

### 2. **Configuración Centralizada**
- Mantener configuraciones en archivos JSON
- Usar variables de entorno para secrets
- Validar configuraciones antes del build

### 3. **Assets Optimizados**
- Comprimir imágenes y fuentes
- Usar formatos modernos (WebP, WOFF2)
- Mantener consistencia visual entre flavors

### 4. **Testing Automatizado**
- Tests unitarios por flavor
- Tests de integración
- Validación de configuraciones

## 🎯 Conclusión

Esta arquitectura permite:

- **Desarrollo eficiente** de múltiples apps desde un solo código base
- **Personalización completa** por banco sin duplicación
- **Build automatizado** con configuración específica
- **Mantenimiento simplificado** de funcionalidades comunes
- **Escalabilidad** para agregar nuevos bancos fácilmente

La clave está en la **separación clara** entre código común y configuración específica, permitiendo que cada banco tenga su app personalizada mientras se mantiene la funcionalidad compartida.