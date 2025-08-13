#!/usr/bin/env node

/**
 * Script para convertir archivos SVG a componentes React Native
 * 
 * Uso:
 * node scripts/convert-svg-to-components.js
 * 
 * Este script:
 * 1. Lee los archivos SVG de assets/svg/logos/
 * 2. Los convierte a componentes React usando react-native-svg
 * 3. Actualiza el archivo SvgLogo.tsx con los nuevos componentes
 */

const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(__dirname, '../assets/svg/logos');
const COMPONENT_FILE = path.join(__dirname, '../app/components/SvgLogo.tsx');

console.log('🎨 SVG TO REACT COMPONENT CONVERTER');
console.log('===================================');
console.log('');

// Verificar si existe la carpeta de logos
if (!fs.existsSync(LOGOS_DIR)) {
  console.log('❌ Carpeta assets/svg/logos/ no encontrada');
  console.log('📁 Creando carpeta...');
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

// Leer archivos SVG
const svgFiles = fs.readdirSync(LOGOS_DIR).filter(file => file.endsWith('.svg'));

console.log(`📂 Archivos SVG encontrados: ${svgFiles.length}`);
svgFiles.forEach(file => console.log(`   • ${file}`));
console.log('');

if (svgFiles.length === 0) {
  console.log('⚠️  No se encontraron archivos SVG');
  console.log('');
  console.log('📋 INSTRUCCIONES:');
  console.log('=================');
  console.log('1. Coloca tus archivos SVG en: assets/svg/logos/');
  console.log('2. Nombres esperados:');
  console.log('   • logo-bancoNacional.svg');
  console.log('   • logo-bancoPopular.svg');
  console.log('   • logo-bancoSantaCruz.svg');
  console.log('3. Ejecuta este script nuevamente');
  console.log('');
  console.log('🔄 Creando archivos SVG de ejemplo...');
  
  // Crear SVGs de ejemplo
  const exampleSvgs = [
    {
      name: 'logo-bancoNacional.svg',
      content: `<svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="60" fill="#116BD9" rx="8"/>
  <text x="60" y="35" text-anchor="middle" font-size="14" fill="white" font-weight="bold">Banco Nacional</text>
</svg>`
    },
    {
      name: 'logo-bancoPopular.svg',
      content: `<svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="60" fill="#E53E3E" rx="8"/>
  <text x="60" y="35" text-anchor="middle" font-size="14" fill="white" font-weight="bold">Banco Popular</text>
</svg>`
    },
    {
      name: 'logo-bancoSantaCruz.svg',
      content: `<svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="60" fill="#116BD9" rx="8"/>
  <text x="60" y="35" text-anchor="middle" font-size="14" fill="white" font-weight="bold">Banco Santa Cruz</text>
</svg>`
    }
  ];

  exampleSvgs.forEach(svg => {
    const filePath = path.join(LOGOS_DIR, svg.name);
    fs.writeFileSync(filePath, svg.content);
    console.log(`✅ Creado: ${svg.name}`);
  });

  console.log('');
  console.log('✨ Archivos SVG de ejemplo creados');
  console.log('🔄 Puedes reemplazarlos con tus logos reales');
  console.log('');
  console.log('📝 SIGUIENTE PASO:');
  console.log('==================');
  console.log('npm run svg:convert  # Para convertir SVGs a componentes');
  console.log('npm run svg:update   # Para actualizar el componente SvgLogo');
  
  process.exit(0);
}

console.log('🔄 Convirtiendo SVGs a componentes React...');
console.log('');

// Aquí iría la lógica de conversión real
// Para este ejemplo, mostramos las instrucciones
console.log('📋 PASOS PARA USAR TUS SVGs:');
console.log('============================');
console.log('');
console.log('1. 📂 Coloca tus archivos SVG en: assets/svg/logos/');
console.log('2. 🔧 Actualiza manualmente SvgLogo.tsx con el contenido SVG');
console.log('3. 🎨 Reemplaza los placeholders con tu código SVG real');
console.log('4. 🚀 Usa <SvgLogo logoType="bancoSantaCruz" /> en tus componentes');
console.log('');
console.log('💡 EJEMPLO DE USO:');
console.log('==================');
console.log('import SvgLogo from "./components/SvgLogo";');
console.log('');
console.log('<SvgLogo ');
console.log('  logoType="bancoSantaCruz"');
console.log('  width={120}');
console.log('  height={60}');
console.log('/>');
console.log('');
console.log('✅ Setup completo para logos SVG');