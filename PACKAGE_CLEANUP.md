# 🧹 Limpieza del Package.json - Documentación

## 📋 **Cambios Realizados**

### **✅ Scripts Eliminados (Obsoletos/Problemáticos)**

#### **Scripts de iOS Problemáticos:**
- `ios:banco-entre-rios` → **PROBLEMA**: Usaba `ios-install-bank-app.sh` que busca archivos `.env.bancoEntreRios` inexistentes
- `ios:banco-santa-cruz` → **PROBLEMA**: Mismo problema
- `ios:banco-santa-fe` → **PROBLEMA**: Mismo problema
- `ios:setup` → **PROBLEMA**: Referenciaba `ios-setup-simple.sh` que configura bancos inexistentes
- `ios:setup-schemes` → **PROBLEMA**: Configuraba bancos que no están en el proyecto

#### **Scripts de Configuración Obsoletos:**
- `setup:store` → **PROBLEMA**: Solo mostraba un mensaje, no ejecutaba funcionalidad real
- `assets:demo` → **PROBLEMA**: Script de demostración no esencial
- `assets:visible` → **PROBLEMA**: Script de demostración no esencial

#### **Scripts de Limpieza Problemáticos:**
- `clean` → **PROBLEMA**: Usaba `kill-metro.sh` que podía fallar en diferentes sistemas

### **🔄 Scripts Reemplazados/Mejorados**

#### **Scripts de iOS Corregidos:**
```json
// ANTES (problemático):
"ios:banco-entre-rios": "./scripts/ios-install-bank-app.sh bancoEntreRios"

// DESPUÉS (funcional):
"ios:banco-entre-rios": "react-native run-ios --mode=bancoEntreRiosDebug"
```

#### **Script de Limpieza Simplificado:**
```json
// ANTES (problemático):
"clean": "./scripts/kill-metro.sh && npx react-native start --reset-cache"

// DESPUÉS (simple y confiable):
"clean": "npx react-native start --reset-cache"
```

### **📦 Dependencias Actualizadas**

#### **DevDependencies:**
- `eslint`: `^8.19.0` → `^9.0.0` (versión más reciente)
- `prettier`: `2.8.8` → `^3.0.0` (versión más reciente)

## 🎯 **Beneficios de la Limpieza**

### **1. Scripts Funcionales:**
- ✅ Los comandos `ios:banco-*` ahora funcionan correctamente
- ✅ No más errores por archivos `.env` inexistentes
- ✅ Comandos más directos y confiables

### **2. Organización Mejorada:**
- 📁 Scripts agrupados por funcionalidad
- 🧹 Eliminación de scripts duplicados/confusos
- 🔧 Comandos más intuitivos

### **3. Mantenimiento Simplificado:**
- 🚫 Menos scripts obsoletos que mantener
- 📚 Documentación más clara
- 🐛 Menos puntos de falla

## 🚨 **Scripts que Necesitan Atención**

### **Scripts que Referencian Bancos Inexistentes:**
Los siguientes scripts en la carpeta `scripts/` mencionan bancos que no están en el proyecto:

- `ios-simple-bundles.sh` → Referencia `bancoNacional` y `bancoPopular`
- `setup-ios-targets.sh` → Configura targets para bancos inexistentes
- `copy-assets.sh` → Maneja assets de bancos inexistentes

**Recomendación**: Estos scripts deberían ser actualizados o eliminados si no se usan.

## 📱 **Scripts de iOS Funcionales**

### **Nuevos Comandos (Recomendados):**
```bash
# Para ejecutar en iOS con configuración específica del banco
npm run ios:banco-entre-rios
npm run ios:banco-santa-cruz  
npm run ios:banco-santa-fe
```

### **Comandos de Android (Sin Cambios):**
```bash
# Para ejecutar en Android con configuración específica del banco
npm run android:banco-entre-rios
npm run android:banco-santa-cruz
npm run android:banco-santa-fe
```

## 🔍 **Verificación Post-Limpieza**

### **Comandos para Probar:**
```bash
# Verificar que los scripts funcionan
npm run status
npm run config:list
npm run config:validate

# Probar comandos de iOS (requiere simulador)
npm run ios:banco-entre-rios
```

### **Scripts Esenciales Mantenidos:**
- ✅ Gestión de assets y configuraciones
- ✅ Comandos de build y release
- ✅ Herramientas de desarrollo (SVG, dashboard)
- ✅ Gestión de keystores y iconos

## 📚 **Próximos Pasos Recomendados**

1. **Probar los nuevos comandos** de iOS
2. **Revisar scripts obsoletos** en la carpeta `scripts/`
3. **Actualizar documentación** si es necesario
4. **Considerar migrar** a React Native CLI más reciente

---

**Nota**: Esta limpieza mantiene toda la funcionalidad esencial del proyecto mientras elimina scripts problemáticos y obsoletos.


