#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const flavor = process.argv[2];

if (!flavor) {
  console.error('❌ Error: Debes especificar un flavor');
  console.log('Uso: node scripts/prepare-env.js <flavor>');
  console.log('Flavors disponibles: bancoEntreRios, bancoSantaCruz, bancoSantaFe');
  process.exit(1);
}

const envFile = `.env.${flavor}`;
const targetFile = '.env';

if (!fs.existsSync(envFile)) {
  console.error(`❌ Error: El archivo ${envFile} no existe`);
  process.exit(1);
}

try {
  // Copiar el archivo .env del flavor al archivo .env principal
  fs.copyFileSync(envFile, targetFile);
  console.log(`✅ Archivo .env configurado para ${flavor}`);
  console.log(`📁 Copiado ${envFile} → ${targetFile}`);
  
  // Leer y mostrar el contenido del archivo .env para verificación
  const envContent = fs.readFileSync(targetFile, 'utf8');
  console.log(`📋 Contenido del archivo .env:`);
  console.log(envContent);
  
  // Verificar que React Native Config pueda leer las variables
  console.log(`🔍 Verificando configuración de React Native Config...`);
  
  // Verificar que el archivo .env existe y tiene contenido
  if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 0) {
    console.log(`✅ Archivo .env válido y listo para React Native Config`);
  } else {
    console.error(`❌ Error: El archivo .env no se copió correctamente`);
    process.exit(1);
  }
  
} catch (error) {
  console.error(`❌ Error al copiar el archivo: ${error.message}`);
  process.exit(1);
}
