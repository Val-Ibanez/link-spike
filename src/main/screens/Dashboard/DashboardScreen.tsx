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

import DashboardSantaCruzExact from './components/DashboardSantaCruzExact';

export default function DashboardScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>


        {/* Dashboard Principal - Banco Santa Cruz */}
        <DashboardSantaCruzExact 
          onNavigateToPayments={() => Alert.alert('Payments', 'Navegando a pagos...')}
          onNavigateToTransactions={() => Alert.alert('Transactions', 'Navegando a transacciones...')}
          onNavigateToSettings={() => Alert.alert('Settings', 'Navegando a configuración...')}
        />

        
      </ScrollView>
    </SafeAreaView>
  );
}