import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useApp } from '../stores';

// 🏦 Hook para manejo de pagos reutilizable
export interface PaymentData {
  amount: string;
  description?: string;
  cardNumber?: string;
  installments?: number;
}

export interface PaymentValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface UsePaymentReturn {
  paymentData: PaymentData;
  isProcessing: boolean;
  validation: PaymentValidation;
  setAmount: (amount: string) => void;
  setDescription: (description: string) => void;
  setCardNumber: (cardNumber: string) => void;
  setInstallments: (installments: number) => void;
  validatePayment: () => PaymentValidation;
  processPayment: () => Promise<boolean>;
  resetPayment: () => void;
  formatAmount: (amount: string) => string;
  parseAmount: (amount: string) => number;
}

export function usePayment(): UsePaymentReturn {
  const { tenantConfig } = useApp();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: '',
    description: '',
    cardNumber: '',
    installments: 1
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [validation, setValidation] = useState<PaymentValidation>({
    isValid: false,
    errors: [],
    warnings: []
  });

  // Establecer monto
  const setAmount = useCallback((amount: string) => {
    // Solo permitir números y punto decimal
    const cleanAmount = amount.replace(/[^0-9.]/g, '');
    setPaymentData(prev => ({ ...prev, amount: cleanAmount }));
  }, []);

  // Establecer descripción
  const setDescription = useCallback((description: string) => {
    setPaymentData(prev => ({ ...prev, description }));
  }, []);

  // Establecer número de tarjeta
  const setCardNumber = useCallback((cardNumber: string) => {
    // Solo permitir números y espacios
    const cleanCardNumber = cardNumber.replace(/[^0-9\s]/g, '');
    setPaymentData(prev => ({ ...prev, cardNumber: cleanCardNumber }));
  }, []);

  // Establecer cuotas
  const setInstallments = useCallback((installments: number) => {
    setPaymentData(prev => ({ ...prev, installments }));
  }, []);

  // Formatear monto para mostrar
  const formatAmount = useCallback((amount: string): string => {
    if (!amount) return '';
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '';
    return numAmount.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS'
    });
  }, []);

  // Parsear monto a número
  const parseAmount = useCallback((amount: string): number => {
    const numAmount = parseFloat(amount);
    return isNaN(numAmount) ? 0 : numAmount;
  }, []);

  // Validar pago
  const validatePayment = useCallback((): PaymentValidation => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validar monto
    const amount = parseAmount(paymentData.amount);
    if (amount <= 0) {
      errors.push('El monto debe ser mayor a 0');
    }

    if (tenantConfig?.payment) {
      if (amount < tenantConfig.payment.minAmount) {
        errors.push(`El monto mínimo es $${tenantConfig.payment.minAmount.toLocaleString()}`);
      }
      if (amount > tenantConfig.payment.maxAmount) {
        errors.push(`El monto máximo es $${tenantConfig.payment.maxAmount.toLocaleString()}`);
      }
    }

    // Validar cuotas
    if (paymentData.installments && paymentData.installments > 12) {
      warnings.push('Se recomienda no exceder 12 cuotas');
    }

    // Validar número de tarjeta (si se proporciona)
    if (paymentData.cardNumber && paymentData.cardNumber.replace(/\s/g, '').length < 13) {
      warnings.push('Verifica que el número de tarjeta sea correcto');
    }

    const isValid = errors.length === 0;

    setValidation({ isValid, errors, warnings });
    return { isValid, errors, warnings };
  }, [paymentData, tenantConfig, parseAmount]);

  // Procesar pago
  const processPayment = useCallback(async (): Promise<boolean> => {
    const validationResult = validatePayment();
    
    if (!validationResult.isValid) {
      Alert.alert(
        'Error de Validación',
        validationResult.errors.join('\n'),
        [{ text: 'OK' }]
      );
      return false;
    }

    if (validationResult.warnings.length > 0) {
      const shouldContinue = await new Promise<boolean>((resolve) => {
        Alert.alert(
          'Advertencias',
          validationResult.warnings.join('\n') + '\n\n¿Deseas continuar?',
          [
            { text: 'Cancelar', onPress: () => resolve(false) },
            { text: 'Continuar', onPress: () => resolve(true) }
          ]
        );
      });

      if (!shouldContinue) return false;
    }

    setIsProcessing(true);
    
    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Pago Exitoso',
        `Se procesó el pago por ${formatAmount(paymentData.amount)}`,
        [{ text: 'OK' }]
      );
      
      return true;
    } catch (error) {
      Alert.alert(
        'Error en el Pago',
        'Hubo un problema al procesar el pago. Inténtalo nuevamente.',
        [{ text: 'OK' }]
      );
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [paymentData, validatePayment, formatAmount]);

  // Resetear datos del pago
  const resetPayment = useCallback(() => {
    setPaymentData({
      amount: '',
      description: '',
      cardNumber: '',
      installments: 1
    });
    setValidation({
      isValid: false,
      errors: [],
      warnings: []
    });
  }, []);

  return {
    paymentData,
    isProcessing,
    validation,
    setAmount,
    setDescription,
    setCardNumber,
    setInstallments,
    validatePayment,
    processPayment,
    resetPayment,
    formatAmount,
    parseAmount
  };
}
