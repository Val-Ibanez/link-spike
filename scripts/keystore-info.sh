#!/bin/bash

# 🔍 Script para verificar información de keystores

echo "🔍 Verificando keystores..."

KEYSTORE_DIR="android/keystores"

# Función para mostrar info del keystore
show_keystore_info() {
    local KEYSTORE_FILE=$1
    local ALIAS=$2
    
    if [ -f "$KEYSTORE_FILE" ]; then
        echo "✅ $KEYSTORE_FILE encontrado"
        echo "📋 Información del keystore:"
        keytool -list -v -keystore "$KEYSTORE_FILE" -alias "$ALIAS" -storepass defaultpass | head -20
        echo "----------------------------------------"
    else
        echo "❌ $KEYSTORE_FILE NO encontrado"
        echo "💡 Ejecuta: npm run keystores:generate"
        echo "----------------------------------------"
    fi
}

# Verificar keystores
show_keystore_info "$KEYSTORE_DIR/bancoEntreRios.keystore" "bancoEntreRios"
show_keystore_info "$KEYSTORE_DIR/bancoSantaCruz.keystore" "bancoSantaCruz"
show_keystore_info "$KEYSTORE_DIR/bancoSantaFe.keystore" "bancoSantaFe"

echo ""
echo "🔐 Variables de entorno requeridas:"
echo "BANCO_ENTRE_RIOS_STORE_PASSWORD=${BANCO_ENTRE_RIOS_STORE_PASSWORD:-'❌ NO CONFIGURADA'}"
echo "BANCO_ENTRE_RIOS_KEY_PASSWORD=${BANCO_ENTRE_RIOS_KEY_PASSWORD:-'❌ NO CONFIGURADA'}"
echo "BANCO_SANTA_CRUZ_STORE_PASSWORD=${BANCO_SANTA_CRUZ_STORE_PASSWORD:-'❌ NO CONFIGURADA'}"
echo "BANCO_SANTA_CRUZ_KEY_PASSWORD=${BANCO_SANTA_CRUZ_KEY_PASSWORD:-'❌ NO CONFIGURADA'}"
echo "BANCO_SANTA_FE_STORE_PASSWORD=${BANCO_SANTA_FE_STORE_PASSWORD:-'❌ NO CONFIGURADA'}"
echo "BANCO_SANTA_FE_KEY_PASSWORD=${BANCO_SANTA_FE_KEY_PASSWORD:-'❌ NO CONFIGURADA'}"

if [ -z "$BANCO_ENTRE_RIOS_STORE_PASSWORD" ] || [ -z "$BANCO_SANTA_CRUZ_STORE_PASSWORD" ] || [ -z "$BANCO_SANTA_FE_STORE_PASSWORD" ]; then
    echo ""
    echo "⚠️  Configura las variables de entorno para builds de release:"
    echo "export BANCO_ENTRE_RIOS_STORE_PASSWORD='tu_password'"
    echo "export BANCO_ENTRE_RIOS_KEY_PASSWORD='tu_password'"
    echo "export BANCO_SANTA_CRUZ_STORE_PASSWORD='tu_password'"
    echo "export BANCO_SANTA_CRUZ_KEY_PASSWORD='tu_password'"
    echo "export BANCO_SANTA_FE_STORE_PASSWORD='tu_password'"
    echo "export BANCO_SANTA_FE_KEY_PASSWORD='tu_password'"
fi