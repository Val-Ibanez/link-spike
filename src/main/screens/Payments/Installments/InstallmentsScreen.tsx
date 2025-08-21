import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../../core/themes/styles';
import { ChartSvg } from '../../../components/SVG';

export default function InstallmentsScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);
  const [selectedInstallments, setSelectedInstallments] = useState<
    number | null
  >(null);

  const amount = 500; // Monto de ejemplo
  const installmentOptions = [3, 6, 12, 18, 24];

  const calculateInstallment = (installments: number) => {
    return (amount / installments).toFixed(2);
  };

  const processInstallment = () => {
    if (!selectedInstallments) {
      Alert.alert('Error', 'Selecciona un número de cuotas');
      return;
    }
    Alert.alert(
      '📊 Pago en Cuotas Confirmado',
      `Monto total: $${amount}\nCuotas: ${selectedInstallments}\nMonto por cuota: $${calculateInstallment(selectedInstallments)}\nBanco: ${tenantConfig.displayName}`,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View
          style={{
            padding: 12,
          }}
        >
          <Text style={[styles.heading2]}>Pagos en Cuotas</Text>
          <Text style={[styles.bodyText]}>
            Divide tu pago en cuotas cómodas
          </Text>
        </View>

        <View style={[styles.card]}>
          <Text style={styles.heading2}>Monto Total: ${amount}</Text>
          <Text style={styles.bodyTextSecondary}>
            Selecciona el número de cuotas:
          </Text>
        </View>

        {installmentOptions.map(installments => (
          <TouchableOpacity
            key={installments}
            style={[
              styles.card,
              {
                borderColor:
                  selectedInstallments === installments
                    ? theme.primary
                    : '#E0E0E0',
                borderWidth: 2,
                backgroundColor:
                  selectedInstallments === installments
                    ? theme.primary + '20'
                    : theme.surface,
                marginHorizontal: 12,
              },
            ]}
            onPress={() => setSelectedInstallments(installments)}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text
                  style={[
                    styles.heading3,
                    {
                      color:
                        selectedInstallments === installments
                          ? theme.primary
                          : theme.text,
                    },
                  ]}
                >
                  {installments} cuotas
                </Text>
                <Text style={styles.bodyTextSecondary}>Sin interés</Text>
              </View>
              <Text style={[styles.heading2, { color: theme.primary }]}>
                ${calculateInstallment(installments)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={processInstallment}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChartSvg width={20} height={20} color="#FFFFFF" />
              <Text style={[styles.primaryButtonText, { marginLeft: 8 }]}>
                Confirmar Pago en Cuotas
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
