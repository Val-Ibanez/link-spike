# 🏦 MyReactNativeApp - Aplicación Multi-Banco

Esta es una aplicación React Native que soporta múltiples bancos (flavors) con configuraciones específicas para cada uno. Cada banco tiene su propio tema, logos, colores y configuraciones personalizadas.

## 🚀 **Cómo Levantar el Proyecto desde VSCode**

### **1. Preparación Inicial**

Antes de comenzar, asegúrate de tener todas las dependencias instaladas:

```bash
npm install
```

### **2. Scripts Disponibles para Cada Banco**

#### **Para Android:**
- **Banco Entre Ríos**: `npm run android:banco-entre-rios`
- **Banco Santa Cruz**: `npm run android:banco-santa-cruz`  
- **Banco Santa Fe**: `npm run android:banco-santa-fe`

#### **Para iOS:**
- **Banco Entre Ríos**: `npm run ios:banco-entre-rios`
- **Banco Santa Cruz**: `npm run ios:banco-santa-cruz`
- **Banco Santa Fe**: `npm run ios:banco-santa-fe`

### **3. Proceso Paso a Paso desde VSCode**

#### **Opción A: Usando la Terminal Integrada de VSCode**
1. Abre VSCode
2. Presiona `Ctrl + `` (o `Cmd + `` en Mac) para abrir la terminal integrada
3. Navega al directorio del proyecto si no estás ahí
4. Ejecuta uno de los comandos según el banco que quieras:

```bash
# Para Banco Entre Ríos en Android
npm run android:banco-entre-rios

# Para Banco Santa Cruz en iOS
npm run ios:banco-santa-cruz

# Para Banco Santa Fe en Android
npm run android:banco-santa-fe
```

#### **Opción B: Usando el Panel de NPM Scripts**
1. En VSCode, ve a la pestaña "NPM SCRIPTS" en el panel izquierdo
2. Expande la sección de scripts
3. Haz clic derecho en el script que quieras ejecutar
4. Selecciona "Run Script"

### **4. Scripts Útiles Adicionales**

- **Limpiar y reiniciar**: `npm run clean` (mata Metro y reinicia)
- **Ver estado del proyecto**: `npm run status`
- **Listar configuraciones**: `npm run config:list`
- **Validar configuraciones**: `npm run config:validate`
- **Iniciar Metro**: `npm start`

### **5. Flujo Recomendado para Desarrollo**

1. **Iniciar Metro**: `npm start` (en una terminal)
2. **Ejecutar en dispositivo/simulador**: `npm run android:banco-[nombre]` o `npm run ios:banco-[nombre]`
3. **Para cambiar de banco**: Mata el proceso actual y ejecuta el nuevo comando

### **6. Comandos Rápidos desde VSCode**

Puedes crear un archivo `.vscode/tasks.json` para tener acceso rápido a estos comandos:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Banco Entre Ríos - Android",
      "type": "shell",
      "command": "npm run android:banco-entre-rios",
      "group": "build"
    },
    {
      "label": "Banco Santa Cruz - iOS", 
      "type": "shell",
      "command": "npm run ios:banco-santa-cruz",
      "group": "build"
    },
    {
      "label": "Banco Santa Fe - Android",
      "type": "shell",
      "command": "npm run android:banco-santa-fe",
      "group": "build"
    }
  ]
}
```

### **7. Verificación de que Funciona**

Después de ejecutar cualquier comando:
- Se abrirá el simulador/emulador correspondiente
- La app se instalará con la configuración del banco seleccionado
- Verás los logos, colores y configuraciones específicas de ese banco

## 🏗️ **Arquitectura del Proyecto**

### **Estructura de Flavors**
```
flavors/
├── bancoEntreRios/
├── bancoSantaCruz/
└── bancoSantaFe/
```

### **Configuraciones por Banco**
- **Banco Entre Ríos**: Configuración específica para Banco Entre Ríos
- **Banco Santa Cruz**: Configuración específica para Banco Santa Cruz
- **Banco Santa Fe**: Configuración específica para Banco Santa Fe

## 🔧 **Scripts de Mantenimiento**

### **Gestión de Assets**
```bash
# Copiar assets para todos los bancos
npm run assets:copy:all

# Listar assets disponibles
npm run assets:list

# Validar assets
npm run assets:validate
```

### **Gestión de Configuraciones**
```bash
# Listar configuraciones disponibles
npm run config:list

# Validar configuraciones
npm run config:validate
```

### **Limpieza y Mantenimiento**
```bash
# Limpieza básica
npm run clean

# Limpieza profunda (incluye Android e iOS)
npm run clean:deep
```

## 📱 **Plataformas Soportadas**

- ✅ **Android**: Con configuraciones específicas por banco
- ✅ **iOS**: Con configuraciones específicas por banco

## 🚨 **Troubleshooting**

### **Problemas Comunes**

1. **Metro no inicia**: Ejecuta `npm run clean`
2. **Errores de build**: Ejecuta `npm run clean:deep`
3. **Configuraciones no se aplican**: Verifica con `npm run config:validate`

### **Comandos de Diagnóstico**
```bash
# Ver estado del proyecto
npm run status

# Ver información de keystores
npm run keystores:info

# Debug de logos
npm run debug:logo
```

## 📚 **Documentación Adicional**

- `docs/WHITE_LABEL_ARCHITECTURE.md` - Arquitectura de white label
- `docs/ASSETS_ARCHITECTURE.md` - Gestión de assets
- `docs/CLIENT_PUBLISHING_GUIDE.md` - Guía de publicación
- `docs/IOS_CONFIGURATION.md` - Configuración de iOS

## 🎯 **Próximos Pasos**

1. Ejecuta `npm run status` para ver el estado actual del proyecto
2. Elige un banco y ejecuta el comando correspondiente
3. Verifica que la app se ejecute con la configuración correcta
4. Explora las diferentes funcionalidades por banco

---

**Nota**: Este proyecto utiliza un sistema de flavors para manejar múltiples configuraciones de banco. Cada comando de ejecución aplica automáticamente la configuración correspondiente al banco seleccionado.
