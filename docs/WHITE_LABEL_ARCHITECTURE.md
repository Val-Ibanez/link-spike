# Arquitectura de Marca Blanca - App de Adquirencia

## 🏗️ Estructura del Proyecto

```
MyReactNativeApp/
├── app/                          # Código común compartido
│   ├── core/                     # Funcionalidades principales
│   │   ├── types/               # Definiciones TypeScript
│   │   ├── themes/              # Sistema de temas
│   │   ├── utils/               # Utilidades comunes
│   │   └── ConfigManager.ts     # Gestor de configuración
│   ├── components/              # Componentes UI reutilizables
│   ├── services/                # APIs, autenticación, etc.
│   └── screens/                 # Pantallas de la aplicación
│
├── flavors/                      # Configuraciones por banco
│   ├── bancoNacional/
│   │   ├── config/
│   │   │   ├── config.json      # Configuración del banco
│   │   │   └── build.json       # Configuración de build
│   │   └── assets/              # Assets específicos del banco
│   │       ├── images/
│   │       └── fonts/
│   └── bancoPopular/
│       ├── config/
│       └── assets/
│
├── scripts/                      # Scripts de automatización
│   ├── build_release.sh         # Build automático por flavor
│   └── changelog_generator.js   # Generador de changelog
│
├── ci/                          # Configuración CI/CD
├── test/                        # Tests compartidos
└── docs/                        # Documentación
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
# Build para Banco Nacional en desarrollo
./scripts/build_release.sh bancoNacional development android

# Build para Banco Popular en producción
./scripts/build_release.sh bancoPopular production android
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

- **Banco Nacional**: `com.banconacional.pos`
- **Banco Popular**: `com.bancopopular.acquire`
- Diferentes iconos, nombres, configuraciones

## 🚀 Comandos Disponibles

### Build por Flavor

```bash
# Scripts rápidos desde package.json
npm run flavor:banco-nacional:dev
npm run flavor:banco-nacional:prod
npm run flavor:banco-popular:dev
npm run flavor:banco-popular:prod

# Script directo con más opciones
./scripts/build_release.sh [flavor] [environment] [platform]

# Ejemplos:
./scripts/build_release.sh bancoNacional production android
./scripts/build_release.sh bancoPopular development ios
./scripts/build_release.sh bancoNacional staging both
```

### Gestión de Versiones

```bash
npm run version:patch   # 1.0.0 → 1.0.1
npm run version:minor   # 1.0.0 → 1.1.0
npm run version:major   # 1.0.0 → 2.0.0
```

### Testing

```bash
npm test                # Tests comunes
npm run test:flavor     # Tests específicos por flavor
```

## 📋 Configuración de Flavor

### config.json

Define las características del banco:

```json
{
  "id": "banco-nacional",
  "displayName": "Banco Nacional",
  "theme": {
    "primary": "#0066CC",
    "secondary": "#004499"
  },
  "features": {
    "qrPayments": true,
    "multiCurrency": false
  },
  "api": {
    "baseUrl": "https://api.banconacional.com"
  }
}
```

### build.json

Configuración específica del build:

```json
{
  "appName": "Banco Nacional POS",
  "bundleId": "com.banconacional.pos",
  "environments": {
    "development": { "suffix": ".dev" },
    "production": { "suffix": "" }
  }
}
```

## 🎨 Sistema de Temas

Cada flavor tiene su tema personalizado que se aplica automáticamente:

```typescript
// El ConfigManager carga automáticamente el flavor correcto
const theme = configManager.getTheme();

// Los componentes usan el tema actual
const styles = createThemedStyles(theme);
```

## 🔧 Features por Flavor

Las características se habilitan/deshabilitan por banco:

```typescript
// Verificar si una feature está habilitada
if (featureFlags.isQrPaymentsEnabled()) {
  // Mostrar opción de QR
}

if (featureFlags.isMultiCurrencyEnabled()) {
  // Mostrar selector de monedas
}
```

## 📦 Distribución

### Desarrollo

```bash
# Banco Nacional desarrollo
FLAVOR=bancoNacional npm start
npm run android

# Banco Popular desarrollo  
FLAVOR=bancoPopular npm start
npm run android
```

### Producción

```bash
# Build release para distribución
./scripts/build_release.sh bancoNacional production android
./scripts/build_release.sh bancoPopular production android

# Outputs:
# - android/app/build/outputs/apk/release/banco-nacional-release.apk
# - android/app/build/outputs/apk/release/banco-popular-release.apk
```

## 🔄 Agregar Nuevo Banco

1. **Crear estructura**:
   ```bash
   mkdir -p flavors/nuevoBank/{config,assets/{images,fonts}}
   ```

2. **Configurar banco**:
   ```bash
   cp flavors/bancoNacional/config/config.json flavors/nuevoBank/config/
   # Editar con datos del nuevo banco
   ```

3. **Agregar assets**:
   ```bash
   # Copiar logos, iconos, fonts específicos
   cp logos/* flavors/nuevoBank/assets/images/
   ```

4. **Actualizar scripts**:
   ```json
   {
     "flavor:nuevo-bank:prod": "./scripts/build_release.sh nuevoBank production android"
   }
   ```

5. **Build y test**:
   ```bash
   npm run flavor:nuevo-bank:dev
   ```

## 🧪 Testing por Flavor

```bash
# Test con flavor específico
FLAVOR=bancoNacional npm test

# Test de todos los flavors
npm run test:all-flavors
```

## 📱 Resultado Final

Cada flavor genera una app completamente independiente:

- **Apps diferentes** en las stores
- **Bundle IDs únicos** para distribución
- **Configuraciones específicas** por banco
- **No hay selección** de banco en runtime
- **Builds reproducibles** y automatizados

Esta arquitectura permite escalar fácilmente a múltiples bancos manteniendo un código base común y configuraciones específicas separadas.