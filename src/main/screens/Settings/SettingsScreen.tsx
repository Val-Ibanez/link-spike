import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../core/themes/styles';
import { configManager } from '../../core/ConfigManager';
import { featureFlags } from '../../core/utils/FeatureFlags';

export default function SettingsScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);
  const appInfo = configManager.getAppInfo();

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
              `Banco: ${tenantConfig.displayName}\nFlavor: ${appInfo.flavor}\nVersión: ${appInfo.version}\nBuild: ${appInfo.buildNumber}\nEnvironment: ${appInfo.enviroment}`,
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
            const appInfo = configManager.getAppInfo();
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
}
