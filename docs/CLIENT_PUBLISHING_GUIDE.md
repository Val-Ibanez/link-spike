# 📱 Guía de Publicación para Clientes - React Native White Label

## 🎯 Objetivo

Esta guía explica cómo publicar la aplicación de marca blanca en las tiendas de aplicaciones (Google Play Store y Apple App Store) para diferentes bancos.

## 📋 Checklist de Preparación

### 1. **Configuración del Proyecto**
- [ ] **Flavor configurado** correctamente
- [ ] **Bundle ID** registrado en su cuenta
- [ ] **Certificados de firma** generados
- [ ] **Assets personalizados** (iconos, splash screens)
- [ ] **Configuración de build** verificada

### 2. **Assets Requeridos**
- [ ] **Icono de la app** (512x512px para Android, múltiples tamaños para iOS)
- [ ] **Splash screen** (1080x1920px)
- [ ] **Screenshots** de la aplicación (mínimo 2)
- [ ] **Descripción** de la app
- [ ] **Palabras clave** para SEO

### 3. **Configuración de Build**
- [ ] **Versión** incrementada
- [ ] **Build number** actualizado
- [ ] **Flavor** seleccionado correctamente
- [ ] **Configuración de release** aplicada

## 🚀 Proceso de Build

### Android

```bash
# 1. Limpiar build anterior
cd android && ./gradlew clean

# 2. Generar APK de release
./gradlew assembleBancoEntreRiosRelease

# 3. Generar AAB para Play Store
./gradlew bundleBancoEntreRiosRelease

# 4. Verificar archivos generados
ls -la app/build/outputs/
```

### iOS

```bash
# 1. Configurar flavor
npm run ios:config:banco-entre-rios

# 2. Limpiar build
cd ios && xcodebuild clean

# 3. Build para distribución
xcodebuild -workspace MyReactNativeApp.xcworkspace \
  -scheme BancoEntreRios \
  -configuration Release \
  -archivePath build/BancoEntreRios.xcarchive \
  archive

# 4. Exportar IPA
xcodebuild -exportArchive \
  -archivePath build/BancoEntreRios.xcarchive \
  -exportPath build/BancoEntreRios \
  -exportOptionsPlist exportOptions.plist
```

## 📱 Google Play Store

