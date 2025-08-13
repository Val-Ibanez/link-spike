/**
 * Payments Stack Navigator
 * Stack de navegación para las funcionalidades de pagos
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../core/themes/ThemeProvider';
import { featureFlags } from '../core/utils/FeatureFlags';

// Screens de Pagos
import PaymentsMainScreen from '../screens/Payments/PaymentsMainScreen';
import QRPaymentScreen from '../screens/Payments/QR/QRPaymentScreen';
import ContactlessPaymentScreen from '../screens/Payments/Contactless/ContactlessPaymentScreen';
import InstallmentsScreen from '../screens/Payments/Installments/InstallmentsScreen';

const Stack = createStackNavigator();

export default function PaymentsStackNavigator(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="PaymentsMain" 
        component={PaymentsMainScreen}
      />
      
      {featureFlags.isQrPaymentsEnabled() && (
        <Stack.Screen 
          name="QRPayment" 
          component={QRPaymentScreen}
        />
      )}
      
      {featureFlags.isContactlessPaymentsEnabled() && (
        <Stack.Screen 
          name="ContactlessPayment" 
          component={ContactlessPaymentScreen}
        />
      )}
      
      {featureFlags.isInstallmentsEnabled() && (
        <Stack.Screen 
          name="Installments" 
          component={InstallmentsScreen}
        />
      )}
    </Stack.Navigator>
  );
}