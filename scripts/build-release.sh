#!/bin/bash

# 🚀 Script automatizado de build para release de cada flavor

set -e  # Exit on any error

FLAVOR=${1:-""}
PLATFORM=${2:-"both"}

# Función de ayuda
show_help() {
    echo "🚀 Build Release Script"
    echo ""
    echo "Uso: $0 <flavor> [platform]"
    echo ""
    echo "Flavors disponibles:"
    echo "  bancoEntreRios    Build para Banco Entre Ríos"
    echo "  bancoSantaCruz    Build para Banco Santa Cruz"
    echo "  bancoSantaFe      Build para Banco Santa Fe"
    echo "  all               Build todos los flavors"
    echo ""
    echo "Plataformas:"
    echo "  android          Solo Android"
    echo "  ios              Solo iOS"
    echo "  both             Ambas plataformas (default)"
    echo ""
    echo "Ejemplos:"
    echo "  $0 bancoEntreRios android"
    echo "  $0 bancoSantaCruz ios"
    echo "  $0 all both"
}

# Validar parámetros
if [ -z "$FLAVOR" ]; then
    show_help
    exit 1
fi

# Función para build Android
build_android() {
    local FLAVOR_NAME=$1
    echo "🤖 Building Android release para $FLAVOR_NAME..."
    
    # Verificar keystore
    local KEYSTORE_FILE="android/keystores/${FLAVOR_NAME}.keystore"
    if [ ! -f "$KEYSTORE_FILE" ]; then
        echo "❌ Keystore no encontrado: $KEYSTORE_FILE"
        echo "💡 Ejecuta: npm run keystores:generate"
        return 1
    fi
    
    # Build
    cd android
    ./gradlew clean
    ./gradlew "assemble${FLAVOR_NAME^}Release"
    cd ..
    
    echo "✅ Android build completado para $FLAVOR_NAME"
    echo "📱 APK ubicación: android/app/build/outputs/apk/${FLAVOR_NAME}/release/"
}

# Función para build iOS  
build_ios() {
    local FLAVOR_NAME=$1
    echo "🍎 Building iOS release para $FLAVOR_NAME..."
    
    # Copiar .env específico
    cp ".env.${FLAVOR_NAME}" .env
    
    # Archive iOS (requiere Xcode configurado)
    echo "⚠️  Para iOS release, abre Xcode y:"
    echo "1. Selecciona scheme: MyReactNativeApp-${FLAVOR_NAME^}"
    echo "2. Product → Archive"
    echo "3. Distribuir a App Store Connect"
    
    # Comando alternativo (requiere configuración previa)
    # xcodebuild -workspace ios/MyReactNativeApp.xcworkspace \
    #            -scheme "MyReactNativeApp-${FLAVOR_NAME^}" \
    #            -configuration Release \
    #            archive -archivePath "build/${FLAVOR_NAME}.xcarchive"
}

# Función principal de build
build_flavor() {
    local FLAVOR_NAME=$1
    
    echo "🎯 Iniciando build release para: $FLAVOR_NAME"
    echo "📱 Plataforma(s): $PLATFORM"
    echo "----------------------------------------"
    
    # Pre-checks
    echo "🔍 Verificando configuración..."
    
    # Verificar .env file
    if [ ! -f ".env.${FLAVOR_NAME}" ]; then
        echo "❌ Archivo .env.${FLAVOR_NAME} no encontrado"
        exit 1
    fi
    
    # Limpiar cache
    echo "🧹 Limpiando cache..."
    ./scripts/kill-metro.sh || true
    
    # Build por plataforma
    if [ "$PLATFORM" = "android" ] || [ "$PLATFORM" = "both" ]; then
        build_android "$FLAVOR_NAME"
    fi
    
    if [ "$PLATFORM" = "ios" ] || [ "$PLATFORM" = "both" ]; then
        build_ios "$FLAVOR_NAME"
    fi
    
    echo "🎉 Build completado para $FLAVOR_NAME!"
}

# Ejecutar build
case $FLAVOR in
    "bancoEntreRios")
        build_flavor "bancoEntreRios"
        ;;
    "bancoSantaCruz")
        build_flavor "bancoSantaCruz"
        ;;
    "bancoSantaFe")
        build_flavor "bancoSantaFe"
        ;;
    "all")
        echo "🌟 Building todos los flavors..."
        build_flavor "bancoEntreRios"
        echo ""
        build_flavor "bancoSantaCruz"
        echo ""
        build_flavor "bancoSantaFe"
        ;;
    *)
        echo "❌ Flavor inválido: $FLAVOR"
        show_help
        exit 1
        ;;
esac

echo ""
echo "🏁 Proceso de build completado!"
echo ""
echo "📋 Próximos pasos para publicación:"
echo "1. Android: Sube los APKs desde android/app/build/outputs/apk/"
echo "2. iOS: Distribuye desde Xcode Organizer"
echo "3. Configura metadata en las tiendas"