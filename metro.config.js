const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration para React Native Flavors
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'flavors': path.resolve(__dirname, 'flavors'),
    },
  },
  watchFolders: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'flavors'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
