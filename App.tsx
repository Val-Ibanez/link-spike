/**
 * App de Adquirencia - Marca Blanca
 * Sistema configurable para múltiples bancos con navegación
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import { ThemeProvider, useTheme } from './src/main/core/themes/ThemeProvider';
import { AppNavigationContainer } from './src/main/navigation/NavigationContainer';
import AppInitializer from './src/main/components/AppInitializer/AppInitializer';
import { Config } from 'react-native-config';

function AppContent(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />
      <AppNavigationContainer />
    </>
  );
}

console.log('HOLA', Config.FLAVOR);

function App(): React.JSX.Element {
  return (
    <AppInitializer>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AppInitializer>
  );
}

export default App;
