#!/bin/bash

# 🔐 Script para generar keystores de Android por flavor
# Genera keystores únicos para cada banco

echo "🔐 Generando keystores para Android..."

# Directorio de keystores
KEYSTORE_DIR="android/keystores"

# Función para generar keystore
generate_keystore() {
    local FLAVOR=$1
    local ALIAS=$2
    local KEYSTORE_FILE="$KEYSTORE_DIR/$FLAVOR.keystore"
    
    echo "📱 Generando keystore para $FLAVOR..."
    
    # Verificar si ya existe
    if [ -f "$KEYSTORE_FILE" ]; then
        echo "⚠️  Keystore $KEYSTORE_FILE ya existe."
        read -p "¿Deseas regenerarlo? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "⏭️  Saltando $FLAVOR..."
            return
        fi
        rm "$KEYSTORE_FILE"
    fi
    
    # Generar keystore
    keytool -genkey -v \
        -keystore "$KEYSTORE_FILE" \
        -alias "$ALIAS" \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -dname "CN=$FLAVOR, OU=Mobile, O=Bank, L=City, S=State, C=CO" \
        -storepass defaultpass \
        -keypass defaultpass
    
    if [ $? -eq 0 ]; then
        echo "✅ Keystore generado: $KEYSTORE_FILE"
    else
        echo "❌ Error generando keystore para $FLAVOR"
    fi
}

# Crear directorio si no existe
mkdir -p "$KEYSTORE_DIR"

# Generar keystores para cada flavor
generate_keystore "bancoEntreRios" "bancoEntreRios"
generate_keystore "bancoSantaCruz" "bancoSantaCruz"
generate_keystore "bancoSantaFe" "bancoSantaFe"

echo ""
echo "🎯 Keystores generados exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las variables de entorno:"
echo "   export BANCO_ENTRE_RIOS_STORE_PASSWORD='tu_password'"
echo "   export BANCO_ENTRE_RIOS_KEY_PASSWORD='tu_password'"
echo "   export BANCO_SANTA_CRUZ_STORE_PASSWORD='tu_password'"
echo "   export BANCO_SANTA_CRUZ_KEY_PASSWORD='tu_password'"
echo "   export BANCO_SANTA_FE_STORE_PASSWORD='tu_password'"
echo "   export BANCO_SANTA_FE_KEY_PASSWORD='tu_password'"
echo ""
echo "2. Para builds de release:"
echo "   npm run android:banco-entre-rios"
echo "   npm run android:banco-santa-cruz"
echo "   npm run android:banco-santa-fe"
echo ""
echo "🔒 IMPORTANTE: Guarda las contraseñas de forma segura!"