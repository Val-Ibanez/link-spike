import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../core/themes/styles';

const { width } = Dimensions.get('window');

export default function QRGeneratorScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);
  const [qrData, setQrData] = useState('');
  const [qrSize, setQrSize] = useState(200);
  const [showQR, setShowQR] = useState(false);
const [amount, setAmount] = useState('');

  const generateQR = () => {
    if (!qrData.trim()) {
      Alert.alert(
        'Error',
        'Por favor ingresa algún texto o URL para generar el QR',
      );
      return;
    }
    setShowQR(true);
  };

  const clearQR = () => {
    setQrData('');
    setShowQR(false);
    setAmount('')
  };

  const copyToClipboard = () => {
    // Aquí podrías implementar la funcionalidad de copiar al portapapeles
    Alert.alert('Copiado', 'El código QR se ha copiado al portapapeles');
  };

  const shareQR = () => {
    // Aquí podrías implementar la funcionalidad de compartir
    Alert.alert('Compartir', 'Funcionalidad de compartir en desarrollo');
  };

  const presetData = [
    {
      label: 'URL del Banco',
      value: `https://${tenantConfig.displayName.toLowerCase().replace(/\s+/g, '')}.com`,
    },
    { label: 'Teléfono', value: '+54 11 1234-5678' },
    { label: 'Email', value: 'contacto@banco.com' },
    { label: 'Dirección', value: 'Av. Corrientes 1234, CABA' },
  ];

  const usePresetData = (value: string) => {
    setQrData(value);
    setShowQR(false);
  };

  

  return (
    <ScrollView
      style={localStyles.container}
      contentContainerStyle={localStyles.contentContainer}
    >
      <View style={{
        padding: 12
      }}>
        <Text style={[styles.heading2 ]}>
          Generar Código QR
        </Text>
        
      </View>

      {/* Input para el texto/URL */}
      <View style={[styles.card, { marginTop: 0}]}>
        <Text style={styles.heading3}>Ingresa email</Text>
        <TextInput
          style={[styles.input, { marginVertical: 12 }]}
          value={qrData}
          onChangeText={setQrData}
          placeholder="Ej: user@algo.com"
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.heading3}>Ingresa el Monto</Text>
        <TextInput
          style={[styles.input]}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="numeric"
          placeholderTextColor={theme.textSecondary}
        />

        <View style={localStyles.buttonContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { flex: 1, marginRight: 8 }]}
            onPress={generateQR}
          >
            <Text style={styles.primaryButtonText}>Generar QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { flex: 1, marginLeft: 8 }]}
            onPress={clearQR}
          >
            <Text style={styles.secondaryButtonText}>Limpiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Datos predefinidos
      <View style={styles.card}>
        <Text style={styles.heading3}>Datos predefinidos:</Text>
        <View style={localStyles.presetContainer}>
          {presetData.map((preset, index) => (
            <TouchableOpacity
              key={index}
              style={[localStyles.presetButton, { backgroundColor: theme.primary + '20' }]}
              onPress={() => usePresetData(preset.value)}
            >
              <Text style={[localStyles.presetButtonText, { color: theme.primary }]}>
                {preset.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View> */}

      {/* Código QR generado */}
      {showQR && (
        <View style={styles.card}>
          <Text style={styles.heading3}>Código QR Generado:</Text>

          <View style={localStyles.qrContainer}>
            <QRCode
              value={qrData}
              size={qrSize}
              color={theme.text}
              backgroundColor={theme.surface}
              // logo={require('../../../../flavors/bancoEntreRios/assets/images/')}
              logoSize={40}
              logoBackgroundColor={theme.surface}
              logoBorderRadius={20}
            />
          </View>

          {/* Controles del QR */}
          <View style={localStyles.qrControls}>
            <Text style={styles.bodyTextSecondary}>Tamaño: {qrSize}px</Text>
            <View style={localStyles.sizeButtons}>
              <TouchableOpacity
                style={[
                  localStyles.sizeButton,
                  { backgroundColor: theme.primary + '20' },
                ]}
                onPress={() => setQrSize(Math.max(100, qrSize - 50))}
              >
                <Text
                  style={[localStyles.sizeButtonText, { color: theme.primary }]}
                >
                  -
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  localStyles.sizeButton,
                  { backgroundColor: theme.primary + '20' },
                ]}
                onPress={() => setQrSize(Math.min(300, qrSize + 50))}
              >
                <Text
                  style={[localStyles.sizeButtonText, { color: theme.primary }]}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Acciones del QR */}
          <View style={localStyles.qrActions}>
            <TouchableOpacity
              style={[
                localStyles.actionButton,
                { backgroundColor: theme.success + '20' },
              ]}
              onPress={copyToClipboard}
            >
              <Text
                style={[localStyles.actionButtonText, { color: theme.success }]}
              >
                📋 Copiar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                localStyles.actionButton,
                { backgroundColor: theme.primary + '20' },
              ]}
              onPress={shareQR}
            >
              <Text
                style={[localStyles.actionButtonText, { color: theme.primary }]}
              >
                📤 Compartir
              </Text>
            </TouchableOpacity>
          </View>

          {/* Información del QR */}
          <View style={localStyles.qrInfo}>
            <Text style={styles.bodyTextSecondary}>
              <Text style={{ fontWeight: 'bold' }}>Contenido:</Text> {qrData}
            </Text>
            <Text style={styles.bodyTextSecondary}>
              <Text style={{ fontWeight: 'bold' }}>Tamaño:</Text> {qrSize}x
              {qrSize} píxeles
            </Text>
            <Text style={styles.bodyTextSecondary}>
              <Text style={{ fontWeight: 'bold' }}>Formato:</Text> PNG
            </Text>
          </View>
        </View>
      )}

      {/* Información adicional */}
      <View style={styles.card}>
        <Text style={styles.heading3}>¿Qué es un código QR?</Text>
        <Text style={styles.bodyTextSecondary}>
          Un código QR (Quick Response) es un código de barras bidimensional que
          puede almacenar información como URLs, texto, números de teléfono,
          direcciones de email y más.
        </Text>
        <Text style={[styles.bodyTextSecondary, { marginTop: 8 }]}>
          Los códigos QR son ampliamente utilizados en aplicaciones móviles para
          facilitar el acceso rápido a información y servicios.
        </Text>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  presetButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  qrInfo: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    gap: 4,
  },
});
