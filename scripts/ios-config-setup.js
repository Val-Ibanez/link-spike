#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const flavor = process.argv[2];

if (!flavor) {
  console.error('❌ Error: Debes especificar un flavor');
  console.log('Uso: node scripts/ios-config-setup.js <flavor>');
  console.log('Flavors disponibles: bancoEntreRios, bancoSantaCruz, bancoSantaFe');
  process.exit(1);
}

console.log(`🔧 Configurando iOS para flavor: ${flavor}`);

// Verificar que el flavor existe
const flavorConfigPath = path.join(__dirname, '..', 'flavors', flavor, 'config', 'config.json');
if (!fs.existsSync(flavorConfigPath)) {
  console.error(`❌ Error: No se encontró configuración para el flavor ${flavor}`);
  process.exit(1);
}

// Leer configuración del flavor
const flavorConfig = JSON.parse(fs.readFileSync(flavorConfigPath, 'utf8'));
console.log(`📋 Configuración del flavor:`, flavorConfig.displayName);

// Verificar que existe el archivo .xcconfig correspondiente
const xcconfigPath = path.join(__dirname, '..', 'ios', 'Config', `${flavor}.xcconfig`);
if (!fs.existsSync(xcconfigPath)) {
  console.error(`❌ Error: No se encontró el archivo .xcconfig para ${flavor}`);
  console.log(`Ruta esperada: ${xcconfigPath}`);
  process.exit(1);
}

console.log(`✅ Archivo .xcconfig encontrado: ${xcconfigPath}`);

// Verificar que existe el archivo .env del flavor
const envPath = path.join(__dirname, '..', `.env.${flavor}`);
if (!fs.existsSync(envPath)) {
  console.error(`❌ Error: No se encontró el archivo .env para ${flavor}`);
  console.log(`Ruta esperada: ${envPath}`);
  process.exit(1);
}

console.log(`✅ Archivo .env encontrado: ${envPath}`);

// Verificar que el proyecto de iOS existe
const iosProjectPath = path.join(__dirname, '..', 'ios', 'MyReactNativeApp.xcworkspace');
if (!fs.existsSync(iosProjectPath)) {
  console.error(`❌ Error: No se encontró el proyecto de iOS`);
  console.log(`Ruta esperada: ${iosProjectPath}`);
  process.exit(1);
}

console.log(`✅ Proyecto de iOS encontrado: ${iosProjectPath}`);

// Verificar que el scheme existe
try {
  const schemes = execSync('cd ios && xcodebuild -list -workspace MyReactNativeApp.xcworkspace', { encoding: 'utf8' });
  if (schemes.includes(flavor)) {
    console.log(`✅ Scheme ${flavor} encontrado en el proyecto`);
  } else {
    console.warn(`⚠️  Scheme ${flavor} no encontrado en el proyecto`);
    console.log(`📋 Schemes disponibles:`);
    console.log(schemes);
  }
} catch (error) {
  console.warn(`⚠️  No se pudo verificar los schemes: ${error.message}`);
}

console.log(`\n🎯 Configuración completada para ${flavor}`);
console.log(`📱 Para ejecutar: npm run ios:${flavor.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
console.log(`🔧 Para abrir en Xcode: open ios/MyReactNativeApp.xcworkspace`);
