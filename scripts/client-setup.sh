#!/bin/bash

# 🏛️ Script para configurar credenciales de cliente

CLIENTE=${1:-""}

show_help() {
    echo "🏛️ Client Setup Script"
    echo ""
    echo "Uso: $0 <cliente>"
    echo ""
    echo "Clientes disponibles:"
    echo "  bancoEntreRios"
    echo "  bancoSantaCruz"
    echo "  bancoSantaFe"
    echo ""
    echo "Ejemplo: $0 bancoEntreRios"
}

if [ -z "$CLIENTE" ]; then
    show_help
    exit 1
fi

echo "🏛️ Configurando credenciales para: $CLIENTE"
echo "============================================"

# Crear estructura de directorios
CREDENTIALS_DIR="credentials/$CLIENTE"
mkdir -p "$CREDENTIALS_DIR"

echo "📁 Directorio creado: $CREDENTIALS_DIR"
echo ""

# Crear archivos de ejemplo
cat > "$CREDENTIALS_DIR/README.md" << EOF
# 🔐 Credenciales para $CLIENTE

## 📋 Archivos Requeridos

### 🤖 Android (Google Play)
- \`google-service-account.json\` - Service Account para automatización
- \`android-keystore.jks\` - Keystore para firma (opcional)

### 🍎 iOS (App Store)
- \`apple-api-key.p8\` - App Store Connect API Key
- \`apple-api-key-id.txt\` - Key ID
- \`apple-api-issuer.txt\` - Issuer ID

## 🔧 Variables de Entorno
\`\`\`bash
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/$CREDENTIALS_DIR/google-service-account.json"
export APPLE_API_KEY_PATH="$PWD/$CREDENTIALS_DIR/apple-api-key.p8"
export APPLE_API_KEY_ID="\$(cat $PWD/$CREDENTIALS_DIR/apple-api-key-id.txt)"
export APPLE_API_ISSUER="\$(cat $PWD/$CREDENTIALS_DIR/apple-api-issuer.txt)"
\`\`\`

## ⚠️ IMPORTANTE
- **NUNCA** commitear estos archivos a Git
- Manejar con máxima confidencialidad
- Revocar accesos al finalizar proyecto si es necesario
EOF

# Crear placeholders para archivos de credenciales
touch "$CREDENTIALS_DIR/google-service-account.json.example"
touch "$CREDENTIALS_DIR/apple-api-key.p8.example"
echo "ABC123DEF4" > "$CREDENTIALS_DIR/apple-api-key-id.txt.example"
echo "69a6de80-cfdd-47c3-8664-acf4b3b6b3ca" > "$CREDENTIALS_DIR/apple-api-issuer.txt.example"

# Agregar a .gitignore si no existe
if ! grep -q "credentials/" .gitignore 2>/dev/null; then
    echo "" >> .gitignore
    echo "# 🔐 Client credentials - NEVER commit" >> .gitignore
    echo "credentials/" >> .gitignore
    echo "*.json" >> .gitignore
    echo "*.p8" >> .gitignore
    echo "*.jks" >> .gitignore
    echo "*.keystore" >> .gitignore
fi

echo "✅ Estructura creada para $CLIENTE"
echo ""
echo "📋 Próximos pasos:"
echo "1. Solicitar credenciales al cliente"
echo "2. Colocar archivos en: $CREDENTIALS_DIR/"
echo "3. Configurar variables de entorno"
echo "4. Probar deploy: npm run deploy:$CLIENTE"
echo ""
echo "📧 Template de email disponible en: docs/CLIENT_PUBLISHING_GUIDE.md"