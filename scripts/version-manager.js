#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Bancos existentes en el proyecto
const EXISTING_FLAVORS = ['bancoEntreRios', 'bancoSantaCruz', 'bancoSantaFe', 'link'];

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
    // Mostrar estado de versiones de todos los flavors existentes
    console.log('\n🏦 Estado de Versiones por Flavor\n' + '='.repeat(50));
    
    EXISTING_FLAVORS.forEach(f => {
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
      console.log('Flavors disponibles:', EXISTING_FLAVORS.join(', '));
      console.log('Ejemplo: node version-manager.js bump bancoEntreRios patch');
      return;
    }
    
    if (!EXISTING_FLAVORS.includes(flavor)) {
      console.log(`❌ Flavor '${flavor}' no existe. Flavors disponibles:`, EXISTING_FLAVORS.join(', '));
      return;
    }
    
    try {
      const envPath = `.env.${flavor}`;
      const env = readEnvFile(envPath);
      
      const currentVersion = env.VERSION_NAME || '1.0.0';
      const newVersion = bumpVersion(currentVersion, bumpType);
      
      env.VERSION_NAME = newVersion;
      env.VERSION_CODE = (parseInt(env.VERSION_CODE || '1') + 1).toString();
      
      writeEnvFile(envPath, env);
      
      console.log(`✅ ${flavor}: ${currentVersion} → ${newVersion}`);
      console.log(`   Build: ${env.VERSION_CODE}`);
      
    } catch (error) {
      console.log(`❌ Error actualizando versión de ${flavor}: ${error.message}`);
    }
    
    return;
  }
  
  if (command === 'sync') {
    if (!flavor) {
      console.log('Uso: node version-manager.js sync <flavor>');
      console.log('Flavors disponibles:', EXISTING_FLAVORS.join(', '));
      console.log('Ejemplo: node version-manager.js sync bancoEntreRios');
      return;
    }
    
    if (!EXISTING_FLAVORS.includes(flavor)) {
      console.log(`❌ Flavor '${flavor}' no existe. Flavors disponibles:`, EXISTING_FLAVORS.join(', '));
      return;
    }
    
    try {
      const envPath = `.env.${flavor}`;
      const env = readEnvFile(envPath);
      
      // Sincronizar con package.json
      const packagePath = path.join(__dirname, '..', 'package.json');
      const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      env.VERSION_NAME = packageData.version;
      writeEnvFile(envPath, env);
      
      console.log(`✅ ${flavor} sincronizado con package.json: ${packageData.version}`);
      
    } catch (error) {
      console.log(`❌ Error sincronizando ${flavor}: ${error.message}`);
    }
    
    return;
  }
  
  // Comando no reconocido
  console.log('🏦 Version Manager - Gestión de versiones por flavor');
  console.log('');
  console.log('Comandos disponibles:');
  console.log('  status                    - Mostrar estado de versiones');
  console.log('  bump <flavor> <type>      - Incrementar versión');
  console.log('  sync <flavor>             - Sincronizar con package.json');
  console.log('');
  console.log('Flavors disponibles:', EXISTING_FLAVORS.join(', '));
  console.log('Tipos de bump: patch, minor, major');
  console.log('');
  console.log('Ejemplos:');
  console.log('  node scripts/version-manager.js status');
  console.log('  node scripts/version-manager.js bump bancoEntreRios patch');
  console.log('  node scripts/version-manager.js sync bancoEntreRios');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}