### 1. **Crear Aplicación**
- Ir a [Google Play Console](https://play.google.com/console)
- Crear nueva aplicación
- Seleccionar "Aplicación" como tipo

### 2. **Configuración Básica**
- **Nombre de la app**: Nombre del banco
- **Idioma predeterminado**: Español
- **Categoría**: Finanzas
- **Etiquetas**: Banco, pagos, finanzas

### 3. **Subir APK/AAB**
```bash
# Usar el archivo generado en:
android/app/build/outputs/bundle/release/app-bancoEntreRios-release.aab
```

### 4. **Configuración de Store**
- **Descripción corta**: Descripción en 80 caracteres
- **Descripción completa**: Descripción detallada
- **Screenshots**: Mínimo 2 imágenes
- **Icono**: 512x512px
- **Imagen destacada**: 1024x500px

### 5. **Configuración de Contenido**
- **Clasificación de contenido**: 3+ años
- **Anuncios**: No contiene anuncios
- **Contenido**: Solo contenido financiero

### 6. **Configuración de Precios**
- **Gratis**: Sí
- **Países**: Argentina (y otros según necesidad)

## 🍎 Apple App Store

### 1. **Crear Aplicación**
- Ir a [App Store Connect](https://appstoreconnect.apple.com)
- Crear nueva aplicación
- Seleccionar plataforma (iOS)

### 2. **Configuración Básica**
- **Nombre**: Nombre del banco
- **Subtítulo**: Descripción corta
- **Bundle ID**: `com.myreactnativeapp.bancoentrerios`
- **SKU**: Identificador único

### 3. **Subir Build**
- Usar Xcode para subir build
- O usar `xcodebuild` desde terminal
- Esperar procesamiento de Apple

### 4. **Configuración de Store**
- **Descripción**: Descripción completa
- **Palabras clave**: Banco, pagos, finanzas
- **Screenshots**: Mínimo 1 por dispositivo
- **Icono**: 1024x1024px

### 5. **Configuración de Contenido**
- **Clasificación**: 4+ años
- **Categoría**: Finanzas
- **Subcategoría**: Banca

## 🔐 Certificados y Firma

### Android

```bash
# 1. Generar keystore
./scripts/generate-keystores.sh

# 2. Configurar en build.gradle
android {
  signingConfigs {
    release {
      storeFile file("keystores/bancoEntreRios.keystore")
      storePassword "password"
      keyAlias "bancoEntreRios"
      keyPassword "password"
    }
  }
}
```

### iOS

```bash
# 1. Configurar certificados en Xcode
# 2. Crear perfil de aprovisionamiento
# 3. Configurar Team ID
# 4. Verificar Bundle Identifier
```

## 📊 Monitoreo y Analytics

### 1. **Firebase Analytics**
```typescript
// Configurar en cada flavor
const analyticsConfig = {
  bancoEntreRios: {
    projectId: 'banco-entre-rios-analytics',
    apiKey: 'AIza...'
  },
  bancoSantaCruz: {
    projectId: 'banco-santa-cruz-analytics',
    apiKey: 'AIza...'
  }
};
```

### 2. **Crashlytics**
```typescript
// Configuración automática por flavor
import crashlytics from '@react-native-firebase/crashlytics';

crashlytics().setAttribute('flavor', currentFlavor);
crashlytics().setAttribute('bank', currentConfig.displayName);
```

## 🚨 Troubleshooting

### Errores Comunes

#### **Android**
- **Error de firma**: Verificar keystore y contraseñas
- **Error de bundle ID**: Verificar que sea único
- **Error de versión**: Incrementar versionCode

#### **iOS**
- **Error de certificado**: Verificar expiración
- **Error de Bundle ID**: Verificar en Xcode
- **Error de provisioning**: Verificar perfil

### Soluciones

```bash
# Limpiar build
cd android && ./gradlew clean
cd ios && xcodebuild clean

# Verificar configuración
npm run config:validate

# Verificar flavor
npm run config:list
```

## 📈 Métricas de Éxito

### 1. **Descargas**
- Objetivo: 1000+ descargas en primer mes
- Métrica: Descargas por día/semana

### 2. **Retención**
- Objetivo: 70% retención a 7 días
- Métrica: Usuarios activos diarios

### 3. **Calificación**
- Objetivo: 4.5+ estrellas
- Métrica: Promedio de calificaciones

### 4. **Crash Rate**
- Objetivo: <1% crash rate
- Métrica: Crashes por sesión

## 🔄 Actualizaciones

### 1. **Proceso de Update**
```bash
# 1. Incrementar versión
npm run version:bump bancoEntreRios patch

# 2. Build de release
./scripts/build-release.sh bancoEntreRios production android

# 3. Subir a stores
# 4. Monitorear métricas
```

### 2. **Rollback Plan**
- Mantener versión anterior disponible
- Monitorear métricas post-update
- Plan de contingencia para issues críticos

## 📚 Recursos Adicionales

### Documentación
- [Google Play Console](https://support.google.com/googleplay/android-developer)
- [App Store Connect](https://developer.apple.com/app-store-connect/)
- [React Native Deployment](https://reactnative.dev/docs/deployment)

### Herramientas
- [Firebase Console](https://console.firebase.google.com)
- [App Store Connect API](https://developer.apple.com/app-store-connect-api/)
- [Google Play Developer API](https://developers.google.com/android-publisher)

## 🎯 Conclusión

La publicación exitosa requiere:

1. **Preparación cuidadosa** de assets y configuración
2. **Builds limpios** y verificados
3. **Configuración correcta** en las stores
4. **Monitoreo continuo** de métricas
5. **Plan de actualizaciones** regular

Siguiendo esta guía, cada banco tendrá su aplicación publicada exitosamente en las tiendas de aplicaciones.