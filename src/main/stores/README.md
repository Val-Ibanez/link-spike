# 🏦 Zustand Stores - Documentación

## 📋 Descripción General

Este proyecto utiliza **Zustand** como solución de estado global, reemplazando el sistema anterior de Context API. Zustand proporciona una gestión de estado simple, eficiente y fácil de usar.

## 🚀 Características Principales

- **✅ Simplicidad extrema** - Menos boilerplate que Redux
- **✅ Persistencia automática** - Datos guardados en AsyncStorage
- **✅ TypeScript nativo** - Tipado completo y seguro
- **✅ React Native optimizado** - Excelente rendimiento en móvil
- **✅ Hooks de conveniencia** - Fácil acceso al estado

## 🏗️ Estructura de Stores

### 1. **Flavor Store** (`flavorStore.ts`)
Maneja la configuración del flavor actual (banco).

```typescript
import { useFlavorStore, useCurrentFlavor, useCurrentConfig } from '../stores';

// En un componente
const { currentFlavor, setFlavor } = useFlavorStore();
const currentConfig = useCurrentConfig();

// Cambiar flavor
await setFlavor('bancoSantaCruz');
```

### 2. **App Store** (`appStore.ts`)
Estado general de la aplicación.

```typescript
import { useAppStore, useAppSettings } from '../stores';

const { theme, language, notifications } = useAppSettings();
const { setTheme, setLanguage } = useAppStore();
```

### 3. **User Store** (`userStore.ts`)
Estado del usuario autenticado.

```typescript
import { useUserStore, useUser, useIsAuthenticated } from '../stores';

const user = useUser();
const isAuthenticated = useIsAuthenticated();
const { login, logout } = useUserStore();
```

### 4. **Payment Store** (`paymentStore.ts`)
Estado de pagos y transacciones.

```typescript
import { usePaymentStore, useTransactions } from '../stores';

const transactions = useTransactions();
const { addTransaction } = usePaymentStore();
```

## 🎯 Hook Combinado Principal

### **useApp()** - Hook principal que integra todos los stores

```typescript
import { useApp } from '../stores';

const {
  // Estado
  currentFlavor,
  currentConfig,
  user,
  isAuthenticated,
  transactions,
  
  // Acciones
  initializeApp,
  changeFlavor,
  login,
  logout,
  addTransaction,
  
  // Helpers
  isLoading,
  isFirstLaunch
} = useApp();
```

### **useFlavorConfig()** - Hook específico para configuración del flavor

```typescript
import { useFlavorConfig } from '../stores';

const {
  config,
  flavor,
  theme,
  features,
  logo,
  api,
  payment,
  support
} = useFlavorConfig();
```

## 📱 Ejemplo de Uso Completo

```typescript
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useApp, useFlavorConfig } from '../stores';

export const DashboardScreen: React.FC = () => {
  const { 
    currentFlavor, 
    changeFlavor, 
    user, 
    login, 
    isLoading 
  } = useApp();
  
  const { theme, features, logo } = useFlavorConfig();

  useEffect(() => {
    // Inicializar la app al montar
    initializeApp();
  }, []);

  const handleFlavorChange = async () => {
    try {
      await changeFlavor('bancoEntreRios');
    } catch (error) {
      console.error('Error cambiando flavor:', error);
    }
  };

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.primary }}>
        Bienvenido a {currentFlavor}
      </Text>
      
      {features.showQuickActions && (
        <Button title="Cambiar Flavor" onPress={handleFlavorChange} />
      )}
      
      {user ? (
        <Text>Usuario: {user.firstName}</Text>
      ) : (
        <Button title="Iniciar Sesión" onPress={() => login(mockUser, 'token')} />
      )}
    </View>
  );
};
```

## 🔧 Migración desde el Sistema Anterior

### Antes (Context API):
```typescript
import { useTheme } from '../core/themes/ThemeProvider';

const { theme, tenantConfig } = useTheme();
```

### Ahora (Zustand):
```typescript
import { useFlavorConfig } from '../stores';

const { theme, config: tenantConfig } = useFlavorConfig();
```

## 💾 Persistencia de Datos

Todos los stores incluyen persistencia automática usando AsyncStorage:

- **Flavor Store**: Guarda el flavor actual
- **App Store**: Guarda configuraciones del usuario
- **User Store**: Guarda datos del usuario y token
- **Payment Store**: Guarda transacciones y configuración

## 🎨 Ventajas de Zustand

1. **🚀 Rendimiento**: Re-renders optimizados
2. **📱 React Native**: Nativamente optimizado para móvil
3. **🔧 Simplicidad**: API minimalista y fácil de entender
4. **💾 Persistencia**: Integración nativa con AsyncStorage
5. **🎯 TypeScript**: Soporte completo de tipos
6. **📚 Documentación**: Excelente documentación oficial

## 🚨 Consideraciones Importantes

1. **AsyncStorage**: Asegúrate de tener instalado `@react-native-async-storage/async-storage`
2. **Inicialización**: Usa `initializeApp()` al montar tu app principal
3. **Error Handling**: Maneja errores en las acciones async
4. **Performance**: Usa selectores específicos para evitar re-renders innecesarios

## 📚 Recursos Adicionales

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Native AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [TypeScript con Zustand](https://github.com/pmndrs/zustand#typescript)
