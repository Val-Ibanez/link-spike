# 🏦 Sistema de Flavors - MyReactNativeApp

## 📁 **Estructura de Flavors**

Cada banco tiene su propia configuración y assets completamente independientes:

```
flavors/
├── bancoEntreRios/
│   ├── assets/
│   │   ├── images/          # Imágenes específicas del banco
│   │   ├── icons/           # Iconos de app (Android/iOS)
│   │   └── fonts/           # Fuentes personalizadas
│   └── config/
│       ├── build.json       # Configuración de build
│       └── config.json      # Configuración de la app
├── bancoSantaCruz/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   └── config/
└── bancoSantaFe/
    ├── assets/
    │   ├── images/
    │   ├── icons/
    │   └── fonts/
    └── config/
```

## 🎨 **Assets por Flavor**

### **Imágenes (`assets/images/`):**
- `logo-banco-[nombre].svg` - Logo principal del banco
- `default-logo.png` - Logo por defecto
- `default-background.png` - Fondo por defecto
- `default-splash.png` - Pantalla de splash
- `default-onboarding.png` - Imagen de onboarding

### **Iconos (`assets/icons/`):**
- `android/` - Iconos específicos para Android
- `ios/` - Iconos específicos para iOS

### **Fuentes (`assets/fonts/`):**
- Fuentes personalizadas del banco (TTF/OTF)

## 🚀 **Uso de Flavors**

### **Android:**
```bash
# Banco Entre Ríos
npm run android:banco-entre-rios

# Banco Santa Cruz
npm run android:banco-santa-cruz

# Banco Santa Fe
npm run android:banco-santa-fe
```

### **iOS:**
```bash
# Banco Entre Ríos
npm run ios:banco-entre-rios

# Banco Santa Cruz
npm run ios:banco-santa-cruz

# Banco Santa Fe
npm run ios:banco-santa-fe
```

## 🔧 **Configuración Automática**

### **React Native CLI:**
- **Automáticamente** incluye los assets del flavor seleccionado
- **No necesitas** scripts personalizados para copiar assets
- **Build optimizado** por flavor

### **Gradle (Android):**
- Incluye automáticamente `src/bancoEntreRios/` en el build
- Assets específicos del flavor se incluyen en el APK
- Configuración independiente por banco

### **Xcode (iOS):**
- Targets separados para cada banco
- Assets específicos incluidos automáticamente
- Bundle IDs únicos por banco

## 📋 **Agregar Nuevos Assets**

### **1. Crear el Asset:**
```bash
# Para Banco Entre Ríos
cp mi-nuevo-logo.png flavors/bancoEntreRios/assets/images/

# Para Banco Santa Cruz
cp mi-nuevo-logo.png flavors/bancoSantaCruz/assets/images/

# Para Banco Santa Fe
cp mi-nuevo-logo.png flavors/bancoSantaFe/assets/images/
```

### **2. Usar en el Código:**
```typescript
// Los assets se cargan automáticamente según el flavor
import { Image } from 'react-native';

<Image source={require('../../flavors/bancoEntreRios/assets/images/logo.png')} />
```

## 🎯 **Ventajas de esta Arquitectura**

### **✅ Separación Clara:**
- Cada banco tiene sus assets independientes
- No hay conflictos entre flavors
- Fácil mantenimiento por cliente

### **✅ Build Automático:**
- No necesitas scripts de copia
- React Native CLI maneja todo
- Builds más rápidos y confiables

### **✅ Escalabilidad:**
- Fácil agregar nuevos bancos
- Assets específicos por región
- Configuración independiente

## 🚨 **Importante**

### **NUNCA:**
- ❌ Mover assets entre flavors manualmente
- ❌ Modificar assets de un flavor desde otro
- ❌ Usar scripts de copia obsoletos

### **SÍ:**
- ✅ Colocar assets en el directorio correcto del flavor
- ✅ Usar la estructura estándar de React Native
- ✅ Dejar que el CLI maneje la inclusión automática

## 📚 **Documentación Relacionada**

- `docs/WHITE_LABEL_ARCHITECTURE.md` - Arquitectura completa
- `docs/ASSETS_ARCHITECTURE.md` - Gestión de assets
- `docs/CLIENT_PUBLISHING_GUIDE.md` - Guía de publicación

---

**🎯 Objetivo**: Cada flavor es completamente independiente y se puede desarrollar, construir y publicar por separado.