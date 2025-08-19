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

function AppContent(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.primary}
      />
      <AppNavigationContainer />
      {/* 🔥 HOT RELOAD TEST - Cambio temporal para probar */}
      {/* ✅ HOT RELOAD FUNCIONA - Segundo cambio para confirmar */}
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
