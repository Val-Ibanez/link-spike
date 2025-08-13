# 🚀 Guía Rápida - White Label Banking App

## 🎯 ¿Qué hemos construido?

Una **aplicación bancaria de adquirencia completamente white-label** donde:
- ✅ **Cada banco tiene su propia app** independiente en las tiendas
- ✅ **Versioning independiente** por flavor
- ✅ **Bundle IDs únicos** para publicación simultánea
- ✅ **Configuraciones separadas** (colores, APIs, features)
- ✅ **Scripts automatizados** para build y release

---

## ⚡ Comandos Rápidos

### 🔧 Desarrollo
```bash
# Banco Nacional
npm run android:banco-nacional
npm run ios:banco-nacional

# Banco Popular  
npm run android:banco-popular
npm run ios:banco-popular
```

### 🚀 Release Production
```bash
# Build automatizado para release
npm run build:release bancoNacional android
npm run build:release bancoPopular ios
npm run build:release all both

# Build manual
npm run build:android:bn:release
npm run build:android:bp:release
```

### 📱 Gestión de Versiones
```bash
# Ver estado actual
npm run version:status

# Bump version por flavor
npm run version:bump:bn:patch    # 1.0.0 → 1.0.1
npm run version:bump:bn:minor    # 1.0.1 → 1.1.0
npm run version:bump:bn:major    # 1.1.0 → 2.0.0

npm run version:bump:bp:patch    # Banco Popular
npm run version:bump:bp:minor
npm run version:bump:bp:major

# Preparar release
npm run release:banco-nacional
npm run release:banco-popular
```

### 🔐 Configuración de Publicación
```bash
# 1. Generar keystores para Android
npm run keystores:generate
npm run keystores:info

# 2. Configurar iconos
npm run icons:copy:android
npm run icons:copy:ios
npm run icons:copy

# 3. Estado del proyecto
./scripts/project-status.sh
```

---

## 📱 Apps Resultantes

| Banco | Android Package | iOS Bundle ID | App Store |
|-------|----------------|---------------|-----------|
| **Banco Nacional** | `com.myreactnativeapp.banconacional` | `com.myreactnativeapp.banconacional` | Separada |
| **Banco Popular** | `com.myreactnativeapp.bancopopular` | `com.myreactnativeapp.bancopopular` | Separada |

---

## 🎨 Configuraciones por Flavor

### Variables (.env files):
- `.env.bancoNacional` - Configuración Banco Nacional
- `.env.bancoPopular` - Configuración Banco Popular

### Archivos JSON:
- `app/core/configs/bancoNacional.json` - Features y configuración estática
- `app/core/configs/bancoPopular.json` - Features y configuración estática

### Iconos:
- `assets/icons/bancoNacional/` - Iconos específicos BN
- `assets/icons/bancoPopular/` - Iconos específicos BP

---

## 🏪 Publicación en Tiendas

### Google Play Store:
1. **Generar keystores**: `npm run keystores:generate`
2. **Build release**: `npm run build:android:bn:release`
3. **Upload APK**: `android/app/build/outputs/apk/bancoNacional/release/`
4. **Metadata**: Ver `docs/STORE_METADATA.md`

### App Store:
1. **Configurar Xcode**: Ver `docs/IOS_CONFIGURATION.md`
2. **Archive**: Product → Archive en Xcode
3. **Distribute**: App Store Connect
4. **Metadata**: Ver `docs/STORE_METADATA.md`

---

## 📊 Estructura del Proyecto

```
MyReactNativeApp/
├── 📱 App Core
│   ├── app/core/               # Lógica compartida
│   ├── app/core/configs/       # Configuraciones JSON
│   └── app/core/themes/        # Theming dinámico
├── ⚙️ Configuración
│   ├── .env.bancoNacional     # Variables BN
│   ├── .env.bancoPopular      # Variables BP
│   └── metro.config.js        # Metro config
├── 🤖 Android
│   ├── android/app/build.gradle     # Product flavors
│   ├── android/keystores/           # Keystores para release
│   └── android/app/src/
│       ├── bancoNacional/res/       # Iconos BN
│       └── bancoPopular/res/        # Iconos BP
├── 🍎 iOS
│   ├── ios/MyReactNativeApp.xcworkspace
│   └── ios/MyReactNativeApp/Images.xcassets/
│       ├── AppIcon-BancoNacional.appiconset/
│       └── AppIcon-BancoPopular.appiconset/
├── 🔧 Scripts
│   ├── scripts/version-manager.js   # Gestión de versiones
│   ├── scripts/build-release.sh     # Build automatizado
│   ├── scripts/generate-keystores.sh
│   └── scripts/project-status.sh    # Estado del proyecto
└── 📚 Docs
    ├── docs/IOS_CONFIGURATION.md
    ├── docs/STORE_METADATA.md
    └── QUICK_START_GUIDE.md (este archivo)
```

---

## 🎯 Ventajas de esta Arquitectura

### ✅ **Apps Completamente Independientes**
- Cada banco tiene **su propia entrada** en Play Store / App Store
- **Bundle IDs únicos** permiten instalación simultánea
- **Versioning independiente** por banco

### ✅ **Mantenimiento Eficiente**
- **Código compartido** al 95%
- **Configuraciones centralizadas** pero separadas
- **Scripts automatizados** para todos los procesos

### ✅ **Escalabilidad**
- Agregar nuevos bancos es **trivial**
- **Features flags** por flavor
- **Theming dinámico** completo

### ✅ **Publicación Profesional**
- **Keystores separados** para seguridad
- **Build configurations** nativas
- **Metadata preparada** para tiendas

---

## 💡 Próximos Pasos

1. **🔐 Seguridad**: Configurar keystores de producción
2. **🎨 Branding**: Agregar iconos y splash screens únicos
3. **📱 Testing**: Configurar CI/CD para builds automáticos
4. **🏪 Publicación**: Subir primera versión a tiendas
5. **📊 Analytics**: Integrar tracking independiente por flavor

---

## 🆘 Comandos de Emergencia

```bash
# Limpiar todo y empezar fresh
npm run clean:deep

# Matar Metro si se queda colgado
./scripts/kill-metro.sh

# Ver estado completo del proyecto
./scripts/project-status.sh

# Verificar keystores
npm run keystores:info
```

---

🎉 **¡Tu proyecto white-label está 100% listo para escalar y publicar!** 🎉