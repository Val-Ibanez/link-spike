#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const flavors = ['bancoEntreRios', 'bancoSantaCruz', 'bancoSantaFe'];

function showUsage() {
  console.log('🔀 React Native Flavor Switcher');
  console.log('');
  console.log('Uso:');
  console.log('  node scripts/flavor-switcher.js <flavor>');
  console.log('');
  console.log('Flavors disponibles:');
  flavors.forEach(flavor => {
    console.log(`  - ${flavor}`);
  });
  console.log('');
  console.log('Ejemplos:');
  console.log('  node scripts/flavor-switcher.js bancoEntreRios');
  console.log('  node scripts/flavor-switcher.js bancoSantaCruz');
  console.log('  node scripts/flavor-switcher.js bancoSantaFe');
}

function validateFlavor(flavor) {
  if (!flavors.includes(flavor)) {
    console.error(`❌ Error: El flavor '${flavor}' no es válido.`);
    console.log('');
    showUsage();
    process.exit(1);
  }
}

function getFlavorConfig(flavor) {
  const configPath = path.join(__dirname, '..', 'flavors', flavor, 'config.json');
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return config;
  } catch (error) {
    console.error(`❌ Error leyendo configuración del flavor '${flavor}':`, error.message);
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
  
  const config = getFlavorConfig(flavor);
  
  console.log(`🎯 Cambiando a flavor: ${flavor}`);
  console.log(`🏦 Banco: ${config.bankName}`);
  console.log(`🔑 Código: ${config.bankCode}`);
  console.log(`🎨 Color primario: ${config.primaryColor}`);
  console.log('');
  console.log('✅ Para ejecutar la app con este flavor, usa:');
  console.log(`   npm run ios:${flavor.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
  console.log('');
  console.log('📱 O abre Xcode y selecciona el esquema:', flavor);
}

if (require.main === module) {
  main();
}

module.exports = { flavors, validateFlavor, getFlavorConfig };

