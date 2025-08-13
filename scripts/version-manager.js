#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Función para leer archivo .env
function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo no encontrado: ${filePath}`);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  
  content.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      env[key.trim()] = value.trim();
    }
  });
  
  return env;
}

// Función para escribir archivo .env
function writeEnvFile(filePath, env) {
  const lines = [];
  
  Object.keys(env).forEach(key => {
    lines.push(`${key}=${env[key]}`);
  });
  
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

// Función para incrementar versión
function bumpVersion(version, type) {
  const parts = version.split('.').map(Number);
  
  switch (type) {
    case 'patch':
      parts[2]++;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    default:
      throw new Error(`Tipo de bump inválido: ${type}`);
  }
  
  return parts.join('.');
}

// Función principal
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const flavor = args[1];
  const bumpType = args[2];
  
  if (command === 'status') {
    // Mostrar estado de versiones de todos los flavors
    console.log('\n🏦 Estado de Versiones por Flavor\n' + '='.repeat(50));
    
    const flavors = ['bancoNacional', 'bancoPopular'];
    
    flavors.forEach(f => {
      try {
        const envPath = `.env.${f}`;
        const env = readEnvFile(envPath);
        
        console.log(`\n📱 ${f.toUpperCase()}`);
        console.log(`   Versión: ${env.VERSION_NAME || 'N/A'} (Build: ${env.BUILD_NUMBER || 'N/A'})`);
        console.log(`   Código: ${env.VERSION_CODE || 'N/A'}`);
        console.log(`   Stage: ${env.RELEASE_STAGE || 'N/A'}`);
        console.log(`   Bundle: ${env.BUNDLE_ID || 'N/A'}`);
      } catch (error) {
        console.log(`\n❌ ${f.toUpperCase()}: Error - ${error.message}`);
      }
    });
    
    console.log('\n');
    return;
  }
  
  if (command === 'bump') {
    if (!flavor || !bumpType) {
      console.log('Uso: node version-manager.js bump <flavor> <patch|minor|major>');
      console.log('Ejemplo: node version-manager.js bump bancoNacional patch');
      return;
    }
    
    try {
      const envPath = `.env.${flavor}`;
      const env = readEnvFile(envPath);
      
      // Incrementar versión
      const oldVersion = env.VERSION_NAME || '1.0.0';
      const newVersion = bumpVersion(oldVersion, bumpType);
      
      // Incrementar códigos
      const oldVersionCode = parseInt(env.VERSION_CODE || '1');
      const newVersionCode = oldVersionCode + 1;
      
      const oldBuildNumber = parseInt(env.BUILD_NUMBER || '1');
      const newBuildNumber = oldBuildNumber + 1;
      
      // Actualizar valores
      env.VERSION_NAME = newVersion;
      env.VERSION_CODE = newVersionCode.toString();
      env.BUILD_NUMBER = newBuildNumber.toString();
      
      // Escribir archivo
      writeEnvFile(envPath, env);
      
      console.log(`\n✅ Versión actualizada para ${flavor.toUpperCase()}`);
      console.log(`   ${oldVersion} (${oldBuildNumber}) → ${newVersion} (${newBuildNumber})`);
      console.log(`   Version Code: ${oldVersionCode} → ${newVersionCode}`);
      console.log(`   Archivo: ${envPath}\n`);
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
    
    return;
  }
  
  if (command === 'release') {
    if (!flavor) {
      console.log('Uso: node version-manager.js release <flavor>');
      console.log('Ejemplo: node version-manager.js release bancoNacional');
      return;
    }
    
    try {
      const envPath = `.env.${flavor}`;
      const env = readEnvFile(envPath);
      
      // Cambiar a producción
      env.RELEASE_STAGE = 'prod';
      writeEnvFile(envPath, env);
      
      console.log(`\n🚀 ${flavor.toUpperCase()} marcado como PRODUCTION`);
      console.log(`   Versión: ${env.VERSION_NAME} (${env.BUILD_NUMBER})`);
      console.log(`   Stage: ${env.RELEASE_STAGE}\n`);
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
    
    return;
  }
  
  // Mostrar ayuda
  console.log('\n🔧 Version Manager para Flavors\n' + '='.repeat(40));
  console.log('Comandos disponibles:');
  console.log('  status                           - Mostrar estado de todos los flavors');
  console.log('  bump <flavor> <patch|minor|major> - Incrementar versión de un flavor');
  console.log('  release <flavor>                 - Marcar flavor como production');
  console.log('\nEjemplos:');
  console.log('  node version-manager.js status');
  console.log('  node version-manager.js bump bancoNacional patch');
  console.log('  node version-manager.js bump bancoPopular minor');
  console.log('  node version-manager.js release bancoNacional\n');
}

main();