#!/usr/bin/env node

/**
 * 🔍 Script de Prueba de Visibilidad de Logos
 * Verifica que los logos estén correctamente configurados
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNÓSTICO COMPLETO DE LOGOS');
console.log('=================================\n');

// 1. Verificar archivos de assets
const assetsDir = path.join(__dirname, '../assets/images');
const logoFiles = ['logo-bancoNacional.png', 'logo-bancoPopular.png'];

console.log('1️⃣ Verificando archivos de assets:');
logoFiles.forEach(file => {
  const filePath = path.join(assetsDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  ✅ ${file}: ${stats.size} bytes`);
  } else {
    console.log(`  ❌ ${file}: NO ENCONTRADO`);
  }
});

// 2. Verificar AssetManager
console.log('\n2️⃣ Verificando AssetManager.ts:');
const assetManagerPath = path.join(__dirname, '../app/core/utils/AssetManager.ts');
if (fs.existsSync(assetManagerPath)) {
  const content = fs.readFileSync(assetManagerPath, 'utf8');
  
  // Verificar imports de logos
  const bancoNacionalMatch = content.match(/logo-bancoNacional\.png/g);
  const bancoPopularMatch = content.match(/logo-bancoPopular\.png/g);
  
  console.log(`  ✅ Referencias a logo-bancoNacional.png: ${bancoNacionalMatch ? bancoNacionalMatch.length : 0}`);
  console.log(`  ✅ Referencias a logo-bancoPopular.png: ${bancoPopularMatch ? bancoPopularMatch.length : 0}`);
  
  // Verificar estructura FLAVOR_ASSETS
  if (content.includes('FLAVOR_ASSETS')) {
    console.log('  ✅ FLAVOR_ASSETS configurado');
  } else {
    console.log('  ❌ FLAVOR_ASSETS no encontrado');
  }
} else {
  console.log('  ❌ AssetManager.ts no encontrado');
}

// 3. Verificar configuraciones
console.log('\n3️⃣ Verificando configuraciones:');
const configFiles = [
  '../app/core/configs/bancoNacional.json',
  '../app/core/configs/bancoPopular.json'
];

configFiles.forEach(configFile => {
  const configPath = path.join(__dirname, configFile);
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      console.log(`  ✅ ${path.basename(configFile)}: ${config.displayName}`);
      if (config.features && config.features.dashboardVariant) {
        console.log(`    📱 Dashboard variant: ${config.features.dashboardVariant}`);
      }
    } catch (error) {
      console.log(`  ❌ ${path.basename(configFile)}: JSON inválido`);
    }
  } else {
    console.log(`  ❌ ${path.basename(configFile)}: no encontrado`);
  }
});

// 4. Verificar estilos
console.log('\n4️⃣ Verificando estilos:');
const stylesPath = path.join(__dirname, '../app/core/themes/styles.ts');
if (fs.existsSync(stylesPath)) {
  const stylesContent = fs.readFileSync(stylesPath, 'utf8');
  
  // Extraer dimensiones del bankLogo
  const logoStyleMatch = stylesContent.match(/bankLogo:\s*{[^}]*}/s);
  if (logoStyleMatch) {
    const logoStyle = logoStyleMatch[0];
    const widthMatch = logoStyle.match(/width:\s*(\d+)/);
    const heightMatch = logoStyle.match(/height:\s*(\d+)/);
    
    console.log('  ✅ Estilos de bankLogo encontrados:');
    console.log(`    📐 Width: ${widthMatch ? widthMatch[1] : 'no definido'}`);
    console.log(`    📐 Height: ${heightMatch ? heightMatch[1] : 'no definido'}`);
  } else {
    console.log('  ❌ Estilos de bankLogo no encontrados');
  }
} else {
  console.log('  ❌ styles.ts no encontrado');
}

// 5. Generar recomendaciones
console.log('\n🔧 RECOMENDACIONES:');
console.log('==================');
console.log('Si los logos no son visibles, intenta:');
console.log('1. Verificar que borderWidth/borderColor funcionen (contenedor visible)');
console.log('2. Cambiar resizeMode de "contain" a "stretch" temporalmente');
console.log('3. Agregar dimensiones explícitas al Image component');
console.log('4. Probar con require() directo en lugar de AssetManager');
console.log('5. Verificar que Metro bundler esté corriendo');
console.log('\n🚀 Para prueba rápida:');
console.log('npm run assets:visible  # Regenerar logos visibles');
console.log('adb shell am force-stop com.myreactnativeapp.banconacional');
console.log('adb shell am start -n com.myreactnativeapp.banconacional/com.myreactnativeapp.MainActivity');

console.log('\n✅ Diagnóstico completado!');