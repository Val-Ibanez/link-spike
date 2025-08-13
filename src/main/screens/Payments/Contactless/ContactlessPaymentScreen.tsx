import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../../core/themes/styles';
import { ContactlessSvg } from '../../../components/SVG';

export default function ContactlessPaymentScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);
  const [isReading, setIsReading] = useState(false);

  const startNFCReading = () => {
    setIsReading(true);
    // Simular lectura NFC
    setTimeout(() => {
      setIsReading(false);
      Alert.alert(
        '📡 Pago Exitoso',
        `Pago procesado correctamente\nBanco: ${tenantConfig.displayName}\nMonto: $150.00\nTarjeta: ****1234`
      );
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={[styles.card, styles.headerCard]}>
          <Text style={[styles.heading1, styles.whiteText]}>Pago Sin Contacto</Text>
          <Text style={[styles.bodyText, styles.whiteText]}>Usa NFC para pagos rápidos y seguros</Text>
        </View>

        <View style={[styles.card, { alignItems: 'center' }]}>
          <View style={{ marginBottom: 20 }}>
            <ContactlessSvg width={80} height={80} color={theme.primary} />
          </View>
          <Text style={styles.heading2}>Acerca la Tarjeta</Text>
          <Text style={styles.bodyTextSecondary}>Coloca la tarjeta cerca del dispositivo</Text>
          
          <TouchableOpacity 
            style={[
              styles.primaryButton, 
              { 
                marginTop: 20, 
                backgroundColor: isReading ? theme.accent : theme.primary,
                opacity: isReading ? 0.7 : 1
              }
            ]} 
            onPress={startNFCReading}
            disabled={isReading}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isReading ? (
                <Text style={styles.primaryButtonText}>🔄 Leyendo...</Text>
              ) : (
                <>
                  <ContactlessSvg width={20} height={20} color="#FFFFFF" />
                  <Text style={[styles.primaryButtonText, { marginLeft: 8 }]}>Iniciar Lectura NFC</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading3}>Tarjetas Compatibles</Text>
          {tenantConfig.payment.supportedCards.map((card, index) => (
            <Text key={index} style={styles.bodyTextSecondary}>• {card}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}