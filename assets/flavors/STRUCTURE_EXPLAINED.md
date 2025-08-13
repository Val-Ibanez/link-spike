# 📁 Estructura de Assets - Explicación Completa

## 🎯 ¿Por qué dos directorios?

### 📥 `assets/flavors/` - **SOURCE Assets**
```
assets/flavors/bancoNacional/
├── images/logo.png           # ← Cliente coloca aquí
├── images/background.png     # ← Raw assets del banco
└── fonts/BancoNacional.ttf   # ← Sin procesar
```

**Propósito:**
- **Depósito** de assets originales del cliente
- **No se tocan** una vez colocados
- **Versionados** con Git (opcional)
- **Backup** de assets originales

### 📤 `assets/images/` - **PROCESSED Assets**  
```
assets/images/
├── logo-bancoNacional.png    # ← React Native importa esto
├── background-bancoNacional.png
├── logo-bancoPopular.png     # ← Múltiples bancos conviven
└── default-logo.png          # ← Fallbacks
```

**Propósito:**
- **Working directory** de React Native
- **Importaciones estáticas** funcionan
- **Nombres únicos** evitan conflictos
- **Fallbacks** para desarrollo

## 🔄 Flujo de Trabajo

### 1. **Cliente Envía Assets**
```bash
# Cliente provee:
banco-assets/
├── logo.jpg
├── background.png
└── fonts/Regular.ttf
```

### 2. **Desarrollador Instala**
```bash
# Copiar a SOURCE
cp -r banco-assets/* assets/flavors/bancoNacional/

# Procesar a PROCESSED
npm run assets:copy:bancoNacional
```

### 3. **Script Automatiza**
```bash
# assets/flavors/bancoNacional/images/logo.png
#     ↓ (copia y renombra)
# assets/images/logo-bancoNacional.png
```

### 4. **React Native Importa**
```typescript
// AssetManager.ts puede hacer:
logo: require('../../../assets/images/logo-bancoNacional.png')
// ↑ Ruta estática, funciona perfectamente
```

### 5. **App Se Adapta**
```typescript
// En cualquier componente:
<Image source={AssetManager.getLogo()} />
// ↑ Carga automáticamente según flavor activo
```

## ✅ Ventajas de Esta Estructura

### 🎯 **Para el Desarrollador:**
- **Scripts automatizan** todo el procesamiento
- **AssetManager** funciona con rutas estáticas
- **Escalable** para múltiples bancos
- **Fácil debugging** (assets están separados)

### 🏦 **Para los Clientes:**
- **Proceso simple**: envían carpeta de assets
- **No necesitan** conocer estructura React Native
- **Assets originales** se preservan sin modificar

### 📱 **Para React Native:**
- **Importaciones estáticas** (requeridas por RN)
- **Sin rutas dinámicas** complejas
- **Bundle size optimizado**
- **Metro bundler happy**

## 🔧 Comandos Útiles

```bash
# Ver estructura completa
find assets/ -type f | head -20

# Procesar assets de un banco
npm run assets:copy:bancoNacional

# Procesar todos los bancos
npm run assets:copy:all

# Solo imágenes de un banco
npm run assets:copy:images:bancoNacional

# Verificar que todo está correcto
./scripts/project-status.sh
```

## 🚫 Estructuras Alternativas (y por qué NO)

### ❌ **Todo en un directorio**
```
assets/bancoNacional/logo.png
assets/bancoPopular/logo.png
```
**Problema:** React Native no puede hacer:
```typescript
require(`../assets/${flavor}/logo.png`) // ← NO funciona
```

### ❌ **Assets en carpetas de código**
```
app/flavors/bancoNacional/assets/logo.png
```
**Problema:** Metro bundler tiene reglas estrictas sobre dónde buscar assets.

### ❌ **Un solo directorio plano**
```
assets/logo-bn.png
assets/logo-bp.png
```
**Problema:** No escalable, difícil de gestionar con muchos bancos.

## 🎉 Conclusión

La estructura **`flavors/` (source) + `images/` (processed)**:

- ✅ **Funciona** con React Native
- ✅ **Escalable** para múltiples clientes  
- ✅ **Automatizable** con scripts
- ✅ **Mantenible** a largo plazo
- ✅ **Fácil** para clientes y desarrolladores

**¡Es la estructura IDEAL para un sistema white-label!** 🚀