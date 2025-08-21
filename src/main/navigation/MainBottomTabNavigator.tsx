/**
 * Main Bottom Tab Navigator
 * Navegación principal con tabs que se adaptan al flavor
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Text, View } from 'react-native';
import { useTheme } from '../core/themes/ThemeProvider';
import { featureFlags } from '../core/utils/FeatureFlags';
import DynamicHeaderLogo from '../components/DynamicHeaderLogo';

// Screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import PaymentsStackNavigator from './PaymentsStackNavigator';
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import {
  HomeSvg,
  PaySvg,
  ProfileSvg,
  SettingsSvg,
  StatsSvg,
} from '../components/SVG';
import { Header } from '../components';

const Tab = createBottomTabNavigator();

export function MainBottomTabNavigator(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();

  // Iconos simples usando emojis (puedes cambiar por react-native-vector-icons)
  const getTabIcon = (routeName: string, focused: boolean) => {
    const iconSize = focused ? 24 : 20;
    const iconColor = focused ? theme.primary : theme.textSecondary;

    const icons: Record<string, React.ReactElement> = {
      Dashboard: (
        <HomeSvg width={iconSize} height={iconSize} color={iconColor} />
      ),
      Payments: <PaySvg width={iconSize} height={iconSize} color={iconColor} />,
      Transactions: (
        <StatsSvg width={iconSize} height={iconSize} color={iconColor} />
      ),
      Profile: (
        <ProfileSvg width={iconSize} height={iconSize} color={iconColor} />
      ),
      Settings: (
        <SettingsSvg width={iconSize} height={iconSize} color={iconColor} />
      ),
    };

    return (
      icons[routeName] || (
        <HomeSvg width={iconSize} height={iconSize} color={iconColor} />
      )
    );
  };
  const options = {
       headerTitle: () => (
            <Header
              onMenuPress={() => Alert.alert('Menú', 'Menú lateral abierto')}
              onProfilePress={() => Alert.alert('Menú', 'Menú lateral abierto')}
              title="Mi Cuenta"
              showBalance={false}
            />
          ),
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.textSecondary,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={options}
      />

      <Tab.Screen
        name="Payments"
        component={PaymentsStackNavigator}
        options={options}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={options}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={options}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={options}
      />
    </Tab.Navigator>
  );
}
