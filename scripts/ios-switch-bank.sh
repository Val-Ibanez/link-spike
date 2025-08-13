#!/bin/bash

# Script simple para cambiar entre bancos en iOS
# Uso: ./scripts/ios-switch-bank.sh [banco]

BANK=${1:-bancoSantaCruz}

echo "🍎 CAMBIANDO BANCO EN iOS:"
echo "==========================="
echo "🏦 Banco: $BANK"
echo ""

# Verificar que el archivo .env existe
if [ ! -f ".env.$BANK" ]; then
    echo "❌ Error: No existe el archivo .env.$BANK"
    echo "📋 Bancos disponibles:"
    ls .env.* | sed 's/\.env\.//'
    exit 1
fi

# Copiar la configuración del banco
echo "📋 Copiando configuración de $BANK..."
cp ".env.$BANK" .env

echo "✅ Configuración actualizada"
echo "📱 Reinicia la app en iOS para ver los cambios"
echo ""
echo "🔍 Configuración actual:"
cat .env 