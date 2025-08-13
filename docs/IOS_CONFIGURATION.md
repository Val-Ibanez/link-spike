# 🍎 Configuración iOS para White Label

## 📱 Configurar Schemes en Xcode

### 1. Abrir Xcode
```bash
open ios/MyReactNativeApp.xcworkspace
```

### 2. Crear Schemes por Flavor

#### Banco Nacional Scheme:
1. **Product** → **Scheme** → **Manage Schemes**
2. **Duplicate** el scheme `MyReactNativeApp`
3. Renombrar a `MyReactNativeApp-BancoNacional`
4. **Edit Scheme** → **Build** → **Pre-actions**
5. Agregar **New Run Script Action**:
   ```bash
   cp "${PROJECT_DIR}/../.env.bancoNacional" "${PROJECT_DIR}/../.env"
   ```

#### Banco Popular Scheme:
1. **Duplicate** nuevamente el scheme original
2. Renombrar a `MyReactNativeApp-BancoPopular`
3. **Edit Scheme** → **Build** → **Pre-actions**
4. Agregar **New Run Script Action**:
   ```bash
   cp "${PROJECT_DIR}/../.env.bancoPopular" "${PROJECT_DIR}/../.env"
   ```

### 3. Configurar Bundle IDs por Flavor

#### En Build Settings:
1. Seleccionar **MyReactNativeApp** target
2. **Build Settings** → **Packaging**
3. Configurar **Product Bundle Identifier**:

   **Debug:**
   - `com.myreactnativeapp.banconacional` (para Banco Nacional)
   - `com.myreactnativeapp.bancopopular` (para Banco Popular)

   **Release:**
   - Mismos Bundle IDs

### 4. Configurar App Icons por Flavor

#### Crear Asset Catalogs separados:
1. **File** → **New** → **File** → **iOS** → **Resource** → **App Icons & Launch Images** → **App Icon**
2. Nombrar: `AppIcon-BancoNacional`
3. Repetir para `AppIcon-BancoPopular`

#### Asignar iconos por configuration:
1. **Build Settings** → **Asset Catalog App Icon Set Name**
2. **Debug**: `AppIcon-BancoNacional` o `AppIcon-BancoPopular`
3. **Release**: Mismo icono respectivo

### 5. Configurar Info.plist por Flavor

#### Crear Info.plist separados (opcional):
```
ios/MyReactNativeApp/Info-BancoNacional.plist
ios/MyReactNativeApp/Info-BancoPopular.plist
```

#### En Build Settings → Packaging:
- **Info.plist File**: Asignar el plist correcto por configuración

## 🚀 Scripts de Build

### Build Development:
```bash
npm run ios:banco-nacional    # Banco Nacional
npm run ios:banco-popular     # Banco Popular
```

### Build Release:
```bash
npm run ios:banco-nacional:release    # Archive para App Store
npm run ios:banco-popular:release     # Archive para App Store
```

## 📱 App Store Connect

### Configuración por App:

#### Banco Nacional:
- **Bundle ID**: `com.myreactnativeapp.banconacional`
- **App Name**: "Banco Nacional"
- **SKU**: `banco-nacional-app`

#### Banco Popular:
- **Bundle ID**: `com.myreactnativeapp.bancopopular`
- **App Name**: "Banco Popular"  
- **SKU**: `banco-popular-app`

## 🎨 App Icons

### Ubicaciones:
```
ios/MyReactNativeApp/Images.xcassets/
├── AppIcon-BancoNacional.appiconset/
│   ├── Contents.json
│   ├── Icon-App-20x20@1x.png
│   ├── Icon-App-20x20@2x.png
│   └── ... (todos los tamaños iOS)
└── AppIcon-BancoPopular.appiconset/
    ├── Contents.json
    ├── Icon-App-20x20@1x.png
    └── ... (todos los tamaños iOS)
```

### Tamaños requeridos:
- **20x20**: @1x, @2x, @3x
- **29x29**: @1x, @2x, @3x  
- **40x40**: @1x, @2x, @3x
- **60x60**: @2x, @3x
- **76x76**: @1x, @2x
- **83.5x83.5**: @2x
- **1024x1024**: @1x (App Store)

## ✅ Verificación

### Comprobar configuración:
```bash
# Verificar Bundle IDs diferentes
xcodebuild -list -workspace ios/MyReactNativeApp.xcworkspace

# Build de testing
npm run ios:banco-nacional
npm run ios:banco-popular
```

### Resultado esperado:
- ✅ **2 apps separadas** instalables simultáneamente
- ✅ **Bundle IDs únicos** por flavor
- ✅ **Iconos diferentes** por banco
- ✅ **Configuraciones independientes** (.env respectivos)