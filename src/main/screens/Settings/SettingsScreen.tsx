import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';
import { useAppInfo, useCurrentTenant } from '../../stores';
import { featureFlags } from '../../core/utils/FeatureFlags';

const SettingsScreen: React.FC = () => {
  const { theme, tenantConfig } = useTheme();
  const appInfo = useAppInfo();

  // Verificar que tenemos la información necesaria
  if (!tenantConfig || !appInfo) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.heading2}>Cargando configuración...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const SettingItem = ({
    title,
    subtitle,
    onPress,
  }: {
    title: string;
    subtitle: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
      ]}
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.heading3}>{title}</Text>
        <Text style={styles.bodyTextSecondary}>{subtitle}</Text>
      </View>
      <Text style={{ color: theme.primary, fontSize: 20 }}>→</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={[styles.heading2, { padding: 12 }]}>Configuración</Text>
        <SettingItem
          title="Información de la App"
          subtitle={`Versión ${appInfo.version} - ${appInfo.flavor}`}
          onPress={() =>
            Alert.alert(
              'Información de la App',
              `Banco: ${tenantConfig.displayName}\nFlavor: ${appInfo.flavor}\nVersión: ${appInfo.version}\nBuild: ${appInfo.buildNumber}\nEnvironment: ${appInfo.environment}`,
            )
          }
        />

        <SettingItem
          title="Features Habilitadas"
          subtitle="Ver características disponibles"
          onPress={() => {
            const features = featureFlags.getEnabledFeatures();
            Alert.alert(
              'Features Habilitadas',
              features.join('\n') || 'Ninguna',
            );
          }}
        />

        <SettingItem
          title="Assets y Temas"
          subtitle="Personalización del banco"
          onPress={() => {
            Alert.alert(
              'Assets del Banco',
              `Flavor: ${appInfo.flavor}\nVersión: ${appInfo.version}\nNombre: ${tenantConfig.displayName}`,
            );
          }}
        />

        <SettingItem
          title="Configuración de Pagos"
          subtitle="Límites y métodos"
          onPress={() =>
            Alert.alert(
              'Configuración de Pagos',
              `Mínimo: $${tenantConfig.payment.minAmount}\nMáximo: $${tenantConfig.payment.maxAmount}\nMoneda: ${tenantConfig.payment.defaultCurrency}\nTarjetas: ${tenantConfig.payment.supportedCards.join(', ')}`,
            )
          }
        />

        <SettingItem
          title="Soporte Técnico"
          subtitle={tenantConfig.support.email}
          onPress={() =>
            Alert.alert(
              'Contacto y Soporte',
              `Email: ${tenantConfig.support.email}\nTeléfono: ${tenantConfig.support.phone}\nWebsite: ${tenantConfig.support.website}`,
            )
          }
        />

        <SettingItem
          title="Cambiar Banco"
          subtitle="Scripts para otros flavors"
          onPress={() =>
            Alert.alert(
              '🔄 Cambiar Flavor',
              'Para cambiar de banco:\n\n• Android BN: npm run android:banco-nacional\n• Android BP: npm run android:banco-popular\n• iOS BN: npm run ios:banco-nacional\n• iOS BP: npm run ios:banco-popular',
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Placeholder for safe area background
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Placeholder for container background
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    color: '#333',
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  bodyTextSecondary: {
    fontSize: 14,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SettingsScreen;
