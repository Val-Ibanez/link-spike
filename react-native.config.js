const path = require('path');

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
  // Configuración específica para flavors
  flavors: {
    bancoEntreRios: {
      ios: {
        bundleId: 'com.myreactnativeapp.bancoentrerios',
        appName: 'Banco Entre Ríos',
        xcconfig: 'ios/Config/BancoEntreRios.xcconfig',
      },
      android: {
        packageName: 'com.myreactnativeapp.bancoentrerios',
        appName: 'Banco Entre Ríos',
      },
    },
    bancoSantaCruz: {
      ios: {
        bundleId: 'com.myreactnativeapp.bancosantacruz',
        appName: 'Banco Santa Cruz',
        xcconfig: 'ios/Config/BancoSantaCruz.xcconfig',
      },
      android: {
        packageName: 'com.myreactnativeapp.bancosantacruz',
        appName: 'Banco Santa Cruz',
      },
    },
    bancoSantaFe: {
      ios: {
        bundleId: 'com.myreactnativeapp.bancosantafe',
        appName: 'Banco Santa Fe',
        xcconfig: 'ios/Config/BancoSantaFe.xcconfig',
      },
      android: {
        packageName: 'com.myreactnativeapp.bancosantafe',
        appName: 'Banco Santa Fe',
      },
    },
  },
};
