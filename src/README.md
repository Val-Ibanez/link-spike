# 🏗️ Estructura de Código Fuente - MyReactNativeApp

## 📁 **Organización de la Carpeta `src/`**

Esta carpeta contiene todo el código fuente de la aplicación, organizado siguiendo las mejores prácticas de React Native y la arquitectura de flavors.

```
src/
├── main/                    # 🎯 Código principal compartido
│   ├── components/          # Componentes reutilizables
│   ├── screens/            # Pantallas de la aplicación
│   ├── navigation/         # Configuración de navegación
│   ├── hooks/              # Custom hooks
│   ├── services/           # Servicios (API, etc.)
│   ├── core/               # Lógica central de la app
│   └── design-system/      # Sistema de diseño
├── bancoEntreRios/         # 🏦 Código específico del banco
│   ├── components/         # Componentes personalizados
│   ├── screens/            # Pantallas específicas
│   └── assets/             # Assets específicos
├── bancoSantaCruz/         # 🏦 Código específico del banco
│   ├── components/
│   ├── screens/
│   └── assets/
├── bancoSantaFe/           # 🏦 Código específico del banco
│   ├── components/
│   ├── screens/
│   └── assets/
└── index.ts                # 📤 Punto de entrada principal
```

## 🎯 **Cómo Funciona la Arquitectura**

### **1. Código Compartido (`src/main/`):**
- **Componentes genéricos** que funcionan para todos los bancos
- **Lógica de negocio** común
- **Navegación** base
- **Sistema de diseño** compartido

### **2. Código Específico por Banco:**
- **Componentes personalizados** con branding específico
- **Pantallas adaptadas** a las necesidades del banco
- **Configuraciones** únicas por cliente
- **Assets específicos** (imágenes, iconos, etc.)

### **3. Importaciones Inteligentes:**
```typescript
// Importar desde el archivo principal
import { BancoEntreRiosHeader } from 'src/bancoEntreRios/components/BancoEntreRiosHeader';
import { BancoSantaCruzHeader } from 'src/bancoSantaCruz/components/BancoSantaCruzHeader';

// O usar el archivo de índice
import { BancoEntreRiosHeader, BancoSantaCruzHeader } from 'src/';
```

## 🚀 **Uso en la Aplicación**

### **Componentes Específicos por Banco:**
```typescript
// En tu pantalla principal
import React from 'react';
import { View } from 'react-native';
import { BancoEntreRiosHeader } from 'src/bancoEntreRios/components/BancoEntreRiosHeader';

export const HomeScreen = () => {
  return (
    <View>
      <BancoEntreRiosHeader title="Bienvenido" />
      {/* Resto del contenido */}
    </View>
  );
};
```

### **Configuraciones por Banco:**
```typescript
import { bancoEntreRiosConfig } from 'src/bancoEntreRios/config';

// Usar la configuración específica
const theme = bancoEntreRiosConfig.theme;
const features = bancoEntreRiosConfig.features;
```

## 🔧 **Agregar Nuevos Componentes**

### **Para un Banco Específico:**
```bash
# Crear componente para Banco Entre Ríos
touch src/bancoEntreRios/components/MiComponente.tsx

# Crear pantalla específica
touch src/bancoEntreRios/screens/MiPantalla.tsx
```

### **Para Código Compartido:**
```bash
# Crear componente compartido
touch src/main/components/MiComponenteCompartido.tsx

# Crear hook compartido
touch src/main/hooks/useMiHook.ts
```

## 📱 **Builds por Flavor**

### **Android:**
```bash
npm run android:banco-entre-rios      # Incluye src/bancoEntreRios/
npm run android:banco-santa-cruz      # Incluye src/bancoSantaCruz/
npm run android:banco-santa-fe        # Incluye src/bancoSantaFe/
```

### **iOS:**
```bash
npm run ios:banco-entre-rios          # Incluye src/bancoEntreRios/
npm run ios:banco-santa-cruz          # Incluye src/bancoSantaCruz/
npm run ios:banco-santa-fe            # Incluye src/bancoSantaFe/
```

## 🎨 **Personalización por Banco**

### **Temas y Colores:**
- **Banco Entre Ríos**: Azul (#1e3a8a)
- **Banco Santa Cruz**: Verde (#059669)
- **Banco Santa Fe**: Rojo (#dc2626)

### **Features Habilitadas:**
- **Banco Entre Ríos**: QR, Contactless, Cuotas
- **Banco Santa Cruz**: QR, Contactless, Cuotas, Multi-moneda
- **Banco Santa Fe**: QR, Contactless, Cuotas, Inversiones

## 📋 **Convenciones de Nomenclatura**

### **Archivos:**
- **Componentes**: PascalCase (ej: `BancoEntreRiosHeader.tsx`)
- **Hooks**: camelCase con prefijo `use` (ej: `useFeatureFlag.ts`)
- **Utilidades**: camelCase (ej: `formatCurrency.ts`)
- **Tipos**: PascalCase (ej: `UserProfile.ts`)

### **Carpetas:**
- **Componentes**: `components/`
- **Pantallas**: `screens/`
- **Hooks**: `hooks/`
- **Servicios**: `services/`
- **Utilidades**: `utils/`

## 🔍 **Ventajas de esta Estructura**

### **✅ Separación Clara:**
- Código compartido vs. código específico
- Fácil identificar qué pertenece a cada banco
- Mantenimiento simplificado

### **✅ Escalabilidad:**
- Agregar nuevos bancos es simple
- Código reutilizable entre flavors
- Configuraciones independientes

### **✅ Builds Optimizados:**
- Solo se incluye el código necesario
- APKs/IPAs más pequeños
- Mejor rendimiento

## 🚨 **Importante**

### **✅ Hacer:**
- Colocar código específico en su carpeta correspondiente
- Mantener código compartido en `src/main/`
- Usar el archivo `index.ts` para exportaciones

### **❌ NO Hacer:**
- Mezclar código de diferentes bancos
- Duplicar lógica que debería estar en `src/main/`
- Ignorar la estructura de carpetas

---

**🎯 Objetivo**: Mantener el código organizado, escalable y fácil de mantener para cada cliente del banco.

