#!/usr/bin/env node

/**
 * 🎨 Assets Processor - Gestión automática de assets por flavor
 * 
 * Uso:
 *   node scripts/assets-processor.js process [flavor]
 *   node scripts/assets-processor.js validate [flavor]
 *   node scripts/assets-processor.js list
 *   node scripts/assets-processor.js clean
 */

const fs = require('fs');
const path = require('path');

const ASSETS_SOURCE_DIR = path.join(__dirname, '..', 'assets', 'flavors');
const ASSETS_TARGET_DIR = path.join(__dirname, '..', 'assets', 'images');
const FONTS_TARGET_DIR = path.join(__dirname, '..', 'assets', 'fonts');

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

function getAvailableFlavors() {
  if (!fs.existsSync(ASSETS_SOURCE_DIR)) {
    return [];
  }
  
  return fs.readdirSync(ASSETS_SOURCE_DIR)
    .filter(item => fs.statSync(path.join(ASSETS_SOURCE_DIR, item)).isDirectory());
}

function processAssets(flavor) {
  const sourceDir = path.join(ASSETS_SOURCE_DIR, flavor);
  
  if (!fs.existsSync(sourceDir)) {
    log(`❌ No existe la carpeta source para ${flavor}: ${sourceDir}`, 'red');
    return false;
  }
  
  log(`🎨 Procesando assets para ${flavor}...`, 'blue');
  
  // Procesar imágenes
  const imagesSource = path.join(sourceDir, 'images');
  if (fs.existsSync(imagesSource)) {
    const images = fs.readdirSync(imagesSource).filter(f => f.match(/\.(png|jpg|jpeg|gif)$/i));
    
    images.forEach(image => {
      const sourceFile = path.join(imagesSource, image);
      const targetName = `${path.parse(image).name}-${flavor}${path.parse(image).ext}`;
      const targetFile = path.join(ASSETS_TARGET_DIR, targetName);
      
      try {
        fs.copyFileSync(sourceFile, targetFile);
        log(`  ✅ ${image} → ${targetName}`, 'green');
      } catch (error) {
        log(`  ❌ Error copiando ${image}: ${error.message}`, 'red');
      }
    });
  }
  
  // Procesar fuentes
  const fontsSource = path.join(sourceDir, 'fonts');
  if (fs.existsSync(fontsSource)) {
    const fonts = fs.readdirSync(fontsSource).filter(f => f.match(/\.(ttf|otf)$/i));
    
    fonts.forEach(font => {
      const sourceFile = path.join(fontsSource, font);
      const targetFile = path.join(FONTS_TARGET_DIR, font);
      
      try {
        fs.copyFileSync(sourceFile, targetFile);
        log(`  ✅ ${font} → fonts/`, 'green');
      } catch (error) {
        log(`  ❌ Error copiando ${font}: ${error.message}`, 'red');
      }
    });
  }
  
  log(`🎉 Assets de ${flavor} procesados exitosamente!`, 'green');
  return true;
}

function validateAssets(flavor) {
  log(`🔍 Validando assets para ${flavor}...`, 'blue');
  
  const sourceDir = path.join(ASSETS_SOURCE_DIR, flavor);
  const errors = [];
  
  if (!fs.existsSync(sourceDir)) {
    errors.push(`❌ No existe directorio source: ${sourceDir}`);
    return errors;
  }
  
  // Verificar imágenes requeridas
  const requiredImages = ['logo.png', 'background.png'];
  const imagesDir = path.join(sourceDir, 'images');
  
  if (fs.existsSync(imagesDir)) {
    requiredImages.forEach(reqImage => {
      const imagePath = path.join(imagesDir, reqImage);
      if (!fs.existsSync(imagePath)) {
        errors.push(`⚠️  Imagen faltante: ${reqImage}`);
      } else {
        log(`  ✅ ${reqImage}`, 'green');
      }
    });
  } else {
    errors.push(`❌ No existe directorio de imágenes: ${imagesDir}`);
  }
  
  // Verificar que assets procesados existen
  const processedImages = [`logo-${flavor}.png`, `background-${flavor}.png`];
  processedImages.forEach(processedImage => {
    const processedPath = path.join(ASSETS_TARGET_DIR, processedImage);
    if (!fs.existsSync(processedPath)) {
      errors.push(`⚠️  Asset procesado faltante: ${processedImage} (ejecuta: npm run assets:process:${flavor})`);
    } else {
      log(`  ✅ ${processedImage} (procesado)`, 'green');
    }
  });
  
  if (errors.length === 0) {
    log(`🎉 ${flavor} validado exitosamente!`, 'green');
  } else {
    log(`💥 ${flavor} tiene ${errors.length} problemas:`, 'red');
    errors.forEach(error => log(`  ${error}`, 'red'));
  }
  
  return errors;
}

