/**
 * Navigation Container
 * Configuración principal de navegación respetando flavors/temas
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../core/themes/ThemeProvider';
import { MainBottomTabNavigator } from './MainBottomTabNavigator';

export function AppNavigationContainer(): React.JSX.Element {
  const { theme } = useTheme();
  
  // Tema de navegación que respeta el flavor actual
  const navigationTheme = {
    dark: false,
    colors: {
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.textSecondary,
      notification: theme.accent,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: 'normal' as const },
      medium: { fontFamily: 'System', fontWeight: '500' as const },
      bold: { fontFamily: 'System', fontWeight: 'bold' as const },
      heavy: { fontFamily: 'System', fontWeight: '700' as const },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainBottomTabNavigator />
    </NavigationContainer>
  );
}