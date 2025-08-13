# 🏛️ Guía de Publicación para Clientes

## 🎯 Opciones de Publicación

### **Opción 1: Acceso como Colaborador** ⭐ (RECOMENDADO)
Tu cliente te da acceso a sus cuentas de desarrollador:

#### 🤖 Google Play Console
**El cliente debe:**
1. **Invitarte** a su Google Play Console
2. **Rol requerido**: Admin o "Manage releases"
3. **Acceso a**: Play Console → Users and permissions → Invite new user

**Ventajas:**
- ✅ App queda bajo **ownership del cliente**
- ✅ **No transferencias** complicadas después
- ✅ Cliente mantiene **control total**

#### 🍎 App Store Connect  
**El cliente debe:**
1. **Invitarte** a su Apple Developer Team
2. **Rol requerido**: App Manager o Admin
3. **Acceso a**: App Store Connect → Users and Access → + (Plus button)

---

### **Opción 2: Service Accounts** 🤖 (AUTOMATIZACIÓN)
Para CI/CD y deploys automatizados:

#### 🤖 Google Play - Service Account
**El cliente debe crear:**
```bash
# 1. En Google Cloud Console
# 2. Crear Service Account
# 3. Descargar JSON key
# 4. Vincular a Play Console
```

**Archivos que necesitas:**
- `service-account-key.json` (para uploads automáticos)

#### 🍎 App Store - App Store Connect API
**El cliente debe proveer:**
- **Issuer ID**
- **Key ID** 
- **Private Key (.p8 file)**

---

### **Opción 3: Desarrollo + Transferencia** 🔄
Desarrollas bajo tu cuenta y luego transfieres:

#### Proceso:
1. **Desarrollas** bajo tu Apple/Google account
2. **Publicas** versión inicial
3. **Transfieres ownership** al cliente
4. Cliente asume control

**⚠️ Desventajas:**
- Proceso más complejo
- Tiempo adicional de transferencia
- Posibles interrupciones

---

## 📋 Checklist por Cliente

### 🏦 **Lo que CADA BANCO debe proveer:**

#### 📱 **Información Básica**
- [ ] **Nombre legal** de la empresa
- [ ] **Bundle ID deseado** (ej: `com.banconacional.adquirencia`)
- [ ] **App Name** para las tiendas
- [ ] **Descripción** y metadata
- [ ] **Iconos oficiales** (todos los tamaños)
- [ ] **Screenshots** o mockups

#### 🔐 **Credenciales Google Play**
- [ ] **Acceso a Play Console** (como colaborador)
- [ ] O **Service Account JSON** (para automatización)
- [ ] **Signing Key** preferences (puedes generar o ellos proveen)

#### 🍎 **Credenciales App Store**
- [ ] **Apple Developer Account** activo ($99/año)
- [ ] **Acceso a App Store Connect** (como team member)
- [ ] O **App Store Connect API keys**
- [ ] **Bundle ID** registrado en su cuenta

#### 💳 **Información de Pago**
- [ ] **Merchant info** para in-app purchases (si aplica)
- [ ] **Tax information** configurada
- [ ] **Banking details** para revenue

---

## 🔧 Setup Técnico por Cliente

### 🤖 **Android - Configuración**

#### **Opción A: Como Colaborador**
```bash
# El cliente te invita a Play Console
# Tú haces upload manual de APKs
./gradlew bundleRelease  # Generar AAB
# Upload en Play Console web
```

#### **Opción B: Service Account**
```bash
# Cliente provee service-account-key.json
# Setup de fastlane o similar
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"

# Deploy automatizado
npm run deploy:android:bancoNacional
```

### 🍎 **iOS - Configuración**

#### **Opción A: Como Team Member**
```bash
# Cliente te invita a Developer Team
# Tú usas Xcode para archive y upload
# Product → Archive → Distribute to App Store
```

#### **Opción B: API Keys**
```bash
# Cliente provee:
# - AuthKey_[KEY_ID].p8
# - Issuer ID  
# - Key ID

# Setup de altool o fastlane
xcrun altool --upload-app -f "app.ipa" \
  --apiKey [KEY_ID] \
  --apiIssuer [ISSUER_ID]
```

---

## 🔐 Manejo Seguro de Credenciales

### **Variables de Entorno por Cliente**
```bash
# .env.credentials.bancoNacional
GOOGLE_SERVICE_ACCOUNT_KEY_PATH="./credentials/bn-service-account.json"
APPLE_API_KEY_PATH="./credentials/bn-apple-api-key.p8"
APPLE_API_KEY_ID="ABC123DEF4"
APPLE_API_ISSUER_ID="69a6de80-cfdd-47c3-8664-acf4b3b6b3ca"

# .env.credentials.bancoPopular  
GOOGLE_SERVICE_ACCOUNT_KEY_PATH="./credentials/bp-service-account.json"
APPLE_API_KEY_PATH="./credentials/bp-apple-api-key.p8"
APPLE_API_KEY_ID="XYZ789GHI0"
APPLE_API_ISSUER_ID="12b3de45-cfdd-47c3-8664-acf4b3b6b3ca"
```