function listAssets() {
  log('🎨 Assets disponibles por flavor:', 'blue');
  
  const flavors = getAvailableFlavors();
  
  if (flavors.length === 0) {
    log('❌ No se encontraron flavors en assets/flavors/', 'red');
    return;
  }
  
  flavors.forEach(flavor => {
    log(`\n🏦 ${flavor}:`, 'yellow');
    
    const sourceDir = path.join(ASSETS_SOURCE_DIR, flavor);
    
    // Listar imágenes source
    const imagesDir = path.join(sourceDir, 'images');
    if (fs.existsSync(imagesDir)) {
      const images = fs.readdirSync(imagesDir).filter(f => f.match(/\.(png|jpg|jpeg|gif)$/i));
      log(`  📁 Imágenes source (${images.length}):`, 'blue');
      images.forEach(img => log(`    ${img}`, 'reset'));
    }
    
    // Listar fuentes source
    const fontsDir = path.join(sourceDir, 'fonts');
    if (fs.existsSync(fontsDir)) {
      const fonts = fs.readdirSync(fontsDir).filter(f => f.match(/\.(ttf|otf)$/i));
      log(`  📁 Fuentes source (${fonts.length}):`, 'blue');
      fonts.forEach(font => log(`    ${font}`, 'reset'));
    }
    
    // Listar assets procesados
    const processedImages = fs.readdirSync(ASSETS_TARGET_DIR)
      .filter(f => f.includes(`-${flavor}.`));
    
    if (processedImages.length > 0) {
      log(`  ✅ Assets procesados (${processedImages.length}):`, 'green');
      processedImages.forEach(img => log(`    ${img}`, 'reset'));
    } else {
      log(`  ⚠️  Sin assets procesados (ejecuta: npm run assets:process:${flavor})`, 'yellow');
    }
  });
}

function cleanProcessedAssets() {
  log('🧹 Limpiando assets procesados...', 'blue');
  
  const flavors = getAvailableFlavors();
  let cleanedCount = 0;
  
  flavors.forEach(flavor => {
    const processedFiles = fs.readdirSync(ASSETS_TARGET_DIR)
      .filter(f => f.includes(`-${flavor}.`));
    
    processedFiles.forEach(file => {
      const filePath = path.join(ASSETS_TARGET_DIR, file);
      try {
        fs.unlinkSync(filePath);
        log(`  🗑️  ${file}`, 'yellow');
        cleanedCount++;
      } catch (error) {
        log(`  ❌ Error eliminando ${file}: ${error.message}`, 'red');
      }
    });
  });
  
  log(`🎉 ${cleanedCount} archivos limpiados`, 'green');
}

// Procesamiento de argumentos
const command = process.argv[2];
const flavor = process.argv[3];

switch (command) {
  case 'process':
    if (flavor) {
      processAssets(flavor);
    } else {
      // Procesar todos los flavors
      const flavors = getAvailableFlavors();
      flavors.forEach(f => processAssets(f));
    }
    break;
    
  case 'validate':
    if (flavor) {
      validateAssets(flavor);
    } else {
      // Validar todos los flavors
      const flavors = getAvailableFlavors();
      flavors.forEach(f => {
        validateAssets(f);
        console.log('');
      });
    }
    break;
    
  case 'list':
    listAssets();
    break;
    
  case 'clean':
    cleanProcessedAssets();
    break;
    
  default:
    log('🎨 Assets Processor - Gestión de assets por flavor', 'bold');
    log('');
    log('Comandos disponibles:', 'blue');
    log('  process [flavor]  - Procesar assets (source → processed)');
    log('  validate [flavor] - Validar assets de un flavor');
    log('  list              - Listar todos los assets disponibles');
    log('  clean             - Limpiar assets procesados');
    log('');
    log('Ejemplos:', 'yellow');
    log('  node scripts/assets-processor.js process bancoNacional');
    log('  node scripts/assets-processor.js validate');
    log('  node scripts/assets-processor.js list');
}