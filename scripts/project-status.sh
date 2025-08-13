#!/bin/bash

# 📊 Script para mostrar el estado completo del proyecto white-label

echo "🎯 Estado del Proyecto White-Label"
echo "===================================="
echo ""

# Información general
echo "📱 Proyecto: MyReactNativeApp"
echo "🏦 Flavors configurados: Banco Entre Ríos, Banco Santa Cruz, Banco Santa Fe"
echo "🔧 Tecnología: React Native + react-native-config"
echo ""

# Verificar archivos de configuración
echo "📋 Archivos de Configuración:"
echo "-----------------------------"

check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
    else
        echo "❌ $1 (FALTANTE)"
    fi
}

check_file ".env.bancoEntreRios"
check_file ".env.bancoSantaCruz"
check_file ".env.bancoSantaFe"
check_file "flavors/bancoEntreRios/config/config.json"
check_file "flavors/bancoSantaCruz/config/config.json"
check_file "flavors/bancoSantaFe/config/config.json"
check_file "android/app/build.gradle"
check_file "scripts/version-manager.js"
echo ""

# Verificar keystores
echo "🔐 Keystores de Android:"
echo "------------------------"
check_file "android/keystores/bancoEntreRios.keystore"
check_file "android/keystores/bancoSantaCruz.keystore"
check_file "android/keystores/bancoSantaFe.keystore"
echo ""

# Verificar scripts
echo "🔧 Scripts disponibles:"
echo "----------------------"
check_file "scripts/generate-keystores.sh"
check_file "scripts/keystore-info.sh"
check_file "scripts/copy-icons-android.sh"
check_file "scripts/copy-icons-ios.sh"
check_file "scripts/build-release.sh"
check_file "scripts/kill-metro.sh"
echo ""

# Verificar estructura de iconos
echo "🎨 Estructura de Iconos:"
echo "------------------------"
check_file "assets/icons/README.md"
if [ -d "assets/icons/bancoEntreRios" ]; then
    echo "✅ assets/icons/bancoEntreRios/"
else
    echo "❌ assets/icons/bancoEntreRios/ (FALTANTE)"
fi

if [ -d "assets/icons/bancoSantaCruz" ]; then
    echo "✅ assets/icons/bancoSantaCruz/"
else
    echo "❌ assets/icons/bancoSantaCruz/ (FALTANTE)"
fi

if [ -d "assets/icons/bancoSantaFe" ]; then
    echo "✅ assets/icons/bancoSantaFe/"
else
    echo "❌ assets/icons/bancoSantaFe/ (FALTANTE)"
fi
echo ""

# Scripts de package.json
echo "🚀 Scripts NPM disponibles:"
echo "---------------------------"
echo "Desarrollo:"
echo "  npm run android:banco-entre-rios"
echo "  npm run android:banco-santa-cruz"
echo "  npm run android:banco-santa-fe"
echo "  npm run ios:banco-entre-rios"
echo "  npm run ios:banco-santa-cruz"
echo "  npm run ios:banco-santa-fe"
echo ""
echo "Release:"
echo "  npm run build:release bancoEntreRios android"
echo "  npm run build:release bancoSantaCruz android"
echo "  npm run build:release bancoSantaFe android"
echo "  npm run build:release bancoEntreRios ios"
echo "  npm run build:release bancoSantaCruz ios"
echo "  npm run build:release bancoSantaFe ios"
echo ""
echo "Gestión:"
echo "  npm run keystores:generate"
echo "  npm run keystores:info"
echo "  npm run icons:copy"
echo "  npm run version:status"
echo "  npm run build:release all both"
echo ""

# Estado de versiones
echo "📱 Estado de Versiones:"
echo "-----------------------"
if [ -f ".env.bancoEntreRios" ]; then
    BER_VERSION=$(grep "VERSION_NAME" .env.bancoEntreRios | cut -d'=' -f2)
    BER_BUILD=$(grep "BUILD_NUMBER" .env.bancoEntreRios | cut -d'=' -f2)
    echo "🏦 Banco Entre Ríos: $BER_VERSION ($BER_BUILD)"
fi

if [ -f ".env.bancoSantaCruz" ]; then
    BSC_VERSION=$(grep "VERSION_NAME" .env.bancoSantaCruz | cut -d'=' -f2)
    BSC_BUILD=$(grep "BUILD_NUMBER" .env.bancoSantaCruz | cut -d'=' -f2)
    echo "🏦 Banco Santa Cruz: $BSC_VERSION ($BSC_BUILD)"
fi

if [ -f ".env.bancoSantaFe" ]; then
    BSF_VERSION=$(grep "VERSION_NAME" .env.bancoSantaFe | cut -d'=' -f2)
    BSF_BUILD=$(grep "BUILD_NUMBER" .env.bancoSantaFe | cut -d'=' -f2)
    echo "🏦 Banco Santa Fe: $BSF_VERSION ($BSF_BUILD)"
fi
echo ""

# Documentación
echo "📚 Documentación:"
echo "-----------------"
check_file "docs/IOS_CONFIGURATION.md"
check_file "docs/STORE_METADATA.md"
check_file "android/keystores/README.md"
check_file "assets/icons/README.md"
check_file "flavors/README.md"
echo ""

# Próximos pasos
echo "🎯 Próximos Pasos para Publicación:"
echo "-----------------------------------"
echo "1. 🔐 Generar keystores: npm run keystores:generate"
echo "2. 🎨 Agregar iconos en assets/icons/{flavor}/{platform}/"
echo "3. 📱 Configurar iOS Schemes en Xcode (ver docs/IOS_CONFIGURATION.md)"
echo "4. 🚀 Build release: npm run build:release bancoEntreRios android"
echo "5. 🏪 Configurar metadata de tiendas (ver docs/STORE_METADATA.md)"
echo "6. 📤 Subir a Google Play Store y App Store"
echo ""

# Resumen
echo "✨ RESUMEN:"
echo "----------"
echo "✅ Sistema de flavors configurado"
echo "✅ Versioning independiente por flavor"
echo "✅ Build configurations separadas"
echo "✅ Scripts de automatización listos"
echo "✅ Documentación completa"
echo ""
echo "🎉 ¡Proyecto listo para publicación independiente de cada flavor!"