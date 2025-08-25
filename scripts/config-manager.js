#!/usr/bin/env node

/**
 * 🏦 Config Manager - Gestión de configuraciones de flavors
 * 
 * Uso:
 *   node scripts/config-manager.js validate [flavor]
 *   node scripts/config-manager.js diff flavor1 flavor2
 *   node scripts/config-manager.js generate newFlavor baseFlavor
 *   node scripts/config-manager.js list
 */

const fs = require('fs');
const path = require('path');

const FLAVORS_DIR = path.join(__dirname, '..', 'flavors');
const CONFIG_FILES = ['config.json', 'build.json', 'features.json', 'api.json', 'metadata.json'];

// Bancos existentes en el proyecto
const EXISTING_FLAVORS = ['bancoEntreRios', 'bancoSantaCruz', 'bancoSantaFe', 'link'];

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateHexColor(color) {
  return /^#[0-9A-F]{6}$/i.test(color);
}

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateConfig(flavor, configData) {
  const errors = [];
  
  // Validar colores del tema
  if (configData.theme) {
    Object.entries(configData.theme).forEach(([key, color]) => {
      if (!validateHexColor(color)) {
        errors.push(`❌ Color inválido en theme.${key}: ${color}`);
      }
    });
  }
  
  // Validar email de contacto
  if (configData.contact?.supportEmail && !validateEmail(configData.contact.supportEmail)) {
    errors.push(`❌ Email inválido: ${configData.contact.supportEmail}`);
  }
  
  // Validar website
  if (configData.contact?.website && !validateUrl(configData.contact.website)) {
    errors.push(`❌ URL inválida: ${configData.contact.website}`);
  }
  
  return errors;
}

function validateApi(flavor, apiData) {
  const errors = [];
  
  // Validar URLs de entornos
  if (apiData.environments) {
    Object.entries(apiData.environments).forEach(([env, config]) => {
      if (!validateUrl(config.baseUrl)) {
        errors.push(`❌ URL inválida en ${env}: ${config.baseUrl}`);
      }
    });
  }
  
  // Validar montos de pago
  if (apiData.payment) {
    if (apiData.payment.maxAmount <= apiData.payment.minAmount) {
      errors.push(`❌ maxAmount debe ser mayor que minAmount`);
    }
  }
  
  return errors;
}

function validateBuild(flavor, buildData) {
  const errors = [];
  
  // Validar bundle IDs únicos
  const bundleId = buildData.bundleId;
  const androidPackage = buildData.bundleIds?.android;
  
  if (!bundleId || !androidPackage) {
    errors.push(`❌ Faltan bundleId o androidPackage`);
  }
  
  // Validar versiones
  if (buildData.version) {
    if (!/^\d+\.\d+\.\d+$/.test(buildData.version)) {
      errors.push(`❌ Formato de versión inválido: ${buildData.version}`);
    }
  }
  
  return errors;
}

function validateFlavor(flavor) {
  const flavorDir = path.join(FLAVORS_DIR, flavor);
  
  if (!fs.existsSync(flavorDir)) {
    log(`❌ Flavor '${flavor}' no existe`, 'red');
    return;
  }
  
  log(`🔍 Validando flavor: ${flavor}`, 'blue');
  
  let hasErrors = false;
  
  CONFIG_FILES.forEach(configFile => {
    const filePath = path.join(flavorDir, configFile);
    
    if (!fs.existsSync(filePath)) {
      log(`⚠️  ${configFile}: No encontrado`, 'yellow');
      return;
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      let errors = [];
      
      switch (configFile) {
        case 'config.json':
          errors = validateConfig(flavor, data);
          break;
        case 'api.json':
          errors = validateApi(flavor, data);
          break;
        case 'build.json':
          errors = validateBuild(flavor, data);
          break;
      }
      
      if (errors.length > 0) {
        hasErrors = true;
        log(`❌ ${configFile}:`, 'red');
        errors.forEach(error => log(`  ${error}`, 'red'));
      } else {
        log(`✅ ${configFile}: Válido`, 'green');
      }
      
    } catch (error) {
      hasErrors = true;
      log(`❌ ${configFile}: Error de JSON - ${error.message}`, 'red');
    }
  });
  
  if (!hasErrors) {
    log(`✅ Flavor '${flavor}' validado correctamente`, 'green');
  }
}

