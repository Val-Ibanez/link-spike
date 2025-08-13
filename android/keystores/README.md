# 🔐 Android Keystores

## Generar Keystores para cada Flavor

### Banco Nacional
```bash
keytool -genkey -v -keystore android/keystores/bancoNacional.keystore -alias bancoNacional -keyalg RSA -keysize 2048 -validity 10000
```

### Banco Popular  
```bash
keytool -genkey -v -keystore android/keystores/bancoPopular.keystore -alias bancoPopular -keyalg RSA -keysize 2048 -validity 10000
```

## Configuración en build.gradle

Los keystores se configuran automáticamente en `android/app/build.gradle` con:

```gradle
signingConfigs {
    bancoNacional {
        storeFile file('../keystores/bancoNacional.keystore')
        keyAlias 'bancoNacional'
        storePassword System.getenv('BANCO_NACIONAL_STORE_PASSWORD') ?: 'defaultpass'
        keyPassword System.getenv('BANCO_NACIONAL_KEY_PASSWORD') ?: 'defaultpass'
    }
    bancoPopular {
        storeFile file('../keystores/bancoPopular.keystore')
        keyAlias 'bancoPopular'
        storePassword System.getenv('BANCO_POPULAR_STORE_PASSWORD') ?: 'defaultpass'
        keyPassword System.getenv('BANCO_POPULAR_KEY_PASSWORD') ?: 'defaultpass'
    }
}
```

## Variables de Entorno
```bash
export BANCO_NACIONAL_STORE_PASSWORD="tu_password"
export BANCO_NACIONAL_KEY_PASSWORD="tu_password"
export BANCO_POPULAR_STORE_PASSWORD="tu_password"
export BANCO_POPULAR_KEY_PASSWORD="tu_password"
```

## 🚀 Build Release
```bash
# Banco Nacional
npm run android:banco-nacional:release

# Banco Popular
npm run android:banco-popular:release
```