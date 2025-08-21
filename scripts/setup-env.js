#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const flavors = ['bancoEntreRios', 'bancoSantaCruz', 'bancoSantaFe'];

function showUsage() {
  console.log('🔧 React Native Environment Setup');
  console.log('');
  console.log('Uso:');
  console.log('  node scripts/setup-env.js <flavor>');
  console.log('');
  console.log('Flavors disponibles:');
  flavors.forEach(flavor => {
    console.log(`  - ${flavor}`);
  });
  console.log('');
  console.log('Ejemplos:');
  console.log('  node scripts/setup-env.js bancoEntreRios');
  console.log('  node scripts/setup-env.js bancoSantaCruz');
  console.log('  node scripts/setup-env.js bancoSantaFe');
}

function validateFlavor(flavor) {
  if (!flavors.includes(flavor)) {
    console.error(`❌ Error: El flavor '${flavor}' no es válido.`);
    console.log('');
    showUsage();
    process.exit(1);
  }
}

function setupEnvironment(flavor) {
  const sourceEnvFile = path.join(__dirname, '..', `.env.${flavor}`);
  const targetEnvFile = path.join(__dirname, '..', '.env');
  
  try {
    // Verificar que el archivo fuente existe
    if (!fs.existsSync(sourceEnvFile)) {
      console.error(`❌ Error: No existe el archivo ${sourceEnvFile}`);
      process.exit(1);
    }
    
    // Copiar el archivo .env del flavor al archivo .env principal
    fs.copyFileSync(sourceEnvFile, targetEnvFile);
    
    console.log(`✅ Archivo .env configurado para: ${flavor}`);
    console.log(`📁 Copiado desde: ${sourceEnvFile}`);
    console.log(`📁 Destino: ${targetEnvFile}`);
    
    // Mostrar el contenido del archivo .env
    const envContent = fs.readFileSync(targetEnvFile, 'utf8');
    console.log('\n📋 Contenido del archivo .env:');
    console.log(envContent);
    
  } catch (error) {
    console.error(`❌ Error configurando el entorno:`, error.message);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showUsage();
    process.exit(1);
  }

  const flavor = args[0];
  validateFlavor(flavor);
  
  console.log(`🎯 Configurando entorno para flavor: ${flavor}`);
  console.log('');
  
  setupEnvironment(flavor);
  
  console.log('');
  console.log('🚀 Ahora puedes ejecutar el build:');
  console.log(`   npm run ios:${flavor.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
  console.log(`   npm run android:${flavor.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
}

if (require.main === module) {
  main();
}

module.exports = { flavors, validateFlavor, setupEnvironment };
