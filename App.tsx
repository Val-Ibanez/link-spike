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
import { AppInitializer } from './src/main/components';

function AppContent(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.primary}
      />
      <AppNavigationContainer />
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppInitializer>
        <AppContent />
      </AppInitializer>
    </ThemeProvider>
  );
}

export default App;
