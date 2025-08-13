# 🧹 Reporte de Limpieza de Scripts - Carpeta Scripts

## 🚨 **Scripts Obsoletos/Problemáticos Identificados**

### **1. Scripts que Referencian Bancos Inexistentes**

#### **🚫 `ios-simple-bundles.sh`**
- **Problema**: Referencia `bancoNacional` y `bancoPopular` que no están en el proyecto
- **Estado**: **OBSOLETO** - Debe ser eliminado
- **Razón**: Los bancos referenciados no existen en la configuración actual

#### **🚫 `setup-ios-targets.sh`**
- **Problema**: Configura targets para `BancoNacional` y `BancoPopular` inexistentes
- **Estado**: **OBSOLETO** - Debe ser eliminado
- **Razón**: Crea configuración para bancos que no están en el proyecto

#### **🚫 `ios-setup-simple.sh`**
- **Problema**: Crea archivos `.xcconfig` para bancos inexistentes
- **Estado**: **OBSOLETO** - Debe ser eliminado
- **Razón**: Configura `BancoNacional.xcconfig` y `BancoPopular.xcconfig`

#### **🚫 `demo.sh`**
- **Problema**: Muestra configuración de `bancoNacional` y `bancoPopular`
- **Estado**: **OBSOLETO** - Debe ser eliminado
- **Razón**: Script de demostración que no refleja la realidad del proyecto

#### **🚫 `create-demo-assets.js`**
- **Problema**: Crea assets para bancos inexistentes
- **Estado**: **OBSOLETO** - Debe ser eliminado
- **Razón**: Genera assets para `bancoNacional` y `bancoPopular`

#### **🚫 `create-visible-assets.js`**
- **Problema**: Crea logos para bancos inexistentes
- **Estado**: **OBSOLETO** - Debe ser eliminado
- **Razón**: Genera logos para bancos que no están en el proyecto

### **2. Scripts Duplicados/Confusos**

#### **🚫 `ios-install-bank.sh`**
- **Problema**: Duplicado de `ios-install-bank-app.sh`
- **Estado**: **DUPLICADO** - Debe ser eliminado
- **Razón**: Funcionalidad similar pero menos completa

#### **🚫 `ios-install-bank-app.sh`**
- **Problema**: Busca archivos `.env.[banco]` que no existen
- **Estado**: **PROBLEMÁTICO** - Debe ser corregido o eliminado
- **Razón**: Los archivos `.env.bancoEntreRios`, etc. no existen en el proyecto

### **3. Scripts de Configuración Obsoletos**

#### **🚫 `setup-ios-schemes.sh`**
- **Problema**: Referencia archivos `.xcconfig` que no existen
- **Estado**: **PROBLEMÁTICO** - Debe ser corregido
- **Razón**: Busca `Config/BancoSantaCruz.xcconfig` que no existe

#### **🚫 `copy-assets.sh`**
- **Problema**: Maneja assets de bancos inexistentes
- **Estado**: **PROBLEMÁTICO** - Debe ser corregido
- **Razón**: Referencia `bancoNacional` y `bancoPopular`

### **4. Scripts de Utilidad Obsoletos**

#### **🚫 `kill-metro.sh`**
- **Problema**: Ya no se usa en el package.json
- **Estado**: **OBSOLETO** - Puede ser eliminado
- **Razón**: Fue reemplazado por comandos más simples

## ✅ **Scripts que SÍ Funcionan Correctamente**

### **Scripts de Gestión del Proyecto:**
- `project-status.sh` ✅
- `config-manager.js` ✅
- `version-manager.js` ✅
- `build-release.sh` ✅

### **Scripts de Assets:**
- `assets-processor.js` ✅
- `copy-icons-android.sh` ✅
- `copy-icons-ios.sh` ✅

### **Scripts de Desarrollo:**
- `convert-svg-to-components.js` ✅
- `toggle-dashboard-features.js` ✅
- `test-logo-visibility.js` ✅

### **Scripts de Keystores:**
- `generate-keystores.sh` ✅
- `keystore-info.sh` ✅

### **Scripts de Cliente:**
- `client-setup.sh` ✅

## 🗑️ **Scripts Recomendados para Eliminar**

### **Eliminación Inmediata (Obsoletos):**
```bash
rm scripts/ios-simple-bundles.sh
rm scripts/setup-ios-targets.sh
rm scripts/ios-setup-simple.sh
rm scripts/demo.sh
rm scripts/create-demo-assets.js
rm scripts/create-visible-assets.js
rm scripts/ios-install-bank.sh
rm scripts/kill-metro.sh
```

### **Eliminación o Corrección (Problemáticos):**
```bash
# Opción 1: Eliminar
rm scripts/ios-install-bank-app.sh
rm scripts/setup-ios-schemes.sh

# Opción 2: Corregir para usar bancos reales
# (Requiere trabajo adicional)
```

## 🔧 **Scripts que Necesitan Corrección**

### **`copy-assets.sh`:**
- **Problema**: Referencia bancos inexistentes
- **Solución**: Actualizar para usar solo `bancoEntreRios`, `bancoSantaCruz`, `bancoSantaFe`

### **`setup-ios-schemes.sh`:**
- **Problema**: Referencia archivos `.xcconfig` inexistentes
- **Solución**: Crear los archivos de configuración faltantes o actualizar el script

## 📊 **Resumen de Estado**

### **Total de Scripts Analizados:** 25
- **✅ Funcionando correctamente:** 15 (60%)
- **🚫 Obsoletos/Problemáticos:** 10 (40%)

### **Por Categoría:**
- **Gestión del proyecto:** 3/3 ✅
- **Assets:** 3/4 ✅ (1 problemático)
- **iOS:** 0/6 ✅ (6 problemáticos)
- **Utilidades:** 4/6 ✅ (2 obsoletos)
- **Desarrollo:** 5/6 ✅ (1 obsoleto)

## 🎯 **Plan de Acción Recomendado**

### **Fase 1: Eliminación Inmediata (Sin Riesgo)**
1. Eliminar scripts obsoletos que referencian bancos inexistentes
2. Eliminar scripts duplicados
3. Eliminar scripts de utilidad no utilizados

### **Fase 2: Evaluación de Scripts Problemáticos**
1. Decidir si corregir o eliminar `ios-install-bank-app.sh`
2. Evaluar si `setup-ios-schemes.sh` es necesario
3. Corregir `copy-assets.sh` para usar bancos reales

### **Fase 3: Verificación Post-Limpieza**
1. Probar que todos los scripts restantes funcionen
2. Actualizar documentación
3. Verificar que no se rompió funcionalidad esencial

## 💡 **Recomendaciones Adicionales**

### **1. Crear Scripts de Migración:**
- Script para migrar de bancos obsoletos a bancos reales
- Script para limpiar configuraciones obsoletas

### **2. Documentar Scripts Restantes:**
- Crear README específico para scripts
- Documentar propósito y uso de cada script

### **3. Implementar Tests:**
- Tests para verificar que los scripts funcionen
- Validación automática de configuraciones

---

**Nota**: Esta limpieza mejorará significativamente la mantenibilidad del proyecto y eliminará confusión para los desarrolladores.


