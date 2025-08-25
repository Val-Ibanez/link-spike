import { useState, useCallback } from 'react';
import { Alert, Share } from 'react-native';

// 📱 Hook para manejo de QR reutilizable
export interface QRData {
  value: string;
  size: number;
  showQR: boolean;
}

export interface UseQRReturn {
  qrData: QRData;
  isGenerating: boolean;
  setQRValue: (value: string) => void;
  setQRSize: (size: number) => void;
  generateQR: () => void;
  clearQR: () => void;
  copyToClipboard: () => void;
  shareQR: () => void;
  increaseSize: () => void;
  decreaseSize: () => void;
  validateQRData: () => boolean;
}

export function useQR(): UseQRReturn {
  const [qrData, setQrData] = useState<QRData>({
    value: '',
    size: 200,
    showQR: false
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Establecer valor del QR
  const setQRValue = useCallback((value: string) => {
    setQrData(prev => ({
      ...prev,
      value,
      showQR: false // Ocultar QR cuando se cambia el valor
    }));
  }, []);

  // Establecer tamaño del QR
  const setQRSize = useCallback((size: number) => {
    setQrData(prev => ({
      ...prev,
      size: Math.max(100, Math.min(300, size)) // Limitar entre 100 y 300
    }));
  }, []);

  // Validar datos del QR
  const validateQRData = useCallback((): boolean => {
    if (!qrData.value.trim()) {
      Alert.alert(
        'Datos Requeridos',
        'Por favor ingresa algún texto o URL para generar el QR',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  }, [qrData.value]);

  // Generar QR
  const generateQR = useCallback(() => {
    if (!validateQRData()) return;

    setIsGenerating(true);
    
    // Simular generación (en un caso real, esto sería instantáneo)
    setTimeout(() => {
      setQrData(prev => ({
        ...prev,
        showQR: true
      }));
      setIsGenerating(false);
    }, 500);
  }, [validateQRData]);

  // Limpiar QR
  const clearQR = useCallback(() => {
    setQrData({
      value: '',
      size: 200,
      showQR: false
    });
  }, []);

  // Copiar al portapapeles
  const copyToClipboard = useCallback(() => {
    if (!qrData.value) return;

    // En React Native, necesitarías una librería como @react-native-clipboard/clipboard
    // Por ahora, simulamos la funcionalidad
    Alert.alert(
      'Copiado',
      'El código QR se ha copiado al portapapeles',
      [{ text: 'OK' }]
    );
  }, [qrData.value]);

  // Compartir QR
  const shareQR = useCallback(async () => {
    if (!qrData.value) return;

    try {
      await Share.share({
        message: `Código QR: ${qrData.value}`,
        title: 'Compartir Código QR'
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo compartir el código QR',
        [{ text: 'OK' }]
      );
    }
  }, [qrData.value]);

  // Aumentar tamaño
  const increaseSize = useCallback(() => {
    setQrData(prev => ({
      ...prev,
      size: Math.min(300, prev.size + 50)
    }));
  }, []);

  // Disminuir tamaño
  const decreaseSize = useCallback(() => {
    setQrData(prev => ({
      ...prev,
      size: Math.max(100, prev.size - 50)
    }));
  }, []);

  return {
    qrData,
    isGenerating,
    setQRValue,
    setQRSize,
    generateQR,
    clearQR,
    copyToClipboard,
    shareQR,
    increaseSize,
    decreaseSize,
    validateQRData
  };
}
