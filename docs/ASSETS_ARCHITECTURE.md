# 🎨 Arquitectura de Assets Optimizada

## 📁 **Estructura Final (Sin Duplicaciones)**

```
assets/
├── flavors/                     ← 📥 SOURCE: Assets originales del cliente
│   ├── bancoNacional/
│   │   ├── images/              ← Imágenes originales del banco
│   │   │   ├── logo.png
│   │   │   └── background.png
│   │   ├── fonts/               ← Fuentes específicas del banco
│   │   │   └── BancoNacional-Regular.ttf
│   │   └── CLIENT_ASSETS_GUIDE.md
│   └── bancoPopular/
│       ├── images/
│       ├── fonts/
│       └── CLIENT_ASSETS_GUIDE.md
├── images/                      ← 📤 PROCESSED: Para React Native
│   ├── logo-bancoNacional.png   ← Assets procesados y renombrados
│   ├── background-bancoNacional.png
│   ├── logo-bancoPopular.png
│   ├── background-bancoPopular.png
│   └── default-*.png            ← Fallbacks
├── fonts/                       ← Fuentes globales
└── icons/                       ← Iconos globales

flavors/                         ← ✅ SOLO CONFIGURACIÓN
├── bancoNacional/
│   └── config/                  ← Sin assets duplicados
└── bancoPopular/
    └── config/                  ← Sin assets duplicados
```

## 🎯 **Principios de la Arquitectura**

### **1. Separación de Responsabilidades**
- **`assets/flavors/`**: Assets originales del cliente (SOURCE)
- **`assets/images/`**: Assets procesados para React Native (PROCESSED)
- **`flavors/*/config/`**: Solo configuración, sin assets

### **2. Procesamiento Automático**
```bash
# Source → Processed
assets/flavors/bancoNacional/images/logo.png
    ↓ (scripts/assets-processor.js)
assets/images/logo-bancoNacional.png
```

### **3. Convenciones de Naming**
```
SOURCE:     logo.png
PROCESSED:  logo-{flavor}.png
IMPORT:     require('assets/images/logo-bancoNacional.png')
```

## 🔧 **Scripts de Gestión**

### **Comandos Principales**
```bash
# Listar todos los assets disponibles
npm run assets:list

# Validar integridad de assets
npm run assets:validate

# Procesar assets (source → processed)
npm run assets:process

# Procesar solo un banco específico
npm run assets:process:bn      # Banco Nacional
npm run assets:process:bp      # Banco Popular

# Limpiar assets procesados
npm run assets:clean
```

### **Validación Automática**
```bash
# Verifica que existan:
✅ assets/flavors/{banco}/images/logo.png
✅ assets/flavors/{banco}/images/background.png
✅ assets/images/logo-{banco}.png (procesado)
✅ assets/images/background-{banco}.png (procesado)
```

## 🏗️ **Flujo de Trabajo**

### **1. Cliente Envía Assets**
```
cliente-assets/
├── logo.png
├── background.png
└── fonts/
    └── MiFuente-Regular.ttf
```

### **2. Desarrollador Instala**
```bash
# Copiar a SOURCE
cp -r cliente-assets/* assets/flavors/nuevoBanco/

# Procesar automáticamente
npm run assets:process nuevoBanco
```

### **3. Verificar Instalación**
```bash
# Validar que todo esté correcto
npm run assets:validate

# Ver resultado
npm run assets:list
```

### **4. Actualizar AssetManager**
```typescript
// app/core/utils/AssetManager.ts
const FLAVOR_ASSETS = {
  nuevoBanco: {
    images: {
      logo: require('../../../assets/images/logo-nuevoBanco.png'),
      background: require('../../../assets/images/background-nuevoBanco.png'),
    },
    fonts: {
      regular: 'MiFuente-Regular',
    }
  }
};
```

## ✅ **Ventajas de Esta Arquitectura**

### **🚀 Para Desarrolladores**
- **Sin duplicación**: Una sola fuente de verdad por tipo de asset
- **Automatizado**: Scripts manejan todo el procesamiento
- **Escalable**: Agregar nuevos bancos es trivial
- **Mantenible**: Estructura clara y predecible

### **🏦 Para Clientes**
- **Proceso simple**: Solo envían carpeta con sus assets
- **Sin complejidad técnica**: No necesitan conocer React Native
- **Assets preservados**: Originales se mantienen intactos

### **📱 Para React Native**
- **Importaciones estáticas**: Metro bundler funciona perfectamente
- **Rutas predecibles**: require() con paths fijos
- **Optimización**: Solo se incluyen assets necesarios

## 🔍 **Diferencias con Arquitectura Anterior**

| Aspecto | ❌ Antes | ✅ Ahora |
|---------|----------|----------|
| **Duplicación** | `flavors/*/assets/` + `assets/flavors/` | Solo `assets/flavors/` |
| **Carpetas vacías** | Si, en `flavors/` | No |
| **Procesamiento** | Manual | Automatizado |
| **Validación** | No | Scripts integrados |
| **Escalabilidad** | Limitada | Excelente |
| **Mantenimiento** | Complejo | Simple |

## 🧹 **Limpieza Realizada**

### **Eliminado:**
```
❌ flavors/bancoNacional/assets/    (vacío)
❌ flavors/bancoPopular/assets/     (vacío)
```

### **Mantenido y Optimizado:**
```
✅ assets/flavors/                  (SOURCE - assets originales)
✅ assets/images/                   (PROCESSED - para React Native)
✅ flavors/*/config/                (CONFIGURACIÓN - sin assets)
```

## 🎯 **Próximos Pasos**

1. **Agregar validación CI/CD**: Script en pipeline para verificar assets
2. **Optimización automática**: Compresión de imágenes durante procesamiento
3. **Gestión de iconos**: Extender para iconos de aplicación por banco
4. **Multi-resolución**: Soporte para @2x, @3x automático

## 🔧 **Troubleshooting**

### **Error: Asset no encontrado**
```bash
# Verificar que existe el source
ls assets/flavors/{banco}/images/

# Procesar assets
npm run assets:process:{banco}

# Validar resultado
npm run assets:validate
```

### **Error: Duplicación detectada**
```bash
# Limpiar y reprocesar
npm run assets:clean
npm run assets:process
```

### **Agregar nuevo banco**
```bash
# 1. Crear estructura
mkdir -p assets/flavors/nuevoBanco/{images,fonts}

# 2. Copiar assets del cliente
cp cliente-logo.png assets/flavors/nuevoBanco/images/logo.png

# 3. Procesar
npm run assets:process nuevoBanco

# 4. Actualizar AssetManager.ts
```

¡Arquitectura optimizada y sin duplicaciones! 🚀