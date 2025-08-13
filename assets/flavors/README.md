# 🎨 Assets por Flavor

## 📁 Estructura de Assets Específicos

```
assets/flavors/
├── bancoNacional/
│   ├── images/               # Imágenes específicas BN
│   │   ├── logo-horizontal.png
│   │   ├── logo-vertical.png
│   │   ├── background.png
│   │   ├── splash-screen.png
│   │   └── onboarding/
│   │       ├── step1.png
│   │       ├── step2.png
│   │       └── step3.png
│   ├── fonts/                # Fuentes específicas BN
│   │   ├── BancoNacional-Regular.ttf
│   │   ├── BancoNacional-Bold.ttf
│   │   └── BancoNacional-Light.ttf
│   └── logos/                # Logos en diferentes formatos
│       ├── logo.png
│       ├── logo@2x.png
│       ├── logo@3x.png
│       └── logo.svg
└── bancoPopular/
    ├── images/               # Imágenes específicas BP
    ├── fonts/                # Fuentes específicas BP
    └── logos/                # Logos específicos BP
```

## 🔄 Cómo Funciona el Sistema

### 1. **Assets se copian** desde `assets/flavors/` a ubicaciones nativas
### 2. **App carga dinámicamente** según el flavor activo
### 3. **Scripts automatizan** la copia por flavor
### 4. **React Native resuelve** assets automáticamente

## 🚀 Scripts Disponibles

```bash
# Copiar todos los assets de un flavor
npm run assets:copy:bancoNacional
npm run assets:copy:bancoPopular

# Copiar solo imágenes
npm run assets:copy:images:bancoNacional

# Copiar solo fuentes
npm run assets:copy:fonts:bancoNacional

# Copiar todos los assets de todos los flavors
npm run assets:copy:all
```

## 📱 Uso en el Código

```typescript
// Los assets se cargan dinámicamente según el flavor
import { AssetManager } from 'app/core/utils/AssetManager';

// En cualquier componente:
const logoSource = AssetManager.getLogo();
const backgroundImage = AssetManager.getImage('background');
const font = AssetManager.getFont('regular');

<Image source={logoSource} />
<Text style={{ fontFamily: font }}>Texto con fuente del banco</Text>
```

## 📋 Qué Proveer por Cliente

### 🏦 **Cada Banco debe enviar:**

#### 📸 **Imágenes** (formato PNG/JPG):
- Logo horizontal (transparente)
- Logo vertical (transparente) 
- Fondo de pantalla principal
- Splash screen
- Imágenes de onboarding (3-5 pasos)
- Iconos específicos del banco

#### 🔤 **Fuentes** (formato TTF/OTF):
- Regular/Normal
- Bold/Negrita
- Light/Delgada
- (Opcional) Medium, SemiBold, etc.

#### 🎨 **Especificaciones**:
- **Logos**: Fondo transparente, alta resolución
- **Imágenes**: Optimizadas para móvil
- **Fuentes**: Licencia para uso comercial

## 🔧 Instalación Automática

```bash
# Una vez que el cliente envía los assets:
./scripts/setup-client-assets.sh bancoNacional
```