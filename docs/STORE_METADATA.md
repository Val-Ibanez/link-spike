# 🏪 Metadata para Tiendas de Apps

## 📱 Google Play Store (Android)

### Banco Nacional
- **Package Name**: `com.myreactnativeapp.banconacional`
- **App Name**: "Banco Nacional - Adquirencia"
- **Short Description**: "Solución de adquirencia móvil para Banco Nacional"
- **Full Description**: 
  ```
  La aplicación oficial de adquirencia de Banco Nacional te permite procesar pagos de forma segura y eficiente desde tu dispositivo móvil.

  Características principales:
  • Procesamiento de pagos con tarjetas de crédito y débito
  • Soporte para múltiples métodos de pago
  • Interfaz intuitiva y fácil de usar
  • Seguridad bancaria de primer nivel
  • Reportes y analíticas en tiempo real
  • Soporte offline para situaciones sin conexión

  Diseñada específicamente para comerciantes que confían en Banco Nacional para sus necesidades de procesamiento de pagos.
  ```

### Banco Popular
- **Package Name**: `com.myreactnativeapp.bancopopular`
- **App Name**: "Banco Popular - Adquirencia"
- **Short Description**: "Solución de adquirencia móvil para Banco Popular"
- **Full Description**: 
  ```
  La aplicación oficial de adquirencia de Banco Popular te permite procesar pagos de forma segura y eficiente desde tu dispositivo móvil.

  Características principales:
  • Procesamiento de pagos con tarjetas de crédito y débito
  • Soporte para múltiples métodos de pago
  • Interfaz intuitiva y fácil de usar
  • Seguridad bancaria de primer nivel
  • Reportes y analíticas en tiempo real
  • Soporte offline para situaciones sin conexión

  Diseñada específicamente para comerciantes que confían en Banco Popular para sus necesidades de procesamiento de pagos.
  ```

## 🍎 App Store (iOS)

### Banco Nacional
- **Bundle ID**: `com.myreactnativeapp.banconacional`
- **App Name**: "Banco Nacional Adquirencia"
- **Subtitle**: "Procesamiento de pagos móvil"
- **Keywords**: "banco,nacional,adquirencia,pagos,pos,tarjetas,comerciantes"
- **Description**: [Misma descripción que Android]

### Banco Popular
- **Bundle ID**: `com.myreactnativeapp.bancopopular`
- **App Name**: "Banco Popular Adquirencia"
- **Subtitle**: "Procesamiento de pagos móvil"
- **Keywords**: "banco,popular,adquirencia,pagos,pos,tarjetas,comerciantes"
- **Description**: [Misma descripción que Android]

## 🎨 Assets Requeridos

### Screenshots (ambas tiendas)
- **5.5" iPhone**: 1242 x 2208 px
- **6.5" iPhone**: 1284 x 2778 px
- **12.9" iPad**: 2048 x 2732 px
- **Android Phone**: 1080 x 1920 px
- **Android Tablet**: 1200 x 1920 px

### Feature Graphics
- **Google Play**: 1024 x 500 px
- **App Store**: No requerido

### App Icons
- **Android**: 512 x 512 px (Play Store)
- **iOS**: 1024 x 1024 px (App Store)

## 📋 Categorías

### Google Play Store
- **Categoría Principal**: Business
- **Categoría Secundaria**: Finance
- **Content Rating**: Everyone
- **Target Audience**: Business professionals

### App Store
- **Primary Category**: Business
- **Secondary Category**: Finance
- **Age Rating**: 4+

## 🔐 Permisos y Políticas

### Android Permissions
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### iOS Capabilities
- Camera Usage
- Network Access
- Keychain Access

## 📄 Políticas Requeridas

### Privacy Policy
- URL requerida para ambas tiendas
- Debe especificar qué datos se recopilan
- Debe estar disponible públicamente

### Terms of Service
- Términos de uso del servicio
- Responsabilidades del usuario
- Limitaciones de responsabilidad

## 🎯 Release Strategy

### Banco Nacional
1. **Alpha**: Internal testing
2. **Beta**: Closed testing (comerciantes seleccionados)
3. **Production**: Release completo

### Banco Popular
1. **Alpha**: Internal testing
2. **Beta**: Closed testing (comerciantes seleccionados)
3. **Production**: Release completo

## 🚀 Scripts de Metadata

```bash
# Generar screenshots automatizados
npm run screenshots:generate

# Validar metadata
npm run metadata:validate

# Subir a tiendas (requiere configuración adicional)
npm run deploy:android:bancoNacional
npm run deploy:android:bancoPopular
npm run deploy:ios:bancoNacional
npm run deploy:ios:bancoPopular
```

## 📊 Tracking y Analytics

### Google Play Console
- Installs tracking
- User engagement metrics
- Crash reporting
- Performance monitoring

### App Store Connect
- App analytics
- Sales and trends
- Crash reports
- User reviews monitoring

## 🔄 Update Strategy

### Versioning
- **Independent versioning** per flavor
- **Semantic versioning**: MAJOR.MINOR.PATCH
- **Build numbers**: Auto-increment per release

### Release Cadence
- **Hot fixes**: As needed
- **Minor updates**: Bi-weekly
- **Major updates**: Monthly
- **Feature releases**: Quarterly