#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧹 Limpiando y reinstalando pods de iOS...');

try {
  // Cambiar al directorio de iOS
  process.chdir(path.join(__dirname, '..', 'ios'));
  
  console.log('📁 Directorio actual:', process.cwd());
  
  // Limpiar pods
  console.log('🗑️  Limpiando pods...');
  execSync('rm -rf Pods', { stdio: 'inherit' });
  execSync('rm -rf Podfile.lock', { stdio: 'inherit' });
  
  // Limpiar build
  console.log('🗑️  Limpiando build...');
  execSync('xcodebuild clean -workspace MyReactNativeApp.xcworkspace -scheme MyReactNativeApp', { stdio: 'inherit' });
  
  // Reinstalar pods
  console.log('📦 Reinstalando pods...');
  execSync('pod install', { stdio: 'inherit' });
  
  console.log('✅ Pods reinstalados correctamente');
  console.log('🔧 Ahora puedes ejecutar: npm run ios:banco-[nombre]');
  
} catch (error) {
  console.error('❌ Error durante la limpieza de pods:', error.message);
  process.exit(1);
}
