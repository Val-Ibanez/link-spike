#!/usr/bin/env node

/**
 * 🎛️ Script para cambiar Feature Flags del Dashboard
 * Permite alternar entre variantes y features dinámicamente
 */

const fs = require('fs');
const path = require('path');

const configFiles = {
  bancoNacional: path.join(__dirname, '../app/core/configs/bancoNacional.json'),
  bancoPopular: path.join(__dirname, '../app/core/configs/bancoPopular.json'),
  bancoSantaCruz: path.join(__dirname, '../app/core/configs/bancoSantaCruz.json')
};

function loadConfig(bank) {
  return JSON.parse(fs.readFileSync(configFiles[bank], 'utf8'));
}

function saveConfig(bank, config) {
  fs.writeFileSync(configFiles[bank], JSON.stringify(config, null, 2));
}

function toggleFeature(bank, feature) {
  const config = loadConfig(bank);
  config.features[feature] = !config.features[feature];
  saveConfig(bank, config);
  console.log(`✅ ${bank}: ${feature} = ${config.features[feature]}`);
}

function changeDashboardVariant(bank, variant) {
  const config = loadConfig(bank);
  config.features.dashboardVariant = variant;
  saveConfig(bank, config);
  console.log(`✅ ${bank}: dashboardVariant = ${variant}`);
}

function showCurrentConfig() {
  console.log('🎨 CONFIGURACIÓN ACTUAL DE DASHBOARDS:');
  console.log('=====================================');
  
  ['bancoNacional', 'bancoPopular', 'bancoSantaCruz'].forEach(bank => {
    const config = loadConfig(bank);
    console.log(`\n📱 ${config.displayName}:`);
    console.log(`  Dashboard: ${config.features.dashboardVariant || 'modern'}`);
    console.log(`  Quick Actions: ${config.features.showQuickActions ? '✅' : '❌'}`);
    console.log(`  Transaction History: ${config.features.showTransactionHistory ? '✅' : '❌'}`);
    console.log(`  Account Balance: ${config.features.showAccountBalance ? '✅' : '❌'}`);
    console.log(`  Compact View: ${config.features.compactView ? '✅' : '❌'}`);
  });
}

// Parse command line arguments
const [,, command, bank, feature] = process.argv;

console.log('🎛️ DASHBOARD FEATURE TOGGLE');
console.log('============================\n');

switch (command) {
  case 'show':
    showCurrentConfig();
    break;
    
  case 'toggle':
    if (!bank || !feature) {
      console.log('❌ Uso: node toggle-dashboard-features.js toggle <banco> <feature>');
      console.log('Bancos: bancoNacional, bancoPopular');
      console.log('Features: showQuickActions, showTransactionHistory, showAccountBalance, compactView');
      process.exit(1);
    }
    toggleFeature(bank, feature);
    showCurrentConfig();
    break;
    
  case 'variant':
    if (!bank || !feature) {
      console.log('❌ Uso: node toggle-dashboard-features.js variant <banco> <variant>');
      console.log('Bancos: bancoNacional, bancoPopular, bancoSantaCruz');
      console.log('Variants: modern, classic, santacruz, minimal');
      process.exit(1);
    }
    changeDashboardVariant(bank, feature);
    showCurrentConfig();
    break;
    
  case 'swap':
    // Intercambiar variantes entre bancos
    const bnConfig = loadConfig('bancoNacional');
    const bpConfig = loadConfig('bancoPopular');
    
    const bnVariant = bnConfig.features.dashboardVariant;
    const bpVariant = bpConfig.features.dashboardVariant;
    
    bnConfig.features.dashboardVariant = bpVariant;
    bpConfig.features.dashboardVariant = bnVariant;
    
    saveConfig('bancoNacional', bnConfig);
    saveConfig('bancoPopular', bpConfig);
    
    console.log('🔄 Variantes intercambiadas:');
    console.log(`• Banco Nacional: ${bnVariant} → ${bpVariant}`);
    console.log(`• Banco Popular: ${bpVariant} → ${bnVariant}`);
    showCurrentConfig();
    break;
    
  default:
    console.log('📋 COMANDOS DISPONIBLES:');
    console.log('========================');
    console.log('show                                    - Mostrar configuración actual');
    console.log('toggle <banco> <feature>                - Alternar feature on/off');
    console.log('variant <banco> <variant>               - Cambiar variante de dashboard');
    console.log('swap                                    - Intercambiar variantes entre bancos');
    console.log('');
    console.log('🏦 Bancos: bancoNacional, bancoPopular, bancoSantaCruz');
    console.log('🎨 Variants: modern, classic, santacruz, minimal');
    console.log('⚙️ Features: showQuickActions, showTransactionHistory, showAccountBalance, compactView');
    console.log('');
    console.log('📝 Ejemplos:');
    console.log('npm run dashboard:show');
    console.log('npm run dashboard:toggle bancoNacional showQuickActions');
    console.log('npm run dashboard:variant bancoPopular modern');
    console.log('npm run dashboard:swap');
    break;
}

console.log('\n🔄 Después de cambios, recarga las apps con:');
console.log('adb shell am force-stop com.myreactnativeapp.banconacional');
console.log('adb shell am start -n com.myreactnativeapp.banconacional/com.myreactnativeapp.MainActivity');
console.log('adb shell am force-stop com.myreactnativeapp.bancopopular');
console.log('adb shell am start -n com.myreactnativeapp.bancopopular/com.myreactnativeapp.MainActivity');