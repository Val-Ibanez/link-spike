/**
 * Payments Main Screen
 * Pantalla principal de métodos de pago
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../core/themes/styles';
import { featureFlags } from '../../core/utils/FeatureFlags';
import { QrSvg, ContactlessSvg, ChartSvg, PaySvg } from '../../components/SVG';
import { BalanceCard } from '../../components';

export default function PaymentsMainScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);
  const navigation = useNavigation();

    const mockBalance = {
    balance: '$125.430,50',
    currency: 'ARS',
    accountType: 'Cuenta Corriente',
    accountNumber: '1234567890',
  };

  const PaymentMethodCard = ({
    title,
    description,
    icon,
    onPress,
    enabled = true,
  }: {
    title: string;
    description: string;
    icon: React.ReactElement;
    onPress: () => void;
    enabled?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          opacity: enabled ? 1 : 0.5,
          borderColor: '#DEE2E6',
          borderWidth: 1,
        },
      ]}
      onPress={enabled ? onPress : undefined}
      disabled={!enabled}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 16, padding: 8 }}>{icon}</View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.heading3, { color: enabled ? theme.text : theme.textSecondary }]}>
            {title}
          </Text>
          <Text style={[styles.bodyTextSecondary, { color: enabled ? theme.textSecondary : '#E0E0E0' }]}>
            {description}
          </Text>
          {!enabled && (
            <Text style={[styles.bodyTextSecondary, { color: theme.error, fontSize: 12 }]}>
              No disponible para {tenantConfig.displayName}
            </Text>
          )}
        </View>
        {enabled && (
          <Text style={{ fontSize: 20, color: theme.primary }}>→</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

          {/* Balance Card */}
                <BalanceCard
                  balance={mockBalance.balance}
                  currency={mockBalance.currency}
                  accountType={mockBalance.accountType}
                  accountNumber={mockBalance.accountNumber}
                  onPress={ () => Alert.alert('Movimiento')}
                />

        {/* Métodos de Pago */}
        <PaymentMethodCard
          title="Pago QR"
          description="Escanea el QR para realizar pagos rápidos"
          icon={<QrSvg width={32} height={32} color={theme.primary} />}
          enabled={featureFlags.isQrPaymentsEnabled()}
          onPress={() => (navigation as any).navigate('QRPayment')}
        />

        <PaymentMethodCard
          title="Pago Sin Contacto"
          description="Paga acercando la tarjeta al lector NFC"
          icon={<ContactlessSvg width={32} height={32} color={theme.primary} />}
          enabled={featureFlags.isContactlessPaymentsEnabled()}
          onPress={() => (navigation as any).navigate('ContactlessPayment')}
        />

        <PaymentMethodCard
          title="Pagos en Cuotas"
          description="Divide tu pago en múltiples cuotas"
          icon={<ChartSvg width={32} height={32} color={theme.primary} />}
          enabled={featureFlags.isInstallmentsEnabled()}
          onPress={() => (navigation as any).navigate('Installments')}
        />

        <PaymentMethodCard
          title="Pago con Tarjeta"
          description="Inserta o desliza tu tarjeta de débito/crédito"
          icon={<PaySvg width={32} height={32} color={theme.primary} />}
          enabled={true}
          onPress={() => {
            Alert.alert(
              'Pago con Tarjeta',
              'Inserta tu tarjeta en el lector o deslízala por la ranura.\n\nTarjetas soportadas:\n• ' +
              tenantConfig.payment.supportedCards.join('\n• ')
            );
          }}
        />

        {/* Información adicional */}
        <View style={styles.card}>
          <Text style={styles.heading3}>Límites de Transacción</Text>
          <Text style={styles.bodyTextSecondary}>
            Monto mínimo: ${tenantConfig.payment.minAmount.toLocaleString()}
          </Text>
          <Text style={styles.bodyTextSecondary}>
            Monto máximo: ${tenantConfig.payment.maxAmount.toLocaleString()}
          </Text>
          <Text style={styles.bodyTextSecondary}>
            Moneda: {tenantConfig.payment.defaultCurrency}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}