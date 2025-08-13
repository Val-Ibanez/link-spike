import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useTheme } from '../../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../../core/themes/styles';
import { QrSvg } from '../../../components/SVG';

export default function QRPaymentScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);
  const [amount, setAmount] = useState('');

  const generateQR = () => {
    if (!amount) {
      Alert.alert('Error', 'Ingresa un monto válido');
      return;
    }
    Alert.alert(
      'Código QR Generado',
      `Monto: $${amount}\nBanco: ${tenantConfig.displayName}\n\n[QR CODE aquí]\n\nMuestra este código al cliente para procesar el pago.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={[styles.card, styles.headerCard]}>
          <Text style={[styles.heading1, styles.whiteText]}>Pago QR</Text>
          <Text style={[styles.bodyText, styles.whiteText]}>Genera un código QR para recibir el pago</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading3}>Ingresa el Monto</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.primary, borderWidth: 2, padding: 12, fontSize: 18 }]}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
            placeholderTextColor={theme.textSecondary}
          />
          <TouchableOpacity style={[styles.primaryButton, { marginTop: 16 }]} onPress={generateQR}>
            <Text style={styles.primaryButtonText}>📱 Generar Código QR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading3}>Cómo Funciona</Text>
          <Text style={styles.bodyTextSecondary}>• Ingresa el monto a cobrar</Text>
          <Text style={styles.bodyTextSecondary}>• Genera el código QR</Text>
          <Text style={styles.bodyTextSecondary}>• El cliente escanea con su app bancaria</Text>
          <Text style={styles.bodyTextSecondary}>• Confirma el pago automáticamente</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}