### **Estructura de Credenciales**
```
credentials/
├── bancoNacional/
│   ├── google-service-account.json
│   ├── apple-api-key.p8
│   └── android-keystore.jks
├── bancoPopular/
│   ├── google-service-account.json
│   ├── apple-api-key.p8
│   └── android-keystore.jks
└── .gitignore  # ¡NUNCA commitear credenciales!
```

---

## 🚀 Scripts de Deploy Automatizado

### **Deploy Android**
```bash
# scripts/deploy-android.sh
#!/bin/bash
FLAVOR=$1
CREDENTIALS_DIR="credentials/$FLAVOR"

# Load service account
export GOOGLE_APPLICATION_CREDENTIALS="$CREDENTIALS_DIR/google-service-account.json"

# Build AAB
cd android && ./gradlew "bundle${FLAVOR^}Release"

# Upload to Play Store
bundle exec fastlane android deploy flavor:$FLAVOR
```

### **Deploy iOS**
```bash  
# scripts/deploy-ios.sh
#!/bin/bash
FLAVOR=$1
CREDENTIALS_DIR="credentials/$FLAVOR"

# Build IPA
xcodebuild -workspace ios/MyReactNativeApp.xcworkspace \
  -scheme "MyReactNativeApp-${FLAVOR^}" \
  -configuration Release \
  archive -archivePath "build/$FLAVOR.xcarchive"

# Export IPA
xcodebuild -exportArchive \
  -archivePath "build/$FLAVOR.xcarchive" \
  -exportPath "build/" \
  -exportOptionsPlist "ios/ExportOptions.plist"

# Upload with API key
xcrun altool --upload-app \
  -f "build/MyReactNativeApp.ipa" \
  --apiKey $(cat "$CREDENTIALS_DIR/apple-api-key-id.txt") \
  --apiIssuer $(cat "$CREDENTIALS_DIR/apple-api-issuer.txt")
```

---

## 📞 **Template de Email para Clientes**

```
Asunto: Configuración para Publicación de App - [BANCO_NAME]

Estimado equipo de [BANCO_NAME],

Para proceder con la publicación de su aplicación de adquirencia en las tiendas de aplicaciones, necesitamos la siguiente información:

📱 INFORMACIÓN BÁSICA:
- Nombre oficial de la app para las tiendas
- Bundle ID deseado (ej: com.banconacional.adquirencia)  
- Descripción de la app (máx. 4000 caracteres)
- Iconos oficiales del banco (todos los tamaños)

🤖 GOOGLE PLAY STORE:
Opción A: Invitarme como colaborador a su Google Play Console
Opción B: Proveer Service Account JSON para automatización

🍎 APP STORE:
Opción A: Invitarme a su Apple Developer Team  
Opción B: Proveer App Store Connect API credentials

🔐 SEGURIDAD:
- Todas las credenciales se manejarán bajo estricta confidencialidad
- Acceso limitado solo para publicación de esta app específica
- Posibilidad de revocar accesos en cualquier momento

📋 TIMELINE ESTIMADO:
- Setup inicial: 2-3 días hábiles
- Primera publicación: 5-7 días hábiles  
- Revisión de tiendas: 1-7 días (variable)

¿Prefieren la opción de acceso colaborativo o manejo por API keys?

Saludos,
[TU_NOMBRE]
```

---

## ⚠️ **Consideraciones Legales**

### **Contratos y NDAs**
- [ ] **NDA firmado** antes de recibir credenciales
- [ ] **Acuerdo de desarrollo** que especifique ownership
- [ ] **Cláusulas de confidencialidad** sobre credenciales
- [ ] **Responsabilidades** sobre security breaches

### **Compliance**
- [ ] **GDPR compliance** si aplica
- [ ] **Financial regulations** para apps bancarias
- [ ] **Security standards** (PCI DSS, etc.)
- [ ] **Insurance coverage** para desarrollo

---

## 🎯 **Recomendación Final**

**Para máxima profesionalidad:**

1. **Opción 1**: Acceso como colaborador (más simple)
2. **Opción 2**: Service Accounts para automatización (más escalable)
3. **Backup plan**: Desarrollo bajo tu cuenta + transferencia

**¡La clave es establecer el proceso desde el inicio del proyecto!** 🔑