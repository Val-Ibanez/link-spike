#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de React Native Config...\n');

// Verificar que react-native-config esté instalado
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ No se encontró package.json');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
if (!packageJson.dependencies['react-native-config']) {
  console.error('❌ react-native-config no está instalado como dependencia');
  process.exit(1);
}

console.log('✅ react-native-config está instalado');

// Verificar archivos .env de flavors
const flavors = ['bancoEntreRios', 'bancoSantaCruz', 'bancoSantaFe'];
console.log('\n📋 Verificando archivos .env de flavors:');

flavors.forEach(flavor => {
  const envPath = path.join(__dirname, '..', `.env.${flavor}`);
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    console.log(`✅ ${flavor}: ${envPath}`);
    console.log(`   Contenido: ${content.trim()}`);
  } else {
    console.log(`❌ ${flavor}: ${envPath} - NO ENCONTRADO`);
  }
});

// Verificar archivos .xcconfig de iOS
console.log('\n📱 Verificando archivos .xcconfig de iOS:');

flavors.forEach(flavor => {
  const xcconfigPath = path.join(__dirname, '..', 'ios', 'Config', `${flavor}.xcconfig`);
  if (fs.existsSync(xcconfigPath)) {
    const content = fs.readFileSync(xcconfigPath, 'utf8');
    console.log(`✅ ${flavor}: ${xcconfigPath}`);
    
    // Verificar que tenga la configuración de ENVFILE
    if (content.includes('ENVFILE')) {
      console.log(`   ✅ Configuración ENVFILE encontrada`);
    } else {
      console.log(`   ⚠️  Configuración ENVFILE NO encontrada`);
    }
  } else {
    console.log(`❌ ${flavor}: ${xcconfigPath} - NO ENCONTRADO`);
  }
});

// Verificar configuración de react-native.config.js
console.log('\n⚙️  Verificando react-native.config.js:');
const rnConfigPath = path.join(__dirname, '..', 'react-native.config.js');
if (fs.existsSync(rnConfigPath)) {
  const content = fs.readFileSync(rnConfigPath, 'utf8');
  console.log(`✅ react-native.config.js encontrado`);
  
  if (content.includes('flavors')) {
    console.log(`   ✅ Configuración de flavors encontrada`);
  } else {
    console.log(`   ⚠️  Configuración de flavors NO encontrada`);
  }
  
  if (content.includes('react-native-config')) {
    console.log(`   ✅ Configuración de react-native-config encontrada`);
  } else {
    console.log(`   ⚠️  Configuración de react-native-config NO encontrada`);
  }
} else {
  console.log(`❌ react-native.config.js - NO ENCONTRADO`);
}

// Verificar que el archivo .env principal existe
console.log('\n📄 Verificando archivo .env principal:');
const mainEnvPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(mainEnvPath)) {
  const content = fs.readFileSync(mainEnvPath, 'utf8');
  console.log(`✅ .env encontrado`);
  console.log(`   Contenido: ${content.trim()}`);
} else {
  console.log(`❌ .env - NO ENCONTRADO`);
}

console.log('\n🎯 Resumen de verificación:');
console.log('Para probar la configuración:');
console.log('1. npm run ios:config:banco-entre-rios');
console.log('2. npm run ios:banco-entre-rios');
console.log('3. npm run ios:config:banco-santa-cruz');
console.log('4. npm run ios:banco-santa-cruz');
console.log('5. npm run ios:config:banco-santa-fe');
console.log('6. npm run ios:banco-santa-fe');
console.log('\nSi hay problemas, ejecuta: npm run ios:clean-pods');
