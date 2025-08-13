# 📚 Documentación de Scripts

Esta documentación explica todos los scripts disponibles en el proyecto React Native con arquitectura white-label para bancos.

## 📋 Índice
- [Scripts del package.json](#scripts-del-packagejson)
- [Scripts de la carpeta /scripts](#scripts-de-la-carpeta-scripts)
- [Ejemplos de uso](#ejemplos-de-uso)

---

## 📦 Scripts del package.json

### 🚀 Scripts Básicos de React Native

#### `npm run android`
- **Comando**: `react-native run-android`
- **Propósito**: Lanza la app en Android usando la configuración por defecto
- **Cuándo usar**: Para desarrollo rápido sin flavors específicos

#### `npm run ios`
- **Comando**: `react-native run-ios`
- **Propósito**: Lanza la app en iOS usando la configuración por defecto
- **Cuándo usar**: Para desarrollo rápido sin flavors específicos

#### `npm start`
- **Comando**: `react-native start --reset-cache`
- **Propósito**: Inicia Metro Bundler con cache limpio
- **Cuándo usar**: Para resolver problemas de cache o iniciar el servidor de desarrollo

#### `npm run lint`
- **Comando**: `eslint .`
- **Propósito**: Ejecuta el linter para detectar problemas de código
- **Cuándo usar**: Antes de commits para mantener calidad de código

#### `npm test`
- **Comando**: `jest`
- **Propósito**: Ejecuta los tests unitarios
- **Cuándo usar**: Para verificar que el código funciona correctamente

---

### 🏦 Scripts de Flavors (Android)

#### `npm run android:banco-nacional`
- **Comando**: `react-native run-android --mode=bancoNacionalDebug`
- **Propósito**: Lanza Banco Nacional en modo debug en Android
- **Bundle ID**: `com.myreactnativeapp.banconacional`
- **Variables**: Lee `.env.bancoNacional`

#### `npm run android:banco-popular`
- **Comando**: `react-native run-android --mode=bancoPopularDebug`
- **Propósito**: Lanza Banco Popular en modo debug en Android
- **Bundle ID**: `com.myreactnativeapp.bancopopular`
- **Variables**: Lee `.env.bancoPopular`

#### `npm run android:banco-nacional:release`
- **Comando**: `react-native run-android --mode=bancoNacionalRelease`
- **Propósito**: Lanza Banco Nacional en modo release en Android
- **Cuándo usar**: Para testing de builds de producción

#### `npm run android:banco-popular:release`
- **Comando**: `react-native run-android --mode=bancoPopularRelease`
- **Propósito**: Lanza Banco Popular en modo release en Android
- **Cuándo usar**: Para testing de builds de producción

---

### 🍎 Scripts de Flavors (iOS)

#### `npm run ios:banco-nacional`
- **Comando**: `cp .env.bancoNacional .env && npm start & sleep 5 && npm run ios`
- **Propósito**: Configura variables de entorno y lanza Banco Nacional en iOS
- **Proceso**: Copia .env → Inicia Metro → Lanza iOS

#### `npm run ios:banco-popular`
- **Comando**: `cp .env.bancoPopular .env && npm start & sleep 5 && npm run ios`
- **Propósito**: Configura variables de entorno y lanza Banco Popular en iOS
- **Proceso**: Copia .env → Inicia Metro → Lanza iOS

#### `npm run ios:launch:bn`
- **Comando**: `./scripts/ios-simple-bundles.sh bancoNacional F0419D1F-E49F-4970-AB83-0D1D109D5A0F`
- **Propósito**: Lanza Banco Nacional en iPhone 15 Pro específico con bundle ID dinámico
- **Bundle ID**: `com.banconacional.app`

#### `npm run ios:launch:bp`
- **Comando**: `./scripts/ios-simple-bundles.sh bancoPopular CD235B84-BB81-4DA6-8F64-BDD682E361C0`
- **Propósito**: Lanza Banco Popular en iPhone 16 Pro específico con bundle ID dinámico
- **Bundle ID**: `com.bancopopular.app`

#### `npm run ios:setup`
- **Comando**: `./scripts/ios-setup-simple.sh`
- **Propósito**: Configura iOS para bundle IDs dinámicos
- **Resultado**: Crea archivos .xcconfig y modifica Info.plist

---

### 📊 Scripts de Versionado

#### `npm run version:status`
- **Comando**: `node scripts/version-manager.js status`
- **Propósito**: Muestra las versiones actuales de todos los flavors
- **Output**: Tabla con versiones de BN y BP

#### Scripts de Banco Nacional (BN)
- `npm run version:bump:bn:patch` - Incrementa versión patch (1.0.0 → 1.0.1)
- `npm run version:bump:bn:minor` - Incrementa versión minor (1.0.0 → 1.1.0)
- `npm run version:bump:bn:major` - Incrementa versión major (1.0.0 → 2.0.0)

#### Scripts de Banco Popular (BP)
- `npm run version:bump:bp:patch` - Incrementa versión patch (1.0.0 → 1.0.1)
- `npm run version:bump:bp:minor` - Incrementa versión minor (1.0.0 → 1.1.0)
- `npm run version:bump:bp:major` - Incrementa versión major (1.0.0 → 2.0.0)

#### Scripts de Release
- `npm run release:banco-nacional` - Genera release completo de BN
- `npm run release:banco-popular` - Genera release completo de BP

---

### 🔐 Scripts de Keystores (Android)

#### `npm run keystores:generate`
- **Comando**: `./scripts/generate-keystores.sh`
- **Propósito**: Genera keystores para firmar APKs de release
- **Output**: `android/keystores/` con keystores para cada banco

#### `npm run keystores:info`
- **Comando**: `./scripts/keystore-info.sh`
- **Propósito**: Muestra información de los keystores existentes
- **Output**: Fingerprints SHA1 y SHA256 para Google Play Console

---

### 🎨 Scripts de Iconos

#### `npm run icons:copy:android`
- **Comando**: `./scripts/copy-icons-android.sh`
- **Propósito**: Copia iconos específicos de cada banco a Android
- **Fuente**: `assets/icons/flavors/`
- **Destino**: `android/app/src/*/res/`

#### `npm run icons:copy:ios`
- **Comando**: `./scripts/copy-icons-ios.sh`
- **Propósito**: Copia iconos específicos de cada banco a iOS
- **Fuente**: `assets/icons/flavors/`
- **Destino**: `ios/MyReactNativeApp/Images.xcassets/`

#### `npm run icons:copy`
- **Comando**: `npm run icons:copy:android && npm run icons:copy:ios`
- **Propósito**: Copia iconos para ambas plataformas en un solo comando

---

### 🏗️ Scripts de Build

#### `npm run build:android:bn:release`
- **Comando**: `cd android && ./gradlew assembleBancoNacionalRelease`
- **Propósito**: Genera APK de release de Banco Nacional
- **Output**: APK firmado en `android/app/build/outputs/`

#### `npm run build:android:bp:release`
- **Comando**: `cd android && ./gradlew assembleBancoPopularRelease`
- **Propósito**: Genera APK de release de Banco Popular
- **Output**: APK firmado en `android/app/build/outputs/`

#### `npm run build:android:all:release`
- **Comando**: `npm run build:android:bn:release && npm run build:android:bp:release`
- **Propósito**: Genera APKs de release para ambos bancos

#### `npm run build:release`
- **Comando**: `./scripts/build-release.sh`
- **Propósito**: Genera builds de release completos para todas las plataformas

---

### 🧹 Scripts de Limpieza

#### `npm run clean`
- **Comando**: `./scripts/kill-metro.sh && npx react-native start --reset-cache`
- **Propósito**: Mata Metro Bundler y reinicia con cache limpio
- **Cuándo usar**: Cuando hay problemas de cache o flavors se mezclan

#### `npm run clean:deep`
- **Comando**: `npm run clean && cd android && ./gradlew clean && cd ../ios && xcodebuild clean`
- **Propósito**: Limpieza profunda de todos los caches (Metro, Gradle, Xcode)
- **Cuándo usar**: Para resolver problemas persistentes de build

---

### 🎯 Scripts de Assets

#### `npm run assets:copy`
- **Comando**: `./scripts/copy-assets.sh`
- **Propósito**: Copia assets dinámicos (imágenes, fuentes) para todos los flavors

#### `npm run assets:copy:bancoNacional`
- **Comando**: `./scripts/copy-assets.sh bancoNacional all`
- **Propósito**: Copia todos los assets específicos de Banco Nacional

#### `npm run assets:copy:bancoPopular`
- **Comando**: `./scripts/copy-assets.sh bancoPopular all`
- **Propósito**: Copia todos los assets específicos de Banco Popular

#### `npm run assets:copy:images:bancoNacional`
- **Comando**: `./scripts/copy-assets.sh bancoNacional images`
- **Propósito**: Copia solo imágenes de Banco Nacional

#### `npm run assets:copy:fonts:bancoNacional`
- **Comando**: `./scripts/copy-assets.sh bancoNacional fonts`
- **Propósito**: Copia solo fuentes de Banco Nacional

#### `npm run assets:copy:all`
- **Comando**: `./scripts/copy-assets.sh all`
- **Propósito**: Copia assets de todos los flavors

---

### ⚙️ Scripts de Configuración

#### `npm run setup:store`
- **Comando**: `echo '📋 Ver documentación: docs/STORE_METADATA.md && docs/IOS_CONFIGURATION.md'`
- **Propósito**: Muestra información sobre configuración de tiendas (Google Play/App Store)

#### `npm run setup:client`
- **Comando**: `./scripts/client-setup.sh`
- **Propósito**: Configura proyecto para un nuevo cliente/banco
- **Proceso**: Crea estrutura de directorios y archivos base

#### `npm run status`
- **Comando**: `./scripts/project-status.sh`
- **Propósito**: Muestra estado completo del proyecto
- **Output**: Versiones, flavors, builds disponibles, dispositivos conectados

---

## 📁 Scripts de la carpeta /scripts

### 🔧 Scripts de Utilidades

#### `scripts/kill-metro.sh`
- **Propósito**: Mata todos los procesos de Metro Bundler que puedan estar corriendo
- **Cuándo usar**: Cuando Metro se queda "colgado" o hay conflictos de puerto
- **Comando interno**: `lsof -ti:8081 | xargs kill -9`

#### `scripts/demo.sh`
- **Propósito**: Script de demostración para mostrar funcionalidades del proyecto
- **Cuándo usar**: Para demostraciones a clientes o nuevos desarrolladores

#### `scripts/project-status.sh`
- **Propósito**: Genera reporte completo del estado del proyecto
- **Output**: Flavors, versiones, builds, dispositivos, keystores, assets

---

### 🎨 Scripts de Assets e Iconos

#### `scripts/copy-assets.sh`
- **Propósito**: Sistema avanzado de copia de assets flavor-específicos
- **Funcionalidad**: 
  - Copia imágenes con sufijos de flavor
  - Maneja fuentes custom por banco
  - Valida integridad de assets
- **Parámetros**: `[flavor] [tipo]` donde tipo puede ser 'images', 'fonts', 'all'

#### `scripts/copy-icons-android.sh`
- **Propósito**: Copia iconos para Android en todas las densidades
- **Densidades**: `mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`
- **Validación**: Verifica que existen iconos para cada flavor

#### `scripts/copy-icons-ios.sh`
- **Propósito**: Copia iconos para iOS en todas las resoluciones requeridas
- **Tamaños**: 20x20 hasta 1024x1024 para AppIcon
- **Proceso**: Actualiza `Contents.json` automáticamente

---

### 🔐 Scripts de Keystores

#### `scripts/generate-keystores.sh`
- **Propósito**: Genera keystores para firmar APKs de producción
- **Proceso**:
  1. Crea directorio `android/keystores/`
  2. Genera keystore para cada banco
  3. Configura `gradle.properties`
  4. Muestra fingerprints para Google Play Console

#### `scripts/keystore-info.sh`
- **Propósito**: Muestra información detallada de keystores existentes
- **Output**: Alias, fingerprints SHA1/SHA256, fechas de expiración

---

### 📱 Scripts de iOS

#### `scripts/ios-setup-simple.sh`
- **Propósito**: Configura iOS para usar bundle IDs dinámicos
- **Proceso**:
  1. Modifica `Info.plist` para usar variables
  2. Crea archivos `.xcconfig` para cada banco
  3. Configura bundle IDs específicos

#### `scripts/ios-simple-bundles.sh`
- **Propósito**: Lanza apps iOS con bundle IDs específicos en simuladores designados
- **Parámetros**: `[banco] [simulador_id]`
- **Proceso**:
  1. Configura variables de entorno (.env)
  2. Modifica temporalmente bundle ID en Info.plist
  3. Compila y lanza en simulador específico
  4. Restaura configuración original

#### `scripts/ios-build-banco-nacional.sh` / `scripts/ios-build-banco-popular.sh`
- **Propósito**: Scripts especializados para builds de iOS de cada banco
- **Estado**: Obsoletos, reemplazados por `ios-simple-bundles.sh`

#### `scripts/setup-ios-targets.sh`
- **Propósito**: Configuración avanzada de targets iOS (no recomendado)
- **Estado**: Experimental, no usar en producción

---

### 🏗️ Scripts de Build y Release

#### `scripts/build-release.sh`
- **Propósito**: Genera builds de release para todas las plataformas
- **Proceso**:
  1. Limpia proyecto
  2. Copia assets e iconos
  3. Genera APKs firmados
  4. Prepara builds de iOS
  5. Genera reporte de release

#### `scripts/version-manager.js`
- **Propósito**: Manejo completo de versiones independientes por flavor
- **Funcionalidades**:
  - Incremento semántico (major.minor.patch)
  - Build numbers independientes
  - Actualización de archivos `.env`
  - Generación de changelogs
  - Validación de versiones

---

### ⚙️ Scripts de Configuración

#### `scripts/client-setup.sh`
- **Propósito**: Configura proyecto para un nuevo cliente/banco
- **Proceso**:
  1. Crea estructura de directorios
  2. Genera archivos de configuración base
  3. Configura assets y iconos placeholder
  4. Actualiza scripts de package.json

---

## 🚀 Ejemplos de Uso

### Desarrollo Diario

```bash
# Iniciar desarrollo de Banco Nacional en Android
npm run android:banco-nacional

# Limpiar cache y reiniciar
npm run clean

# Ver estado del proyecto
npm run status
```

### Preparar Release

```bash
# 1. Incrementar versión
npm run version:bump:bn:patch

# 2. Copiar assets actualizados
npm run assets:copy

# 3. Generar keystores (primera vez)
npm run keystores:generate

# 4. Build de release
npm run build:android:bn:release
```

### Configurar Nuevo Cliente

```bash
# 1. Configurar estructura base
npm run setup:client

# 2. Configurar iOS
npm run ios:setup

# 3. Copiar iconos custom
npm run icons:copy

# 4. Ver qué falta configurar
npm run status
```

### Testing Multi-Device iOS

```bash
# Lanzar en iPhone 15 Pro
npm run ios:launch:bn

# Lanzar en iPhone 16 Pro (mismo banco o diferente)
npm run ios:launch:bp
```

---

## 📝 Notas Importantes

### ⚠️ Scripts Obsoletos
- `ios:bn:release` / `ios:bp:release` - Reemplazados por `ios-simple-bundles.sh`
- `ios-build-banco-*.sh` - Reemplazados por enfoque más simple

### 🔒 Seguridad
- Los keystores contienen claves privadas - NO commitear a git
- Los fingerprints SHA1/SHA256 son públicos y van en Google Play Console

### 🎯 Performance
- Usar `clean` para problemas menores
- Usar `clean:deep` solo para problemas graves (es lento)
- Los scripts de assets validan archivos antes de copiar

### 📱 Multi-Device
- iOS requiere bundle IDs únicos para coexistencia
- Android usa applicationId diferentes automáticamente
- Cada flavor puede tener versiones independientes

---

¿Necesitas más detalles sobre algún script específico? ¡Puedes usar `npm run status` para ver el estado actual del proyecto!