function listFlavors() {
  log('🏦 Flavors disponibles:', 'bold');
  log('=====================');
  
  EXISTING_FLAVORS.forEach(flavor => {
    const flavorDir = path.join(FLAVORS_DIR, flavor);
    if (fs.existsSync(flavorDir)) {
      log(`✅ ${flavor}`, 'green');
    } else {
      log(`❌ ${flavor} (no encontrado)`, 'red');
    }
  });
  
  log('');
  log('Para validar un flavor específico:', 'yellow');
  log('  node scripts/config-manager.js validate <flavor>', 'blue');
}

function compareConfigs(flavor1, flavor2) {
  const config1Dir = path.join(FLAVORS_DIR, flavor1);
  const config2Dir = path.join(FLAVORS_DIR, flavor2);
  
  if (!fs.existsSync(config1Dir) || !fs.existsSync(config2Dir)) {
    log('❌ Uno o ambos flavors no existen', 'red');
    return;
  }
  
  CONFIG_FILES.forEach(configFile => {
    const file1 = path.join(config1Dir, configFile);
    const file2 = path.join(config2Dir, configFile);
    
    if (!fs.existsSync(file1) || !fs.existsSync(file2)) {
      log(`⚠️  ${configFile}: Archivo faltante en uno de los flavors`, 'yellow');
      return;
    }
    
    try {
      const data1 = JSON.parse(fs.readFileSync(file1, 'utf8'));
      const data2 = JSON.parse(fs.readFileSync(file2, 'utf8'));
      
      const diff = compareObjects(data1, data2);
      if (diff.length > 0) {
        log(`📄 ${configFile}:`, 'yellow');
        diff.forEach(d => log(`  ${d}`, 'blue'));
      } else {
        log(`✅ ${configFile}: Idénticos`, 'green');
      }
      
    } catch (error) {
      log(`❌ Error comparando ${configFile}: ${error.message}`, 'red');
    }
  });
}

function compareObjects(obj1, obj2, path = '') {
  const differences = [];
  
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  
  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (!(key in obj1)) {
      differences.push(`➕ ${currentPath}: Solo en flavor2`);
    } else if (!(key in obj2)) {
      differences.push(`➖ ${currentPath}: Solo en flavor1`);
    } else if (typeof obj1[key] !== typeof obj2[key]) {
      differences.push(`🔄 ${currentPath}: Tipos diferentes`);
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      differences.push(...compareObjects(obj1[key], obj2[key], currentPath));
    } else if (obj1[key] !== obj2[key]) {
      differences.push(`🔄 ${currentPath}: "${obj1[key]}" vs "${obj2[key]}"`);
    }
  }
  
  return differences;
}

// Procesamiento de argumentos
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case 'validate':
    if (arg1) {
      validateFlavor(arg1);
    } else {
      // Validar todos los flavors existentes
      EXISTING_FLAVORS.forEach(flavor => {
        validateFlavor(flavor);
        console.log('');
      });
    }
    break;
    
  case 'diff':
    if (arg1 && arg2) {
      compareConfigs(arg1, arg2);
    } else {
      log('❌ Uso: node config-manager.js diff flavor1 flavor2', 'red');
    }
    break;
    
  case 'list':
    listFlavors();
    break;
    
  default:
    log('🏦 Config Manager - Gestión de configuraciones de flavors', 'bold');
    log('');
    log('Comandos disponibles:', 'blue');
    log('  validate [flavor]     - Validar configuraciones');
    log('  diff flavor1 flavor2  - Comparar configuraciones');
    log('  list                  - Listar flavors disponibles');
    log('');
    log('Flavors disponibles:', 'yellow');
    log(`  ${EXISTING_FLAVORS.join(', ')}`, 'blue');
    log('');
    log('Ejemplos:', 'yellow');
    log('  node scripts/config-manager.js validate bancoEntreRios');
    log('  node scripts/config-manager.js diff bancoEntreRios bancoSantaCruz');
    log('  node scripts/config-manager.js list');
}