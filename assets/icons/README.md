# 🎨 App Icons por Flavor

## 📁 Estructura de Assets

```
assets/icons/
├── bancoNacional/
│   ├── android/         # Icons para Android (diferentes resoluciones)
│   └── ios/            # Icons para iOS (AppIcon.appiconset)
└── bancoPopular/
    ├── android/         # Icons para Android (diferentes resoluciones)
    └── ios/            # Icons para iOS (AppIcon.appiconset)
```

## 📱 Android Icons

Coloca los iconos en estas resoluciones:

### Banco Nacional
```
android/app/src/bancoNacional/res/
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

### Banco Popular
```
android/app/src/bancoPopular/res/
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

## 🍎 iOS Icons

### Banco Nacional
```
ios/MyReactNativeApp/Images.xcassets/AppIcon-BancoNacional.appiconset/
```

### Banco Popular
```
ios/MyReactNativeApp/Images.xcassets/AppIcon-BancoPopular.appiconset/
```

## 🔄 Scripts de Copia

Usa los scripts automatizados:
```bash
# Copiar iconos desde assets/icons/ a las ubicaciones nativas
npm run icons:copy:android
npm run icons:copy:ios
```

## 🎨 Herramientas Recomendadas

- **Android**: [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)
- **iOS**: [App Icon Generator](https://appicon.co/)
- **Universal**: [Icon Kitchen](https://icon.kitchen/)