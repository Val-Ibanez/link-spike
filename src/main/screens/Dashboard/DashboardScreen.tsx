/**
 * Dashboard Screen - Updated with Feature Flags
 * Pantalla principal con variantes dinámicas basadas en feature flags
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../core/themes/styles';

import DashboardBase from './components/DashboardBase';

export default function DashboardScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <DashboardBase />
      </ScrollView>
    </SafeAreaView>
  );
}